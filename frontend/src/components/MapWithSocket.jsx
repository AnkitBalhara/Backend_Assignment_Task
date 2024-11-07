import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Update with your server's address if needed

function MapWithSocket() {
  const [location, setLocation] = useState(null); // Initially set to null to wait for geolocation
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    // Get user's current location on initial load
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );

    // Listen for location updates from WebSocket
    socket.on('locationUpdate', (newLocation) => {
      setLocation({
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
      });
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off('locationUpdate');
    };
  }, []);

  // Render the map only if the initial location is set
  return location ? (
    <MapContainer
      center={[location.latitude, location.longitude]}
      zoom={zoom}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[location.latitude, location.longitude]}>
        <Popup>Your current location</Popup>
      </Marker>
    </MapContainer>
  ) : (
    <p>Loading map...</p> // Show a loading message until location is set
  );
}

export default MapWithSocket;
