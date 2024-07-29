"use client";

import { StaticImageData } from "next/image";
import CustomersTableItem from "./customers-table-item";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useEffect } from "react";
import { customerAsync } from "@/lib/features/customer/customerSlice";
import EmployeeTableItem from "./customers-table-item";

export interface Customer {
  id: number;
  name: string;
  mobileNumber: number;
  email: string;
  designation: string;
  gender: string;
  course: string;
  countryCode: number;
  userId: number;
  image: string;
}

export default function EmployeeTable({
  setFormData,
  setFeedbackModalOpen,
  remove,
}: any) {
  const customers: any = useAppSelector((state) => state.customer.customer);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }
    dispatch(customerAsync());
  }, [dispatch, user]);
  console.log(customers, "all customer ");
  // const length = customers.length;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          All Employee{" "}
          <span className="text-gray-400 dark:text-gray-500 font-medium">
            {customers && customers.length}
          </span>
        </h2>
      </header>
      {/* <h1>{JSON.stringify(customer)}hello</h1> */}
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Id</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Image</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">email</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Mobile Number</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Designation</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Gender</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Course</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Action</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}

            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {customers &&
                customers.map((customer: any) => (
                  <EmployeeTableItem
                    key={customer.id}
                    customer={customer}
                    setFeedbackModalOpen={setFeedbackModalOpen}
                    onEdit={() => {
                      setFormData({
                        ...customer,
                      });
                      setFeedbackModalOpen(true);
                    }}
                    remove={remove}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
