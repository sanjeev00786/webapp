import { useEffect, useRef, useState } from "react";
import { db } from "../../../utils/firebase";
import { deleteDoc, doc } from "firebase/firestore";

import { toast } from "react-toastify";

const DeleteModal = ({ id, email, onClose }) => {
  const [admin, setAdmin] = useState();
  const [isDisable, setDisable] = useState(true);
  const deleteRef = useRef();

  const handleInputChange = (e) => {
    if (email == e.target.value) {
      deleteRef.current.classList.remove("bg-red-200", "hover:bg-red-200");
      deleteRef.current.classList.add("bg-red-500", "hover:bg-red-500");
      setDisable(false);
    } else {
      deleteRef.current.classList.remove("bg-red-500", "hover:bg-red-500");
      deleteRef.current.classList.add("bg-red-200", "hover:bg-red-200");
      setDisable(true);
    }
  };

  const handleDeleteAdmin = async (e) => {
    e.preventDefault();

    // Delete the document
    await deleteDoc(doc(db, "admin_users", id));

    toast.success("Admin deleted successfully");

    onClose();
  };

  return (
    <div
      className="py-12 bg-gray-700 bg-opacity-40 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <a onClick={onClose} className="absolute top-1.5 right-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 cursor-pointer fill-current text-slate-500 hover:text-slate-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </a>
          <h1 className="text-3xl font-bold">Delete Admin</h1>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this admin?
          </p>
          <code>{email}</code>
          <input
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder={email}
            onChange={handleInputChange}
          />
          <div className="flex flex-row mt-6 space-x-2 justify-evenly">
            <button
              onClick={handleDeleteAdmin}
              ref={deleteRef}
              disabled={isDisable}
              className="w-full py-3 text-sm font-medium text-center text-white transition duration-150 ease-linear bg-red-200 border border-red-600 rounded-lg hover:bg-red-200"
            >
              Delete
            </button>
            <button
              className="w-full py-3 text-sm text-center text-gray-500 transition duration-150 ease-linear bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
