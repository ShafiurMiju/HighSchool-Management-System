import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../layout/Layout";

const StudentDetails = () => {
  const router = useRouter();
  const id = router.query; // Get the student ID from the URL
  const [studentData, setStudentData] = useState(null);

  console.log(id.studentid);

  const handleBack = () => {
    router.push('/student');
  };

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
  async function deletedata(){
    try {
      const response = await axios.delete(`http://localhost:3000/administrator/deleteStudentbyid/${studentData[0].ID}`);
      router.push('/student');
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = () => {
    deletedata()
  };

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



                    <div class="relative overflow-x-auto  sm:rounded-lg">
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                        <tbody className="w-96">
                          <tr class="">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-right ">
                              ID:
                            </th>
                            <td class="px-6 py-4 text-gray-900">
                              {studentData[0].ID}
                            </td>
                          </tr>
                          <tr >
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-right">
                              Email:
                            </th>
                            <td class="px-6 py-4 text-gray-900">
                              {studentData[0].Email}
                            </td>
                          </tr>
                          <tr >
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-right">
                              Father Name:
                            </th>
                            <td class="px-6 py-4 text-gray-900">
                              {studentData[0].FatherName}
                            </td>
                          </tr>
                          <tr >
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-right">
                              Mother Name:
                            </th>
                            <td class="px-6 py-4 text-gray-900">
                              {studentData[0].MotherName}
                            </td>
                          </tr>
                          <tr >
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-right">
                              Contact Number:
                            </th>
                            <td class="px-6 py-4 text-gray-900">
                              {studentData[0].ContactNumber}
                            </td>
                          </tr>
                          <tr >
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-right">
                              Date of Birth:
                            </th>
                            <td class="px-6 py-4 text-gray-900">
                              {studentData[0].DateOfBirth}
                            </td>
                          </tr>
                          <tr >
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-right">
                              Gender:
                            </th>
                            <td class="px-6 py-4 text-gray-900">
                              {studentData[0].Gender}
                            </td>
                          </tr>
                          <tr >
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-right">
                              Address:
                            </th>
                            <td class="px-6 py-4 text-gray-900">
                              {studentData[0].Address}
                            </td>
                          </tr>
                          <tr >
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-right">
                              Admission Date:
                            </th>
                            <td class="px-6 py-4 text-gray-900">
                              {studentData[0].AdmissionDate}
                            </td>
                          </tr>
                          <tr >
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-right">
                              Class:
                            </th>
                            <td class="px-6 py-4 text-gray-900">
                              {studentData[0].Class.ClassName}
                            </td>
                          </tr>
                          <tr >
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 text-right">
                              Section:
                            </th>
                            <td class="px-6 py-4 text-gray-900">
                              {studentData[0].Section.SectionName}
                            </td>
                          </tr>


                        </tbody>
                      </table>
                    </div>

                  </div>
                  <div>
                    {/* <img src="logo.png" alt="Profile" className="rounded-full w-24 h-24" /> */}
                    <img alt="Profile" className="rounded-sm w-36 h-48" src={'http://localhost:3000/administrator/getimage/' + studentData[0].ProfilePicture} />
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Loading profile data...</p>
              )}
            </div>
            <div className="flex gap-5 justify-center">
              <button
                onClick={handleBack}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Back
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default StudentDetails;
