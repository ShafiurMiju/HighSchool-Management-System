// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useAuth } from './utils/authcontext';

// export default function LoginPage() {
//   const router = useRouter();
//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");
//   const [error, setError] = useState("");
//     const { login } = useAuth();

//   const handleChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!Email || !Password) {
//       setError("Email and password are required");
//     } else if (!isValidEmail(Email)) {
//       setError("Invalid email address");
//     } else {
//       const res = await doSignIn(Email, Password);
//       console.log(res);
//     }
//   };
//   async function doSignIn(Email, Password) {
//     try {
//       console.log(Email);
//       console.log(Password);

//       const response = await axios.post(
//         'http://localhost:3000/administrator/',
//         {
//             Email, Password
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       console.log(response)

//       if (response.status == 201) {
//         console.log("Hello")
//         console.log("cookie: " + document.cookie);
//         login(Email, document.cookie);
//         console.log(login)
//         router.push('/')
//       } else {
//         setError("Invalid user");
//       }

//       return response;
//     } catch (error) {
//         setError("Invalid user");
//       console.error("Login failed:", error);
//     }
//   }
//   const isValidEmail = (Email) => {
//     const emailPattern = /^\S+@\S+\.\S+$/;
//     return emailPattern.test(Email);
//   };

//   return (
//     <>
//       <div class="flex">
//         <div class="flex-auto ">
//           <p class="text-4 font-bold">Login</p>
//           <div>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="Email"
//                   value={Email}
//                   className="input input-bordered w-full max-w-xs"
//                   onChange={handleChangeEmail}
//                 />
//               </div>
//               <div>
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   name="Password"
//                   value={Password}
//                   className="input input-bordered w-full max-w-xs"
//                   onChange={handleChangePassword}
//                 />
//               </div>
//               {error && <p>{error}</p>}
//               <button className="btn btn-primary" type="submit">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// // pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from './utils/authcontext';
import { useEffect } from 'react';



const Login = () => {
    const router = useRouter();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const { checkUser } = useAuth();


  useEffect(() => {
    if (checkUser()==true) {
      router.push('/');
    }
  }, [checkUser, router]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Email validation
    if (!/^\S+@\S+\.\S+$/.test(Email)) {
      setError('Invalid Email address');
      return;
    }

    // Basic Password validation
    if (Password.length < 4) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      // Perform login using Axios
      const response = await axios.post('http://localhost:3000/administrator/', { Email, Password },{withCredentials: true,});

      // Handle successful login (redirect, set user in context, etc.)
      console.log('responsed:', response);
      console.log('Login successful!', response.data);
      login(Email, response.data.cookie);
      console.log(Email)
      console.log(response.data.cookie)
      router.push('/');


    } catch (error) {
      // Handle login failure (display error message, etc.)
      console.error('Login failed:', error.response.data.message);
      setError('Invalid Email or Password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="Email"
            value={Email}
            onChange={handleChangeEmail}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="Password"
            value={Password}
            onChange={handleChangePassword}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
