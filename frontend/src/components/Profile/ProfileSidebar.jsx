import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, ShoppingBag, Lock, BookOpen, LogOut ,LayoutDashboard} from 'lucide-react';
import { userLogout } from "../../redux/slices/userSlice";

const ProfileSidebar = ({ setActive, active }) => {
  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogout());
  };

  const menuItems = [
    { id: 1, name: "Profile", icon: User },
    { id: 2, name: "Orders", icon: ShoppingBag },
    { id: 3, name: "Change Password", icon: Lock },
  ];

  const adminItems = [
    { id: 7, name: "Dashboard", icon: LayoutDashboard },
    { id: 4, name: "Manage Users", icon: User },
    { id: 5, name: "Manage Products", icon: BookOpen },
    { id: 6, name: "Manage Orders", icon: ShoppingBag },
  ];

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-t-lg">
        <h2 className="text-2xl font-bold text-white">My Account</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActive(item.id);
                }}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out ${
                  active === item.id
                    ? "bg-indigo-100 text-indigo-700 shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={logoutHandler}
              className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-100 transition-all duration-200 ease-in-out"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Log out</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Admin Sidebar */}
      {user && user.role === "admin" && (
        <div className="mt-6 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-red-600 to-red-800 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {adminItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActive(item.id);
                      console.log(item.id)
                    }}
                    className="w-full flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 ease-in-out"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProfileSidebar;
