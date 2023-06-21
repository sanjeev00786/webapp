import { useEffect, useRef, useState } from "react";
import { db } from "../../../utils/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  getDocs,
} from "firebase/firestore";
import bcrypt from "bcryptjs";

import { toast } from "react-toastify";

const AddModal = ({ onClose }) => {
  const [id, setID] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [email, setEmail] = useState();
  const [access, setAccess] = useState([]);

  const inputRef = useRef(null);

  const [subSystemLists, setSubSystemLists] = useState([]);

  // const [adminAccessLists, setAdminAccessLists] = useState([]);

  // useEffect(() => {
  //   const q = query(collection(db, "admin_access_lists"));
  //   const getAdminAccessLists = onSnapshot(q, (lists) => {
  //     const temp = [];
  //     lists.forEach((list) => {
  //       temp.push({
  //         id: list.id,
  //         ...list.data(),
  //       });
  //     });

  //     setAdminAccessLists(temp);
  //   });
  //   return () => getAdminAccessLists();
  // }, []);

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
    if (password !== password2) {
      inputRef.current.focus();
      toast.error("Password doesn't match!");
      return;
    }

    const q = query(collection(db, "admin_users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      toast.error("This email already exists!");
    });

    if (querySnapshot.empty) {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      const docRef = await addDoc(collection(db, "admin_users"), {
        username: username,
        password: hash,
        email: email,
        access: access,
      });

      toast.success("Admin added successfully");
      onClose();
      return;
    }
  };

  const handleInputChange = (e) => {
    let _tmp = [...access];

    const _access = {
      subsys_id: e.target.name,
      access_id: e.target.value,
    };

    _tmp = _tmp.filter((list) => list.subsys_id != e.target.name);

    setAccess([_access, ..._tmp]);
  };

  return (
    <div
      className="py-12 bg-gray-700 bg-opacity-40 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <div className="w-full flex justify-start text-gray-600 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-wallet"
              width="52"
              height="52"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
              <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
            </svg>
          </div>
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Add New Admin
          </h1>
          <label
            htmlFor="name"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            User Name
          </label>
          <input
            id="name"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="James"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor="password"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="*************"
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setPassword2(e.target.value)}
          />
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
              placeholder="james@james.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <h1 className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
            Access Control
          </h1>
          {subSystemLists &&
            subSystemLists.map((list, index) => {
              return (
                <div key={index}>
                  <h1 className="text-gray-800 text-sm font-bold leading-tight tracking-normal my-3">
                    {list.subsys_name}
                  </h1>
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

export default AddModal;
