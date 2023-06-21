import { ProfileMenu, Logo } from "..";
import { MdAdminPanelSettings } from "react-icons/md";
import { SiHomebridge } from "react-icons/si";
import { TbHomeShield } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useState } from "react";

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
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <button className="p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2">
            <span className="sr-only">Toggle message panel</span>
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </button>
          <button className="p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2">
            <span className="sr-only">Toggle notifications panel</span>
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
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
                  to="/admin/admin"
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
              </div>

              <div className="flex-shrink-0 p-4 mt-10">
                <div className="hidden p-2 space-y-6 bg-gray-100 rounded-lg md:block">
                  <img
                    aria-hidden="true"
                    className="-mt-10"
                    src="https://raw.githubusercontent.com/kamona-ui/dashboard-alpine/52b4b4abb92ef251f6610be416038b48209d7a81/public/assets/images/undraw_web_developer_p3e5.svg"
                  />
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
