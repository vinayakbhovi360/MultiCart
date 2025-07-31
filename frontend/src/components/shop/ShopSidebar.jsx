import React from "react";
import { useDispatch } from "react-redux";
import { LayoutDashboard, ShoppingCart, Package, PlusCircle, User, LogOut } from "lucide-react";
import { userLogout } from "../../redux/slices/userSlice"; 
import { useNavigate } from "react-router-dom";

const menuItems = [
  { id: 1, name: "Dashboard", icon: LayoutDashboard },
  { id: 2, name: "All Orders", icon: ShoppingCart },
  { id: 3, name: "All Products", icon: Package },
  { id: 4, name: "Create Product", icon: PlusCircle },
  { id: 5, name: "Profile", icon: User },
];

const ShopSidebar = ({ setActive, active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logoutHandler = () => {
    dispatch(userLogout());
    navigate("/login"); 
 
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-t-lg">
        <h2 className="text-2xl font-bold text-white">My Shop</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActive(item.id);
                  item.onClick && item.onClick();
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
    </div>
  );
};

export default ShopSidebar;
