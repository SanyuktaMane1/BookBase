import { BookIcon, PlusIcon, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ isDetailPage }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-xl backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <BookIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              BookVault
            </h1>
          </div>

          {isDetailPage ? (
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-700 rounded-lg font-medium shadow-lg transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to List</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 bg-white/10 p-1 rounded-xl backdrop-blur-sm">
              <button
                onClick={() => navigate("/")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === "/"
                    ? "bg-white text-blue-700 shadow-lg transform scale-105"
                    : "text-white hover:bg-white/20 hover:scale-105"
                }`}
              >
                <BookIcon className="w-5 h-5" />
                <span>Library</span>
              </button>
              <button
                onClick={() => navigate("/add")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === "/add"
                    ? "bg-white text-blue-700 shadow-lg transform scale-105"
                    : "text-white hover:bg-white/20 hover:scale-105"
                }`}
              >
                <PlusIcon className="w-5 h-5" />
                <span>Add Book</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
