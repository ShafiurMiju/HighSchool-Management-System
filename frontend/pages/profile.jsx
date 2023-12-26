import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './layout/Layout';
import { FaEdit, FaCalendarAlt } from 'react-icons/fa';


export default function AllAdmin() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:3000/administrator/profile', {
        withCredentials: true,
      });
      const jsonData = response.data;
      console.log(jsonData);
      setJsonData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Layout>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 bg-gray-300 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
          {jsonData ? (
            <div className="flex justify-between">
              <div className="mr-8">
                <h1 className="text-4xl font-extrabold mb-4 text-blue-600">
                  {jsonData.FirstName + " " + jsonData.LastName}
                </h1>
                <div className="grid grid-cols-1 gap-4 text-gray-600">
                  {Object.entries(jsonData).map(([key, value]) => (
                    key !== 'FirstName' && key !== 'LastName' && (
                      <div key={key}>
                        <strong className="block text-gray-800">{key}:</strong>
                        <span>{value}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
              <div>
                <img src="logo.png" alt="Profile" className="rounded-full w-24 h-24" />
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading profile data...</p>
          )}
         </div>
        </div>
      </Layout>
    </>
  );
}
