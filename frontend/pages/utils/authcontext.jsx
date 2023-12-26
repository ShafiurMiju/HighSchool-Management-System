import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter(); 

  const login = (email, cookie) => {
    console.log(email)
    console.log(cookie)
    setUser({ email, cookie });
  };

  const checkUser = () => {
    console.log("user: " + user?.email);
    console.log("cookie: " + user?.cookie);

    return !!user?.email && !!user?.cookie;
  };

  console.log(checkUser())

  const logout = () => {
    doSignOut();
  };

  async function doSignOut() {
    try {
      const response = await axios.get(
        "http://localhost:3000/administrator/signout",
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );

      console.log(response);
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
