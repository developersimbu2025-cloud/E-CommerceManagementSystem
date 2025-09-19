import { Outlet} from "react-router-dom";

import Sidebar from "../component/Sidebar/SideBar";
import { useState } from "react";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  // login page-க்கு header/footer hide

  return (
    <div className="min-h-screen flex bg-[#f5f6fa]">
      {/* Desktop Sidebar */}
      <aside className="w-64  h-full hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-1xl font-bold text-gray-800">
            E-Commerce Management System
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Sidebar onClick={() => setIsOpen(false)} />
        </div>
      </aside>

      {/* Mobile Sidebar and Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between bg-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-gray-800">
            E-Commerce Management System
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 text-2xl"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="w-64 bg-white h-full shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-800">StoryBook</h1>
              </div>
              <Sidebar onClick={() => setIsOpen(false)} />
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
