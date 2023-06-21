import { useEffect, useRef, useState } from "react";
import { db } from "../../../utils/firebase";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import bcrypt from "bcryptjs";

import { toast } from "react-toastify";

const EditModal = ({ id, username, password, email, access, onClose }) => {
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState(null);
  const [newPassword2, setNewPassword2] = useState(null);
  const [newEmail, setNewEmail] = useState(email);
  const [newAccess, setNewAccess] = useState([]);
  const [isDisablePassword, setDisablePassword] = useState(true);
  const [isDisablePermission, setDisablePermission] = useState(true);

  const inputRef = useRef(null);

  const [subSystemLists, setSubSystemLists] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "subsystem_lists"));
    const getSubSystemLists = onSnapshot(q, (lists) => {
      const temp = [];
      lists.forEach((list) => {
        temp.push({
          id: list.id,
          ...list.data(),
        });
      });

      setSubSystemLists(temp);
    });
    return () => getSubSystemLists();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      username: newUsername,
    };

    if (!isDisablePassword) {
      if (newPassword !== newPassword2) {
        inputRef.current.focus();
        toast.error("Password doesn't match!");
        return;
      }

      if (!newPassword) {
        inputRef.current.focus();
        toast.warning("Password should be set");
        return;
      }

      const saltRounds = 10;
      const hash = await bcrypt.hash(newPassword, saltRounds);

      newData.password = hash;
    }

    if (!isDisablePermission) {
      newData.access = newAccess;
    }

    await updateDoc(doc(db, "admin_users", id), newData);

    toast.success("Admin updated successfully");
    onClose();
    return;

    // const q = query(collection(db, "admin_users"), where("email", "==", email));

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    //   toast.error("This email already exists!");
    // });

    // if (querySnapshot.empty) {
    //   const saltRounds = 10;
    //   const hash = await bcrypt.hash(newPassword, saltRounds);

    //   const docRef = await addDoc(collection(db, "admin_users"), {
    //     username: newUsername,
    //     password: hash,
    //     access: newAccess,
    //   });

    //   toast.success("Admin added successfully");
    //   onClose();
    //   return;
    // }
  };

  const handleInputChange = (e) => {
    let _tmp = [...newAccess];

    const _access = {
      subsys_id: e.target.name,
      access_id: e.target.value,
    };

    _tmp = _tmp.filter((list) => list.subsys_id != e.target.name);

    setNewAccess([_access, ..._tmp]);
  };

  return (
    <div
      className="py-12 bg-gray-700 bg-opacity-40 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-gray-800 text-xl font-bold tracking-normal leading-tight mb-4">
            Edit Admin
          </h1>
          <label
            htmlFor="email"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Email Address
          </label>
          <div className="relative mb-5 mt-2">
            <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
              @
            </div>
            <input
              id="email"
              className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={true}
            />
          </div>
          <label
            htmlFor="name"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            User Name
          </label>
          <input
            id="name"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <div className="d-flex justify-start mb-5">
            <label
              className="inline-block text-gray-800 text-sm font-bold leading-tight tracking-normal mr-3"
              htmlFor="ispassword"
            >
              Change Password
            </label>
            <input
              className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal pl-3 text-sm border-gray-300 rounded border"
              type="checkbox"
              id="ispassword"
              onChange={() => setDisablePassword(!isDisablePassword)}
            />
          </div>
          <label
            htmlFor="password"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="*************"
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isDisablePassword}
          />
          <label
            ref={inputRef}
            htmlFor="password2"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Confirm Password
          </label>
          <input
            id="password2"
            type="password"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="*************"
            onChange={(e) => setNewPassword2(e.target.value)}
            disabled={isDisablePassword}
          />
          <div className="d-flex justify-start mb-5">
            <label
              className="inline-block text-gray-800 text-sm font-bold leading-tight tracking-normal mr-3"
              htmlFor="ispermis"
            >
              Change Permission
            </label>
            <input
              className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal pl-3 text-sm border-gray-300 rounded border"
              type="checkbox"
              id="ispermis"
              onChange={() => setDisablePermission(!isDisablePermission)}
            />
          </div>
          {subSystemLists &&
            subSystemLists.map((list, index) => {
              return (
                <div key={index}>
                  <h1 className="text-gray-800 text-sm font-bold leading-tight tracking-normal my-3">
                    {list.subsys_name}
                  </h1>
                  <fieldset disabled={isDisablePermission}>
                    <div className="flex justify-between text-sm text-center item-center">
                      <div>
                        <input
                          name={list.id}
                          type="radio"
                          id={index * 5 + 1}
                          value="1"
                          className="hidden peer"
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor={index * 5 + 1}
                          className="inline-block cursor-pointer w-full p-2 font-semibold text-white rounded bg-slate-700 peer-hover:bg-gray-300 peer-hover:text-white peer-checked:bg-orange-700 peer-checked:text-white"
                        >
                          Read
                        </label>
                      </div>
                      <div>
                        <input
                          name={list.id}
                          type="radio"
                          id={index * 5 + 2}
                          value="2"
                          className="hidden peer"
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor={index * 5 + 2}
                          className="inline-block cursor-pointer w-full p-2 font-semibold text-white rounded bg-slate-700 peer-hover:bg-gray-300 peer-hover:text-white peer-checked:bg-orange-700 peer-checked:text-white"
                        >
                          Write
                        </label>
                      </div>
                      <div>
                        <input
                          name={list.id}
                          type="radio"
                          id={index * 5 + 3}
                          value="3"
                          className="hidden peer"
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor={index * 5 + 3}
                          className="inline-block cursor-pointer w-full p-2 font-semibold text-white rounded bg-slate-700 peer-hover:bg-gray-300 peer-hover:text-white peer-checked:bg-orange-700 peer-checked:text-white"
                        >
                          Contribute
                        </label>
                      </div>
                      <div>
                        <input
                          name={list.id}
                          type="radio"
                          id={index * 5 + 4}
                          value="4"
                          className="hidden peer"
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor={index * 5 + 4}
                          className="inline-block cursor-pointer w-full p-2 font-semibold text-white rounded bg-slate-700 peer-hover:bg-gray-300 peer-hover:text-white peer-checked:bg-orange-700 peer-checked:text-white"
                        >
                          Full
                        </label>
                      </div>
                      <div>
                        <input
                          name={list.id}
                          type="radio"
                          id={index * 5}
                          value="0"
                          className="hidden peer"
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor={index * 5}
                          className="inline-block cursor-pointer w-full p-2 font-semibold text-white rounded bg-slate-700 peer-hover:bg-gray-300 peer-hover:text-white peer-checked:bg-orange-700 peer-checked:text-white"
                        >
                          None
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              );
            })}
          <div className="flex items-center justify-start w-full mt-5">
            <button
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
              onClick={onSubmit}
            >
              Submit
            </button>
            <button
              className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
