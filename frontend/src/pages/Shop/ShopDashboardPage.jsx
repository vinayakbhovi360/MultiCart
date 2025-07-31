import React, { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import ShopSidebar from "../../components/shop/ShopSidebar";
import ShopContent from "../../components/shop/ShopContent";

const ShopDashboardPage = () => {
  const [active, setActive] = useState(() => {
    const savedActiveId = localStorage.getItem("activeMenuId");
    return savedActiveId ? JSON.parse(savedActiveId) : 1;
  });

  useEffect(() => {
    localStorage.setItem("activeMenuId", JSON.stringify(active));
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/4">
              <ShopSidebar active={active} setActive={setActive} />
            </div>
            <div className="flex-1">
              <ShopContent active={active} />
            </div>
          </div>
        </main>
      </>
    </div>
  );
};

export default ShopDashboardPage;
