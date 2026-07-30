import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { LogOut, User, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SkillSwap
            </Link>
          </div>
          
          <div className="flex items-center space-x-6 sm:space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium flex items-center transition-colors">
              <LayoutDashboard className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-indigo-600 font-medium flex items-center transition-colors">
              <User className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            
            <div className="pl-4 border-l border-gray-200 flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-4 hidden md:inline">
                {user?.username}
              </span>
              <button 
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
