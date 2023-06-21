import { useState } from "react";
import { DeleteModal, EditModal } from "../../../components/Admin";

const AdminItem = ({ id, username, email, access }) => {
  const [openAdminDeleteModal, setOpenAdminDeleteModal] = useState(false);
  const [openAdminEditModal, setOpenAdminEditModal] = useState(false);

  return (
    <>
      <tr className="hover:bg-gray-50">
        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div className="text-sm">
            <div className="font-medium text-gray-700">{username}</div>
          </div>
        </th>
        <td className="px-6 py-4">
          <div className="text-gray-400">{email}</div>
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-2">
            {access &&
              access.map((list, index) => {
                return (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-sm font-semibold text-violet-600"
                  >
                    {list.subsys_id} ({list.access_id})
                  </span>
                );
              })}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex justify-end gap-4">
            <a
              x-data="{ tooltip: 'Delete' }"
              onClick={() => setOpenAdminDeleteModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </a>
            <a
              x-data="{ tooltip: 'Edite' }"
              onClick={() => setOpenAdminEditModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </a>
          </div>
        </td>
      </tr>
      {openAdminDeleteModal && (
        <DeleteModal
          id={id}
          email={email}
          onClose={() => setOpenAdminDeleteModal(false)}
        />
      )}
      {openAdminEditModal && (
        <EditModal
          id={id}
          username={username}
          email={email}
          access={access}
          onClose={() => setOpenAdminEditModal(false)}
        />
      )}
    </>
  );
};

export default AdminItem;
