import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login")
  };

  const close = () => setOpen(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor">
              <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/dashboard" className="font-bold text-lg text-blue-600 ">
            Habit Tracker
          </Link>
          {user && (
            <button
              onClick={handleLogout}
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 bg-white border-r shadow-sm w-64 h-screen transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div>
            <Link
              to="/dashboard"
              onClick={close}
              className="text-2xl font-bold text-blue-600 mb-6 block"
            >
              Habit Tracker
            </Link>
            <nav className="space-y-2">
              <Link
                to="/dashboard"
                onClick={close}
                className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="mt-6">
            {user ? (
              <>
                <p className="text-sm text-gray-600 mb-2">Hello, {user.name}</p>
                <button
                  onClick={() => {
                    handleLogout();
                    close();
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={close}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={close}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-center"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
