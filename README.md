# Quickpoll

Quickpoll is a web application that allows users to create polls, vote in polls, and view analytics of the polls. The platform also supports sharing polls and setting user profiles as public or private. Users can sign in using Google or email, and they can sign up if they do not have an account.

## Features

- **Create Polls:** Signed-in users can create polls with multiple options.
- **Vote in Polls:** Users can vote in the polls and see the results in real-time.
- **View Analytics:** Users can view detailed analytics of the poll, including the number of votes for each option.
- **Share Polls:** Polls can be shared via a unique link.
- **User Profiles:** Profiles can be set to public or private, and users can manage their own polls.
- **Authentication:** Users can sign in using Google or email.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later) or [yarn](https://yarnpkg.com/) (v1.22.x or later)
- [MongoDB](https://www.mongodb.com/) (v4.x or later)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/quickpoll.git
cd quickpoll
```
### 2. Install Dependencies
You can install the necessary dependencies using npm or yarn.
#### Using npm:
```bash
npm install
```
#### Using Yarn:
```bash
yarn install
```
### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following environment variables:
```bash
REACT_APP_MONGO_CONNECT_URL=<your-mongodb-connection-string>
PORT=<port-number> # default: 3000
REACT_APP_SECRET_KEY=<your-jwt-secret-key>
VITE_FIREBASE_API_KEY=<your-firebase-api-key>
```

### 4. Start the Development Server
After setting up the environment variables, you can start the development server.
#### Using npm:
```bash
npm run dev
```
#### Using Yarn:
```bash
yarn dev
```
The application should now be running on http://localhost:3000.
### 5. Build for Production
To build the application for production, run the following command:
#### Using npm:
```bash
npm run build
```
#### Using Yarn:
```bash
yarn build
```
### 6. Start the Production Server
After building the application, you can start the production server.
#### Using npm:
```bash
npm start
```
#### Using Yarn:
```bash
yarn start
```

# Usage
Once the application is running, you can access the following features:
 - **Sign Up/Sign In:** Create a new account or sign in using Google or email.
 - **Create Poll:** Create a new poll with multiple options.
 - **Vote:** Participate in existing polls by voting for an option.
 - **View Results:** See real-time analytics and results for each poll.
 - **Share Poll:** Share the poll link with others.
 - **Manage Profile:** Set your profile as public or private, and manage your polls.

# Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
# License
This project is licensed under the Gupta License - see the LICENSE file for details.
# Contact
For any inquiries, don't hesitate to get in touch with guptasitapur489+quickpoll@gmail.com 
