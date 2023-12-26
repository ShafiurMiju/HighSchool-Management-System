import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../layout/Layout";

const StudentDetails = () => {
  const router = useRouter();
  const id = router.query; // Get the student ID from the URL
  const [studentData, setStudentData] = useState(null);

  console.log(id.studentid);

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:3000/administrator/viewSingleStudent/${id.studentid}`
      );
      const studentData = response.data;
      setStudentData(studentData);
      console.log(studentData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Layout>
      <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
            



            <div>
            {studentData ? (
            <div className="flex justify-between">
              <div className="mr-8 mb-5">
                <h1 className="text-4xl font-bold mb-4 text-blue-600">
                  {studentData[0].FirstName + " " + studentData[0].LastName}
                </h1>
                {/* <div className="grid grid-cols-1 gap-4 text-gray-600">
                  <span className="block text-gray-800">ID: <span>{studentData[0].ID}</span></span> 
                </div> */}

                

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

        <tbody className="w-full">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ID
                </th>
                <td class="px-6 py-4">
                {studentData[0].ID}
                </td>  
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Email
                </th>
                <td class="px-6 py-4">
                {studentData[0].Email}
                </td>  
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Father Name
                </th>
                <td class="px-6 py-4">
                {studentData[0].FatherName}
                </td>  
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Mother Name
                </th>
                <td class="px-6 py-4">
                {studentData[0].MotherName}
                </td>  
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Contact Number
                </th>
                <td class="px-6 py-4">
                {studentData[0].ContactNumber}
                </td>  
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Date of Birth
                </th>
                <td class="px-6 py-4">
                {studentData[0].DateOfBirth}
                </td>  
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Gender
                </th>
                <td class="px-6 py-4">
                {studentData[0].Gender}
                </td>  
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Address
                </th>
                <td class="px-6 py-4">
                {studentData[0].Address}
                </td>  
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Admission Date
                </th>
                <td class="px-6 py-4">
                {studentData[0].AdmissionDate}
                </td>  
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Class
                </th>
                <td class="px-6 py-4">
                {studentData[0].Class.ClassName}
                </td>  
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Section
                </th>
                <td class="px-6 py-4">
                {studentData[0].Section.SectionName}
                </td>  
            </tr>
            
 
        </tbody>
    </table>
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
        </div>
      </Layout>
    </>
  );
};

export default StudentDetails;
