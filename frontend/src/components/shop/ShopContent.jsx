import React from 'react'
import CreateProduct from './Dashboard/CreateProduct';
import ProductsByShop from './Dashboard/ProductsByShop';
import OrdersByShop from './Dashboard/OrdersByShop';
import ShopDashboard from './Dashboard/ShopDashboard';
import UserProfileForm from '../Profile/UserProfileForm';

const ShopContent = ({ active }) => {

        const renderContent = () => {
          switch (active) {
            case 1:
              return <ShopDashboard />;
            case 2:
              return <OrdersByShop />;
            case 3:
              return <ProductsByShop />;
            case 4:
              return <CreateProduct/>;
            case 5:
              return <UserProfileForm />;
            default:
              return <div>Content not available</div>;
          }
        };
    
  return (
    <div className='bg-white shadow-xl rounded-lg overflow-hidden'>
        {renderContent()}
    </div>
  )
}

export default ShopContent