# User Management and Location Tracking Application

This project is a full-stack application that provides a user registration and login system, user profile management, and real-time location tracking functionality. It utilizes a React frontend, Express.js backend, MongoDB for data storage, and Socket.IO for real-time updates.

## Features

- **User Registration and Login**: Allows users to register and log in, with authentication managed via JWT tokens stored in cookies.
- **Profile Management**: Users can view their profile information after logging in.
- **Location Tracking**: Fetches and tracks the user's geolocation, displaying it on a map in real-time.
- **Logout**: Users can log out, which clears the JWT token and prevents unauthorized access to profile data.

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT for secure token-based authentication
- **Map and Geolocation**: Leaflet and Web Geolocation API

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database
- React development environment

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AnkitBalhara/your-repo-name
   cd your-repo-name
### Install dependencies for both frontend and backend:

bash
Copy code
npm install
cd client
npm install
cd ..


### Set up MongoDB:

Update your MongoDB connection string in db/userDB.js.

### Create a .env file in the root directory and add your JWT secret:

makefile
Copy code
JWT_SECRET=your_jwt_secret_key

## Run the backend server:

bash
Copy code
node server.js

## Run the frontend:

bash
Copy code
cd client
npm run dev
### Project Structure

## Frontend (React):

App.jsx: Configures routing with React Router.
Register.jsx: Registration page with form validation and API call to register user.
Login.jsx: Login page with API call to authenticate user and store token.
Profile.jsx: Displays user profile, fetches location updates, and connects to Socket.IO for real-time location.
MapWithSocket.jsx: Displays user location on a map and updates in real-time with Socket.IO.

## Backend (Node.js and Express):

server.js: Sets up routes, middleware, and the Express server.
userModel.js: Mongoose schema defining user model and location storage.
userDB.js: MongoDB connection configuration.

## API Endpoints
POST /registeruser: Registers a new user with username, email, and password.
POST /login/findUser: Authenticates user with email and password.
GET /profilepage: Retrieves authenticated user's profile information.
GET /logout: Logs out the user and clears the JWT token cookie.

##  Authentication and Authorization
JWT token-based authentication is used, with tokens stored in cookies for secure access.
Middleware isSignedIn is used to protect routes, allowing access only if the user has a valid token.

## Real-time Location Tracking
Utilizes navigator.geolocation to fetch the user's location and displays it on a map in MapWithSocket.
Updates the user's location in real-time through Socket.IO events.

### Dependencies
Frontend: react, react-dom, react-router-dom, axios, socket.io-client, leaflet, react-leaflet, tailwindcss
Backend: express, cors, mongoose, jsonwebtoken, cookie-parser, bcryptjs, socket.io

## Usage
Register a new user.
Log in with the registered credentials.
Access the profile page to view user details and location.
The map displays the user's current location, which updates in real-time.
### Notes
Ensure the MongoDB server is running.
Update the socket URL in MapWithSocket.jsx if using a different server address.

## License
This project is licensed under the MIT License.

Enjoy using the User Management and Location Tracking Application!

arduino
Copy code

This README outlines the features, installation steps, structure, and basic usage of the project, providing clear documentation for new users.