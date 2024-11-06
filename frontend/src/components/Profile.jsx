import React from 'react';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  const { username, email } = location.state || {};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">User Profile</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700">Username:</h3>
            <p className="text-gray-600">{username || "N/A"}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700">Email:</h3>
            <p className="text-gray-600">{email || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
