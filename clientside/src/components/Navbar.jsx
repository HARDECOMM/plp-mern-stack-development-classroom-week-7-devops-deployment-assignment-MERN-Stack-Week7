import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide hover:text-yellow-300 transition-colors">
          MyBlog
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/posts" className="text-white font-medium hover:text-yellow-300 transition-colors">
            All Posts
          </Link>

          {user ? (
            <>
              <Link to="/create" className="text-white font-medium hover:text-yellow-300 transition-colors">
                Create
              </Link>
              <Link to="/profile" className="text-white font-semibold hover:text-yellow-300 transition-colors">
                {user.username}
              </Link>

              <Button
                onClick={handleLogout}
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-500 font-medium px-3 py-1 rounded"
                size="sm"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white font-medium hover:text-yellow-300 transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-white font-medium hover:text-yellow-300 transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
