# MERN + OAuth: Image Search Project

This is a full-stack MERN application built for an internship task. It features a complete user authentication system using Passport.js (Google, GitHub, Facebook) and allows authenticated users to search for images via the Unsplash API.

## Features
* **OAuth Authentication:** Secure login with Google, GitHub, and Facebook using Passport.js.
* **Persistent Sessions:** Users remain logged in.
* **Protected API:** Only authenticated users can access search features.
* **Unsplash API:** Fetches live, high-resolution images.
* **Multi-Select Grid:** A responsive 4-column grid with a multi-select feature.
* **Top Searches:** A banner showing the top 5 most frequent searches across all users.
* **Search History:** A sidebar showing the logged-in user's personal search history.

## Tech Stack
* **Frontend:** React, React Router, Axios
* **Backend:** Node.js, Express, Mongoose
* **Authentication:** Passport.js (passport-google-oauth20, passport-github2, passport-facebook)
* **Database:** MongoDB
* **API:** Unsplash API

---

## Project Structure

```
/
├── client/     # React Frontend
└── server/     # Node.js/Express Backend
```

---

## Setup & Installation

You must have **two separate terminals** open to run this project.

### 1. Backend (`/server`)

```bash
# Navigate to the server folder
cd server

# Install dependencies
npm install

# Create a .env file in the /server folder
# and add all the required keys (see .env.example)
```

**`server/.env` File:**
You must provide your own keys for the application to run.
```
PORT=5001
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_random_session_secret_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

```bash
# Start the backend server
npm start
```

### 2. Frontend (`/client`)

```bash
# (In a new terminal) Navigate to the client folder
cd client

# Install dependencies
npm install

# Start the React app (runs on http://localhost:3000)
npm start
```

---

## API Endpoints (Postman Collection)

All `/api` routes are protected and require an authenticated session.

* `POST /api/search`
    * **Body:** `{ "term": "cats" }`
    * **Description:** Saves the search to history and returns Unsplash image results.
* `GET /api/history`
    * **Description:** Returns the logged-in user's personal search history.
* `GET /api/top-searches`
    * **Description:** Returns the top 5 most frequent search terms from all users.

**Auth Routes:**
* `GET /auth/google` (Initiates Google login)
* `GET /auth/github` (Initiates GitHub login)
* `GET /auth/facebook` (Initiates Facebook login)
* `GET /auth/logout` (Logs the user out)
* `GET /auth/login/success` (Checks if a user is currently logged in)
