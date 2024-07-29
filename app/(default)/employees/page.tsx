"use client";
import { useState } from "react";
import ModalBasic from "@/components_new/ui/model/modal-basic";
import EmployeeTable from "./customers-table";
import axios from "axios";
import { useAppDispatch } from "@/lib/store";
import {
  createCustomerAsync,
  removeCustomerAsync,
  updateCustomerAsync,
} from "@/lib/features/customer/customerSlice";
import Link from "next/link";

let initialData = {
  id: null,
  name: "",
  email: "",
  mobileNumber: "",
  designation: "",
  gender: "",
  course: "",
  image: null,
};
function EmployeDetail() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        course: checked ? value : "", // Update course based on checkbox status
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = new FormData();
    // console.log(data, "inside data");
    // for (const key in formData) {
    //   if (key === "course") {
    //     formData[key].forEach((item) => data.append(key, item));
    //   } else {
    //     data.append(key, formData[key]);
    //   }
    // }
    console.log(formData, "inside data2");

    try {
      // Dispatch the createCustomerAsync thunk with the form data
      if (formData.id) {
        await dispatch(updateCustomerAsync(formData));
      } else {
        dispatch(createCustomerAsync(formData));
      }
      setFormData({
        ...initialData,
      });
      setFeedbackModalOpen(false);
    } catch (error) {
      console.error("Error creating customer", error);
    }
  };
  const remove = async (customerId) => {
    try {
      dispatch(removeCustomerAsync(customerId));
    } catch (error) {
      console.error("Error removing customer", error);
    }
  };
  console.log(formData, "formdata");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Employee
          </h1>
        </div>
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <div className="m-1.5">
            <button
              className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100"
              aria-controls="feedback-modal"
              onClick={() => {
                setFeedbackModalOpen(true);
              }}
            >
              Add Employee
            </button>
            <Link
              className="ml-5 btn bg-red-600 text-gray-100 hover:bg-gray-800 dark:bg-gray-100"
              aria-controls="feedback-modal"
              href={"/logout"}
            >
              Logout
            </Link>
            <ModalBasic
              isOpen={feedbackModalOpen}
              setIsOpen={setFeedbackModalOpen}
              title="Add Employee"
            >
              <form onSubmit={handleSubmit} className="px-5 py-4">
                <div className="space-y-3">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      className="form-input w-full px-2 py-1"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="mobileNumber"
                    >
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      className="form-input w-full px-2 py-1"
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="designation"
                    >
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="designation"
                      name="designation"
                      className="form-select w-full"
                      value={formData.designation}
                      onChange={handleChange}
                    >
                      <option value="HR">HR</option>
                      <option value="Manager">Manager</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="gender"
                    >
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                        className="form-radio"
                      />
                      <span className="text-sm ml-2">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                        className="form-radio"
                      />
                      <span className="text-sm ml-2">Female</span>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="course"
                    >
                      Course <span className="text-red-500">*</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        value="MCA"
                        checked={formData.course.includes("MCA")}
                        onChange={handleCheckboxChange}
                      />
                      <span className="text-sm ml-2">MCA</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        value="BCA"
                        checked={formData.course.includes("BCA")}
                        onChange={handleCheckboxChange}
                      />
                      <span className="text-sm ml-2">BCA</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        value="BSC"
                        checked={formData.course.includes("BSC")}
                        onChange={handleCheckboxChange}
                      />
                      <span className="text-sm ml-2">BSC</span>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="image"
                    >
                      Image <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className=" rounded-md bg-slate-400"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-end space-x-2 py-5">
                  <button
                    className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                    onClick={() => {
                      setFeedbackModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100"
                  >
                    Add
                  </button>
                </div>
              </form>
            </ModalBasic>
          </div>
        </div>
      </div>

      {/* Table */}
      <EmployeeTable
        setFormData={setFormData}
        setFeedbackModalOpen={setFeedbackModalOpen}
        remove={remove}
      />
    </div>
  );
}

export default function Employee() {
  return <EmployeDetail />;
}
