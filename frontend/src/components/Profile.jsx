import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import io from "socket.io-client";
import MapWithSocket from "./MapWithSocket";

const Profile = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to the Socket.IO server only once
    // socketRef.current = io("http://localhost:3000");

    // Fetch user profile data
    axios
      .get("/profilepage", { withCredentials: true })
      .then((response) => {
        setData(response.data); // `response.data` should contain `_id`, `username`, and `email`
      })
      .catch((error) => {
        if (error || (error.response && error.response.status === 401)) {
          // alert("First Login");
          navigate("/login");
        }
        console.error("Error fetching profile data:", error);
      });

    // Get the user's location
    if (navigator.geolocation) {
      const geoWatchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Only update the location if it has changed
          if (
            !location ||
            location.latitude !== latitude ||
            location.longitude !== longitude
          ) {
            setLocation({ latitude, longitude });

            // Emit location data to the server
            if (data && data._id && socketRef.current) {
              socketRef.current.emit("locationUpdate", {
                userId: data._id, // Using `_id` from data
                longitude,
                latitude,
              });
            }
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
      );

      // Clean up the geolocation watcher
      return () => {
        navigator.geolocation.clearWatch(geoWatchId);
      };
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    return () => {
      // Clean up the socket connection on component unmount
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [navigate]);

  const logout = () => {
    axios
      .get("/logout", { withCredentials: true })
      .then(() => {
        setData(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full flex justify-end p-4 bg-white shadow-md">
        <button
          onClick={logout}
          className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
        >
          Logout
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            User Profile
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Username:</h3>
              <p className="text-gray-600">
                {data ? data.username : "Loading..."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700">Email:</h3>
              <p className="text-gray-600">
                {data ? data.email : "Loading..."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700">Location:</h3>
              <p className="text-gray-600">
                {location
                  ? `Lat: ${location.latitude}, Lon: ${location.longitude}`
                  : "Fetching location..."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <MapWithSocket />
    </div>
  );
};

export default Profile;
