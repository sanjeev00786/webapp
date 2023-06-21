import { ProfileMenu, Logo } from "..";
import {
  MdAdminPanelSettings,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { TbHomeShield } from "react-icons/tb";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaUsersCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import { MenuBG } from "../../../assets";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentSidebarTab, setCurrentSidebarTab] = useState(null);

  const handleMenu = (e) => {
    e.preventDefault();
    setSidebarOpen(!isSidebarOpen);
    setCurrentSidebarTab("userMenu");
  };

  return (
    <div className="flex flex-shrink-0 transition-all">
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"></div>
      <div className="fixed inset-y-0 z-10 w-16 bg-white"></div>

      <nav
        aria-label="Options"
        className="z-20 flex-col items-center flex-shrink-0 hidden w-16 py-4 bg-white border-r-2 border-indigo-100 shadow-md sm:flex rounded-tr-3xl rounded-br-3xl"
      >
        <div className="flex-shrink-0 py-4">
          <Logo width={10} />
        </div>
        <div className="flex flex-col items-center flex-1 p-2 space-y-4">
          <button
            className="p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2"
            onClick={handleMenu}
          >
            <span className="sr-only">Toggle sidebar</span>
            <HiOutlineMenuAlt2 className="w-6 h-6" />
          </button>
          <button className="p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2">
            <span className="sr-only">Toggle message panel</span>
            <BiMessageRoundedDots className="w-6 h-6" />
          </button>
          <button className="p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2">
            <span className="sr-only">Toggle notifications panel</span>
            <MdOutlineNotificationsNone className="w-6 h-6" />
          </button>
        </div>

        <ProfileMenu />
      </nav>

      {isSidebarOpen && (
        <div className="fixed inset-y-0 left-0 z-10 flex-shrink-0 w-64 bg-white border-r-2 border-indigo-100 shadow-lg sm:left-16 rounded-tr-3xl rounded-br-3xl sm:w-72 lg:static lg:w-64">
          {currentSidebarTab == "userMenu" ? (
            <nav aria-label="Main" className="flex flex-col h-full">
              <div className="flex items-center justify-center flex-shrink-0 py-10">
                <Logo width={24} />
              </div>

              <div className="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto">
                <Link
                  tabIndex={-1}
                  to="/admin"
                  className="flex items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg"
                >
                  <span
                    aria-hidden="true"
                    className="p-2 bg-indigo-700 rounded-lg"
                  >
                    <TbHomeShield className="w-6 h-6" />
                  </span>
                  <span>Home</span>
                </Link>
                <Link
                  tabIndex={2}
                  to="/admin/admins"
                  className="flex items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white"
                >
                  <span
                    aria-hidden="true"
                    className="p-2 transition-colors rounded-lg group-hover:bg-indigo-700 group-hover:text-white"
                  >
                    <MdAdminPanelSettings className="w-6 h-6" />
                  </span>
                  <span>Admins</span>
                </Link>
                <Link
                  tabIndex={3}
                  to="/admin/users"
                  className="flex items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white"
                >
                  <span
                    aria-hidden="true"
                    className="p-2 transition-colors rounded-lg group-hover:bg-indigo-700 group-hover:text-white"
                  >
                    <FaUsersCog className="w-6 h-6" />
                  </span>
                  <span>Users</span>
                </Link>
              </div>

              <div className="flex-shrink-0 p-4 mt-10">
                <div className="hidden p-2 space-y-6 bg-gray-100 rounded-lg md:block">
                  <img aria-hidden="true" className="-mt-10" src={MenuBG} />
                </div>
              </div>
            </nav>
          ) : (
            ""
          )}

          {/* <section className="px-4 py-6">
            <h2 className="text-xl">Messages</h2>
          </section> */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
