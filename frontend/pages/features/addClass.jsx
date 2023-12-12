import { useState } from "react";
import axios from "axios";

const AddClass = () => {
  const [formData, setFormData] = useState({
    ClassName: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    ["ClassName"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/administrator/addClass",
        formData
      );

      console.log("Response:", response);
      setFormData({
        ClassName: "",
      });

      setSuccessMessage("Class added successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <>
      <form
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Class Name:
          </label>
          <input
            type="text"
            name="ClassName"
            value={formData.ClassName}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              errors.ClassName ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.ClassName && (
            <p className="text-red-500 text-sm mt-1">{errors.ClassName}</p>
          )}
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

      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-900 border p-4 rounded-md shadow-md flex flex-col pt-10 px-10 gap-5 fade">
            <p className="text-white text-2xl">{successMessage}</p>
            <button
              className="text-sm text-white my-2"
              onClick={() => setSuccessMessage("")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddClass;
