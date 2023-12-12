import { useState, useEffect } from "react";
import axios from "axios";

const addStudent = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    FatherName: "",
    MotherName: "",
    Email: "",
    ContactNumber: "",
    DateOfBirth: "",
    Gender: "",
    Address: "",
    StudentPassword: "",
    AdmissionDate: "",
    myfile: null,
    Status: "",
    Class: "",
    Section: "",
  });

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState("");

  const [classList, setClassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);

  useEffect(() => {
    // Fetch data for Class dropdown
    axios.get("http://localhost:3000/administrator/viewClass")
      .then((response) => {
        setClassList(response.data); // Assuming the response is an array of classes
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });

    // Fetch data for Section dropdown
    axios.get("http://localhost:3000/administrator/viewsection")
      .then((response) => {
        setSectionList(response.data); // Assuming the response is an array of sections
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    [
      "FirstName",
      "LastName",
      "FatherName",
      "MotherName",
      "Email",
      "ContactNumber",
      "DateOfBirth",
      "Gender",
      "Address",
      "StudentPassword",
      "AdmissionDate",
      "myfile",
      "Status",
      "Class",
      "Section",
    ].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
        valid = false;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.Email && !emailRegex.test(formData.Email)) {
      newErrors["Email"] = "Invalid email format";
      valid = false;
    }

    const phoneRegex = /^[0-9]+$/;
    if (formData.ContactNumber && !phoneRegex.test(formData.ContactNumber)) {
      newErrors["ContactNumber"] = "Invalid phone number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      console.log(formData);
      console.log(formDataToSend);

      const response = await axios.post(
        "http://localhost:3000/administrator/addstudent",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
      setFormData({
        FirstName: "",
        LastName: "",
        FatherName: "",
        MotherName: "",
        Email: "",
        ContactNumber: "",
        DateOfBirth: "",
        Gender: "",
        Address: "",
        StudentPassword: "",
        AdmissionDate: "",
        myfile: null,
        Status: "",
        Class: "",
        Section: "",
      });

      setSuccessMessage("Student added successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name:
            </label>
            <input
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border ${
                errors.FirstName ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.FirstName && (
              <p className="text-red-500 text-sm mt-1">{errors.FirstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name:
            </label>
            <input
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border ${
                errors.LastName ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.LastName && (
              <p className="text-red-500 text-sm mt-1">{errors.LastName}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Father Name:
          </label>
          <input
            type="text"
            name="FatherName"
            value={formData.FatherName}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              errors.FatherName ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.FatherName && (
            <p className="text-red-500 text-sm mt-1">{errors.FatherName}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Mother Name:
          </label>
          <input
            type="text"
            name="MotherName"
            value={formData.MotherName}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              errors.MotherName ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.MotherName && (
            <p className="text-red-500 text-sm mt-1">{errors.MotherName}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              errors.Email ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.Email && (
            <p className="text-red-500 text-sm mt-1">{errors.Email}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Contact Number:
          </label>
          <input
            type="tel"
            name="ContactNumber"
            value={formData.ContactNumber}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              errors.ContactNumber ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.ContactNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.ContactNumber}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth:
          </label>
          <input
            type="date"
            name="DateOfBirth"
            value={formData.DateOfBirth}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              errors.DateOfBirth ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.DateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.DateOfBirth}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Gender:
          </label>
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              errors.Gender ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.Gender && (
            <p className="text-red-500 text-sm mt-1">{errors.Gender}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Address:
          </label>
          <textarea
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              errors.Address ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          ></textarea>
          {errors.Address && (
            <p className="text-red-500 text-sm mt-1">{errors.Address}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Student Password:
          </label>
          <input
            type="password"
            name="StudentPassword"
            value={formData.StudentPassword}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              errors.StudentPassword ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.StudentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.StudentPassword}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Admission Date:
          </label>
          <input
            type="date"
            name="AdmissionDate"
            value={formData.AdmissionDate}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              errors.AdmissionDate ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.AdmissionDate && (
            <p className="text-red-500 text-sm mt-1">{errors.AdmissionDate}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture:
          </label>
          <input
            type="file"
            name="myfile"
            onChange={handleChange}
            accept=".png, .jpg, .jpeg"
            className={`mt-1 p-2 w-full border ${
              errors.myfile ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.myfile && (
            <p className="text-red-500 text-sm mt-1">{errors.myfile}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <input
            type="text"
            name="Status"
            value={formData.Status}
            onChange={handleChange}
            className={`mt-1 p-2 w-full border ${
              errors.Status ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.Status && (
            <p className="text-red-500 text-sm mt-1">{errors.Status}</p>
          )}
        </div>
        <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Class:
        </label>
        <select
          name="Class"
          value={formData.Class}
          onChange={handleChange}
          className={`mt-1 p-2 w-full border ${
            errors.Class ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        >
          <option value="">Select Class</option>
          {classList.map((classItem) => (
            <option key={classItem.ID} value={classItem.ClassName}>
              {classItem.ClassName}
            </option>
          ))}
        </select>
        {errors.Class && (
          <p className="text-red-500 text-sm mt-1">{errors.Class}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Section:
        </label>
        <select
          name="Section"
          value={formData.Section}
          onChange={handleChange}
          className={`mt-1 p-2 w-full border ${
            errors.Section ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        >
          <option value="">Select Section</option>
          {sectionList.map((sectionItem) => (
            <option key={sectionItem.ID} value={sectionItem.SectionName}>
              {sectionItem.SectionName}
            </option>
          ))}
        </select>
        {errors.Section && (
          <p className="text-red-500 text-sm mt-1">{errors.Section}</p>
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
          <div className="bg-gray-900 border p-4 rounded-md shadow-md flex flex-col pt-10 px-10 gap-5">
            <p className="text-white text-2xl">{successMessage}</p>
            <button className="text-sm text-white my-2" onClick={() => setSuccessMessage('')}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default addStudent;
