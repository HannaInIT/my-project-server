### Project React + Vite
# _Retro Legend_

You can find more information about the project, provided in the README.md file for frontend.

## Description

This repository contains the backend code for retro car rental project. The backend is built using ExpressJS, MongoDB, and Mongoose. It provides the necessary APIs for the frontend (React) to interact with the database and perform CRUD actions.

IMPORTANT: For the frontend code (React), please refer to the [frontend repository](https://github.com/HannaInIT/my-project-client).

#### Instructions to Run this App on Your Computer

1. Clone this repository to your local machine:
```
git clone https://github.com/HannaInIT/my-project-server.git
```
2. Navigate to the project directory:
```
cd retro-car-rental-backend
my-project-server
```
3. Install dependencies:
```
npm install
```

4. Set up environment variables:
 - Create an .env file in the root directory.
 - Add any necessary environment variables, such as database connection strings and secret keys.

 5. Start the server:
```
npm run dev
```
6. The backend will be running at http://localhost:5005.

##### Database Models
The backend includes three database models: User, Car, and Reservation. The User model handles user authentication, while the Cars and Reservation models represent the main functionality of the app.

##### Authentication
I have implemented user authentication, including sign-up, log-in, and log-out functionality with encrypted passwords.

##### Validation and Error Handling
The backend includes validation for incoming requests and centralized error handling to provide informative responses.

##### Demo
You can access the deployed version of API on [adaptable](https://project-retro-legend.adaptable.app/)