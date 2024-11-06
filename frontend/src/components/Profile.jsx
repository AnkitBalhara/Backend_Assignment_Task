import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("/profilepage", { withCredentials: true })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error in Profile Data:- ", error);
      });
  }, []);

  const logout = () => {
    axios
      .post("/logout", {}, { withCredentials: true })
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log("Logout failed:", error);
      });
  };

  return (
    <div className="flex  flex-col items-center min-h-screen bg-gray-100">
      {/* Logout Button at the Top */}
      <div className="w-full flex justify-end p-4 bg-white shadow-md">
        <button
          onClick={logout}
          className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Profile Box Centered and Wider */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg"> {/* Changed max-w-sm to max-w-lg */}
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            User Profile
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Username:</h3>
              <p className="text-gray-600">{data ? data.username : "N/A"}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700">Email:</h3>
              <p className="text-gray-600">{data ? data.email : "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
