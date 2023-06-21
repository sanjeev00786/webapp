import { ProfileMenu } from "..";

const Navbar = () => {
  return (
    <div className="flex flex-shrink-0 transition-all">
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"></div>
      <div className="fixed inset-y-0 z-10 w-16 bg-white"></div>
      <nav
        aria-label="Options"
        className="fixed inset-x-0 bottom-0 flex flex-row-reverse items-center justify-between px-4 py-2 bg-white border-t border-indigo-100 sm:hidden shadow-t rounded-t-3xl"
      >
        <button className="p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2">
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

        <a href="#">
          <img
            className="w-10 h-auto"
            src="https://raw.githubusercontent.com/kamona-ui/dashboard-alpine/main/public/assets/images/logo.png"
            alt="K-UI"
          />
        </a>

        <div className="relative flex items-center flex-shrink-0 p-2">
          <button className="transition-opacity rounded-lg opacity-80 hover:opacity-100 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2">
            <img
              className="w-8 h-8 rounded-lg shadow-md"
              src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
              alt="Ahmed Kamel"
            />
            <span className="sr-only">User menu</span>
          </button>
          <div
            tabIndex="-1"
            className="absolute w-48 py-1 mt-2 origin-bottom-left bg-white rounded-md shadow-lg left-10 bottom-14 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-label="user menu"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Your Profile
            </a>

            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </a>

            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </a>
          </div>
        </div>
      </nav>

      <nav
        aria-label="Options"
        className="z-20 flex-col items-center flex-shrink-0 hidden w-16 py-4 bg-white border-r-2 border-indigo-100 shadow-md sm:flex rounded-tr-3xl rounded-br-3xl"
      >
        <div className="flex-shrink-0 py-4">
          <a href="#">
            <img
              className="w-10 h-auto"
              src="https://raw.githubusercontent.com/kamona-ui/dashboard-alpine/main/public/assets/images/logo.png"
              alt="K-UI"
            />
          </a>
        </div>
        <div className="flex flex-col items-center flex-1 p-2 space-y-4">
          <button className="p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2">
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
          </button>{" "}
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

      <div className="fixed inset-y-0 left-0 z-10 flex-shrink-0 w-64 bg-white border-r-2 border-indigo-100 shadow-lg sm:left-16 rounded-tr-3xl rounded-br-3xl sm:w-72 lg:static lg:w-64">
        <nav aria-label="Main" className="flex flex-col h-full">
          <div className="flex items-center justify-center flex-shrink-0 py-10">
            <a href="#">
              <img
                className="w-24 h-auto"
                src="https://raw.githubusercontent.com/kamona-ui/dashboard-alpine/main/public/assets/images/logo.png"
                alt="K-UI"
              />
            </a>
          </div>

          <div className="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto">
            <a
              href="#"
              className="flex items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg"
            >
              <span aria-hidden="true" className="p-2 bg-indigo-700 rounded-lg">
                <svg
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <span>Home</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white"
            >
              <span
                aria-hidden="true"
                className="p-2 transition-colors rounded-lg group-hover:bg-indigo-700 group-hover:text-white"
              >
                <svg
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
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span>Pages</span>
            </a>
          </div>

          <div className="flex-shrink-0 p-4 mt-10">
            <div className="hidden p-2 space-y-6 bg-gray-100 rounded-lg md:block">
              <img
                aria-hidden="true"
                className="-mt-10"
                src="https://raw.githubusercontent.com/kamona-ui/dashboard-alpine/52b4b4abb92ef251f6610be416038b48209d7a81/public/assets/images/undraw_web_developer_p3e5.svg"
              />
            </div>

            <button className="w-full px-4 py-2 text-center text-white transition-colors bg-indigo-600 rounded-lg md:hidden hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-100">
              Upgrade to pro
            </button>
          </div>
        </nav>

        {/* <section className="px-4 py-6">
          <h2 className="text-xl">Messages</h2>
        </section>

        <section className="px-4 py-6">
          <h2 className="text-xl">Notifications</h2>
        </section> */}
      </div>
    </div>
  );
};

export default Navbar;
