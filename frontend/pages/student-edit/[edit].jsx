import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../layout/Layout";

const StudentEdit = () => {
  const [classList, setClassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const router = useRouter();
  const id = router.query;
  const [formData, setFormData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    axios.get("http://localhost:3000/administrator/viewClass")
      .then((response) => {
        setClassList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });

    axios.get("http://localhost:3000/administrator/viewsection")
      .then((response) => {
        setSectionList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:3000/administrator/viewSingleStudent/${id.edit}`
      );
      const formData = response.data;
      setFormData(formData);
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleBack = () => {
    router.push('/student');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/administrator/updatestudent/${id.edit}`,
        formData[0]  // Assuming formData is an array with a single object
      );

      console.log("Student updated:", response.data);
      setSuccessMessage("Student updated successfully!");
      // Optionally, you can redirect the user to another page or perform other actions upon successful update
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <Layout>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
          {formData ? (
            <form
              className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name:
                  </label>
                  <input
                    type="text"
                    name="FirstName"
                    value={formData[0].FirstName}
                    onChange={(e) => setFormData([{ ...formData[0], FirstName: e.target.value }])}
                    className={`mt-1 p-2 w-full border  rounded-md`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    name="LastName"
                    value={formData[0].LastName}
                    onChange={(e) => setFormData([{ ...formData[0], LastName: e.target.value }])}
                    className={`mt-1 p-2 w-full border rounded-md`}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Father Name:
                </label>
                <input
                  type="text"
                  name="FatherName"
                  value={formData[0].FatherName}
                  onChange={(e) => setFormData([{ ...formData[0], FatherName: e.target.value }])}
                  className={`mt-1 p-2 w-full border rounded-md`}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mother Name:
                </label>
                <input
                  type="text"
                  name="MotherName"
                  value={formData[0].MotherName}
                  onChange={(e) => setFormData([{ ...formData[0], MotherName: e.target.value }])}
                  className={`mt-1 p-2 w-full border rounded-md`}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  name="Email"
                  value={formData[0].Email}
                  onChange={(e) => setFormData([{ ...formData[0], Email: e.target.value }])}
                  className={`mt-1 p-2 w-full border rounded-md`}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number:
                </label>
                <input
                  type="tel"
                  name="ContactNumber"
                  value={formData[0].ContactNumber}
                  onChange={(e) => setFormData([{ ...formData[0], ContactNumber: e.target.value }])}
                  className={`mt-1 p-2 w-full border  rounded-md`}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  name="DateOfBirth"
                  value={formData[0].DateOfBirth}
                  onChange={(e) => setFormData([{ ...formData[0], DateOfBirth: e.target.value }])}
                  className={`mt-1 p-2 w-full border  rounded-md`}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Gender:
                </label>
                <select
                  name="Gender"
                  value={formData[0].Gender}
                  onChange={(e) => setFormData([{ ...formData[0], Gender: e.target.value }])}
                  className={`mt-1 p-2 w-full border  rounded-md`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address:
                </label>
                <textarea
                  name="Address"
                  value={formData[0].Address}
                  onChange={(e) => setFormData([{ ...formData[0], Address: e.target.value }])}
                  className={`mt-1 p-2 w-full border  rounded-md`}
                ></textarea>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Class:
                </label>
                <select
                  name="Class"
                  value={formData[0].Class.ID}
                  onChange={(e) => setFormData([{ ...formData[0], Class: { ID: e.target.value } }])}
                  className={`mt-1 p-2 w-full border rounded-md`}
                >
                  <option value="">Select Class</option>
                  {classList.map((classItem) => (
                    <option key={classItem.ID} value={classItem.ID}>
                      {classItem.ClassName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Section:
                </label>
                <select
                  name="Section"
                  value={formData[0].Section.ID}
                  onChange={(e) => setFormData([{ ...formData[0], Section: { ID: e.target.value } }])}
                  className={`mt-1 p-2 w-full border rounded-md`}
                >
                  <option value="">Select Section</option>
                  {sectionList.map((sectionItem) => (
                    <option key={sectionItem.ID} value={sectionItem.ID}>
                      {sectionItem.SectionName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </form>
            
          ) : (
            <p>Loading...</p>
          )}

{successMessage && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-900 border p-4 rounded-md shadow-md flex flex-col pt-10 px-10 gap-5">
            <p className="text-white text-2xl">{successMessage}</p>
            <button className="text-sm text-white my-2" onClick={() => setSuccessMessage('')}>
              Close
            </button>
          </div>
        </div>
      )}
        </div>
      </div>
    </Layout>
  );
};

export default StudentEdit;
