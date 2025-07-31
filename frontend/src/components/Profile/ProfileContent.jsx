import React from "react";
import UserProfileForm from "./UserProfileForm";
import ChangePassword from "./ChangePassword";
import OrdersByUser from "./OrdersByUser";
import ProductsAdminPage from "../Admin/Dashboard/ProductsAdmin";
import OrdersAdmin from "../Admin/Dashboard/OrdersAdmin";
import UsersAdmin from "../Admin/Dashboard/UsersAdmin";
import AdminDashboard from "../Admin/Dashboard/AdminDashboard";
// import OrderList from './OrderList';
// import RefundList from './RefundList';
// import TrackOrder from './TrackOrder';
// import AddressList from './AddressList';

const ProfileContent = ({ active }) => {
  const renderContent = () => {
    switch (active) {
      case 1:
        return <UserProfileForm />;
      case 2:
        return <OrdersByUser />;
      case 3:
        return <ChangePassword />;
      case 4:
        return <UsersAdmin />;
      case 5:
        return <ProductsAdminPage />;
      case 6:
        return <OrdersAdmin />;
      case 7 : 
      return <AdminDashboard/>
      default:
        return <div>Content not available</div>;
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default ProfileContent;
