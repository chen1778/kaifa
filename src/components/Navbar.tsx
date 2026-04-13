import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Menu, X, User, LogOut, Home, BookOpen, Code, Briefcase, Trophy } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isLoading } = useStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-blue-600" />
            <Link to="/" className="text-2xl font-bold text-gray-800">DataLearn</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              <Home className="h-5 w-5 inline mr-1" /> Home
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">
              <BookOpen className="h-5 w-5 inline mr-1" /> Courses
            </Link>
            <Link to="/practice" className="text-gray-700 hover:text-blue-600 transition-colors">
              <Code className="h-5 w-5 inline mr-1" /> Practice
            </Link>
            <Link to="/projects" className="text-gray-700 hover:text-blue-600 transition-colors">
              <Briefcase className="h-5 w-5 inline mr-1" /> Projects
            </Link>
            <Link to="/achievements" className="text-gray-700 hover:text-blue-600 transition-colors">
              <Trophy className="h-5 w-5 inline mr-1" /> Achievements
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                  <User className="h-5 w-5 inline mr-1" /> {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition-colors flex items-center"
                  disabled={isLoading}
                >
                  <LogOut className="h-5 w-5 inline mr-1" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth/login" className="text-gray-700 hover:text-blue-600 transition-colors">Login</Link>
                <Link to="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link to="/" className="block text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/courses" className="block text-gray-700 hover:text-blue-600 transition-colors">Courses</Link>
            <Link to="/practice" className="block text-gray-700 hover:text-blue-600 transition-colors">Practice</Link>
            <Link to="/projects" className="block text-gray-700 hover:text-blue-600 transition-colors">Projects</Link>
            <Link to="/achievements" className="block text-gray-700 hover:text-blue-600 transition-colors">Achievements</Link>

            {user ? (
              <div className="pt-3 border-t border-gray-200">
                <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-700 hover:text-red-600 transition-colors"
                  disabled={isLoading}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <Link to="/auth/login" className="block text-gray-700 hover:text-blue-600 transition-colors">Login</Link>
                <Link to="/auth/register" className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center">Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;