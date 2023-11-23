# Blogging Platform

## Description

This project is a RESTful API for managing posts, comments and user interactions.

## Setup and Installation

### Prerequisites

- Node.js
- npm or yarn
- MySQL

### Installation

1. Clone the repository: git clone https://github.com/Shakbr/blogging-platform

2. Navigate to the project directory: cd blogging-platform

3. Install dependencies: npm install

4. Set up your `.env` file with the following environment variables:
   NODE_ENV=your-environment-stage
   PORT=port-number

DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=your_database

JWT_SECRET=your_jwt_secret

## Running the Server

To start the server, run: npm start

The server will start on `http://localhost:3000` by default.

## Testing Endpoints

You can use tools like Postman or cURL to test the API endpoints. Below are some example requests:

## API Endpoints

### User Routes

- `POST /user/login`: User login
- Validation:
- `email`: Valid email address
- `password`: Non-empty password
- `POST /user/register`: Register a new user
- Validation:
- `username`: Non-empty username
- `email`: Valid email address
- `password`: Password with minimum 6 characters
- `GET /user/top-commenters`: Fetch top commenters (Authenticated route)

### Post Routes

- `GET /posts/`: Fetch all posts with comments
- `POST /posts/`: Create a new post (Authenticated route)
- Validation:
- `title`: Non-empty title
- `content`: Non-empty content
- `GET /posts/user/:userId`: Fetch posts by a specific user (Authenticated route)
- Validation:
- `userId`: Numeric user ID
- `POST /posts/like/:postId`: Like a post (Authenticated route)

### Comment Routes

- `POST /comments/`: Create a new comment (Authenticated route)
- Validation:
- `content`: Non-empty content
- `postId`: Numeric post ID
- `timestamp`: ISO8601 timestamp

## Testing

You can test the API endpoints using tools like Postman or cURL. Example requests:

### Login

POST /user/login
Body:
{
"email": "user@example.com",
"password": "password123"
}

### Register

POST /user/register
Body:
{
"username": "newuser",
"email": "newuser@example.com",
"password": "password123"
}

## Notes

- Ensure that the MySQL server is running before starting the API server.
- The `auth` middleware is used to protect routes that require authentication.

## Contact

For more information or queries, contact [shanshiashvilishako@gmail.com].
