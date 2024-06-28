import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const MainLayout = () => {
  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 flex justify-between items-center px-8 py-4">
        <span className="text-2xl font-bold text-white">
          <Link to="/home">Event Management</Link>
        </span>
        <div className="flex items-center space-x-4">
          <span className="text-white font-bold">{userInfo?.name}</span>
          {token ? (
            <span
              className="text-white hover:text-gray-200 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          ) : null}
        </div>
      </header>
      <div className="flex-grow overflow-auto w-[85%] mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
