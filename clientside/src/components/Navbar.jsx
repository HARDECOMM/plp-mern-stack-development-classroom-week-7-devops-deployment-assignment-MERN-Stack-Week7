import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, PlusCircle, LogOut, User, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-bold tracking-tight text-slate-800 hover:text-primary transition-colors duration-200"
        >
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
            <span className="font-extrabold text-lg">3</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none">MTT Alumni</span>
            <span className="text-xs text-primary font-medium tracking-wider">PROJECTS HUB</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/posts" 
            className="flex items-center gap-1.5 text-slate-600 font-medium hover:text-primary transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Explore Projects
          </Link>

          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="flex items-center gap-1.5 text-slate-600 font-medium hover:text-primary transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link 
                to="/create" 
                className="flex items-center gap-1.5 text-slate-600 font-medium hover:text-primary transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Showcase Project
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center gap-1.5 text-slate-700 font-semibold hover:text-primary transition-colors border-l pl-4 border-slate-200"
              >
                <User className="w-4 h-4 text-primary" />
                {user.username}
              </Link>

              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-slate-600 hover:text-red-600 hover:bg-red-50/50 flex items-center gap-1 font-medium px-3 py-1.5 rounded-lg"
                size="sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="text-slate-600 font-medium hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link to="/register">
                <Button className="bg-primary text-white hover:bg-primary-hover font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-primary/10">
                  Join Hub
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-50 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link 
              to="/posts" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 text-slate-700 font-medium py-2 border-b border-slate-50 hover:text-primary transition-colors"
            >
              <BookOpen className="w-5 h-5 text-slate-400" />
              Explore Projects
            </Link>

            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-slate-700 font-medium py-2 border-b border-slate-50 hover:text-primary transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5 text-slate-400" />
                  Dashboard
                </Link>
                <Link 
                  to="/create" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-slate-700 font-medium py-2 border-b border-slate-50 hover:text-primary transition-colors"
                >
                  <PlusCircle className="w-5 h-5 text-slate-400" />
                  Showcase Project
                </Link>
                <Link 
                  to="/profile" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-slate-700 font-semibold py-2 border-b border-slate-50 hover:text-primary transition-colors"
                >
                  <User className="w-5 h-5 text-primary" />
                  Profile ({user.username})
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-600 font-medium py-2 text-left hover:bg-red-50/50 w-full transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="text-center text-slate-700 font-medium py-2 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  <Button className="w-full bg-primary text-white hover:bg-primary-hover font-semibold py-2.5 rounded-lg shadow-md shadow-primary/10">
                    Join Hub
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
