import React, { useState, useEffect } from "react";

import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import Navbar from "../components/Layout/Navbar";

const ProfilePage = () => {
  // const [active, setActive] = useState(() => {

  //   const savedActiveId = localStorage.getItem('activeMenuId');
  //   return savedActiveId ? JSON.parse(savedActiveId) : 1;
  // });

  const [active,setActive] = useState(1)

  useEffect(() => {
    localStorage.setItem('activeMenuId', JSON.stringify(active));
  }, [active]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/4">
              <ProfileSidebar active={active} setActive={setActive} />
            </div>
            <div className="flex-1">
              <ProfileContent active={active} />
            </div>
          </div>
        </main>
      </>
    </div>
  );
};

export default ProfilePage;
