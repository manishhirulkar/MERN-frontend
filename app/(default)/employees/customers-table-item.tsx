import Image from "next/image";
import { Customer } from "./customers-table";
import Avatar01 from "@/public/images/avatar-01.jpg";
import EditMenu from "@/components_new/ui/menu/edit-menu";

interface CustomersTableItemProps {
  customer: Customer;
  onEdit: () => void;
  setFeedbackModalOpen: () => void;
  remove: () => void;
}

export default function EmployeeTableItem({
  customer,
  onEdit,
  remove,
}: CustomersTableItemProps) {
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          {/* <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
            <Image
              className="rounded-full"
              src={customer.image}
              width={40}
              height={40}
              alt={customer.name}
            />
          </div> */}
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {customer.id}
          </div>
        </div>
      </td>
      <td className="m-1.5">
        {/* Start */}
        <Image
          className="rounded-full"
          src={Avatar01}
          width={40}
          height={40}
          alt="Avatar"
        />
        {/* End */}
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{customer.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{customer.email}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">
          {customer.countryCode} {customer.mobileNumber}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-600">
          {customer.designation}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-green-600">
          {customer.gender}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-green-600">
          {customer.course}
        </div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        {/* Menu button */}
        {/* <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full">
          <span className="sr-only">Menu</span>
          <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="2" />
            <circle cx="10" cy="16" r="2" />
            <circle cx="22" cy="16" r="2" />
          </svg>
        </button> */}
        {/* <EditMenu /> */}
        <button
          type="button"
          onClick={onEdit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => remove(customer.id)}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
