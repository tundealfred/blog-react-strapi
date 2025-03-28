// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="text-lg font-bold">
        My Blog
      </Link>
      <div>
        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/admin" className="mr-4">
                Admin
              </Link>
            )}
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-green-500 px-3 py-1 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
