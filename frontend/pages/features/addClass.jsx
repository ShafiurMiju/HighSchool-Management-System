import { useState } from "react";
import axios from "axios";

const addStudent =  () => {
  const [formData, setFormData] = useState({
    ClassName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("ClassName", formData["ClassName"]);

      console.log(formData);
      console.log(formDataToSend);

      const response = await axios.post(
        "http://localhost:3000/administrator/addClass",
        formData
      );

      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      ClassName: value,
    }));
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <form
            className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
            onSubmit={handleSubmit}
          >
            <div className="w-full mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Class Name:
                </label>
                <input
                  type="text"
                  name="ClassName"
                  value={formData.ClassName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default addStudent;
