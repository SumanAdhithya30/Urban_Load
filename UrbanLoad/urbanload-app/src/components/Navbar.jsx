import { useClerk } from "@clerk/clerk-react";

const Navbar = () => {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-600 tracking-tight hover:text-blue-700 cursor-pointer">
              UrbanLoad
            </span>
          </div>

          {/* Logout Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
