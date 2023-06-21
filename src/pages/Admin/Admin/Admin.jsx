import { useState, useEffect } from "react";
import { db } from "../../../utils/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { AddModal } from "../../../components/Admin";
import AdminItem from "./AdminItem";

const Admin = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [openAdminModal, setOpenAdminModal] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "admin_users"));
    const unsub = onSnapshot(q, (snap) => {
      const temp = [];
      snap.forEach((doc) => {
        temp.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setAdminUsers(temp);
    });
    return () => unsub();
  }, []);

  return (
    <section className="container px-4 mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Admins
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {adminUsers && adminUsers.length}
            </span>
          </div>
        </div>

        <div className="flex items-center mt-4 gap-x-3">
          <button
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            onClick={() => setOpenAdminModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Add New Admin</span>
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Email
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Access
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {adminUsers &&
              adminUsers.map((adminUser, index) => {
                return (
                  <AdminItem
                    key={index}
                    id={adminUser?.id}
                    username={adminUser?.username}
                    email={adminUser?.email}
                    access={adminUser?.access}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      {openAdminModal === true ? (
        <AddModal onClose={() => setOpenAdminModal(false)} />
      ) : (
        ""
      )}
    </section>
  );
};

export default Admin;
