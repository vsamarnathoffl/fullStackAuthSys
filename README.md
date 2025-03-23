# Full-Stack Authentication System with MongoDB in Next.js

A comprehensive authentication system built using Next.js, MongoDB, Nodemailer, and Mailtrap. This project provides user registration, login, password reset, and email verification functionalities with a clean and efficient architecture.

## Project Overview
This authentication system allows users to securely register, log in, verify their email addresses, and reset their passwords. The application uses JWT for session management and integrates Nodemailer with Mailtrap for email handling.

## Features
- User Registration with Email Verification
- User Login & JWT-based Authentication
- Password Reset Functionality
- Email Sending via Nodemailer and Mailtrap
- Data Persistence with MongoDB
- Server-Side & API Route Handling via Next.js
- Secure Password Hashing with bcrypt

## Technologies Used
- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Node.js, MongoDB
- **Email Handling:** Nodemailer, Mailtrap
- **Security:** bcrypt, JWT

## How to Run the Project
1. Clone the repository.
2. Navigate to the project folder and install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```sh
   MONGO_URI=<Your MONGO_URI>
   TOKEN_SECRET=<Your TOKEN_SECRET>
   USER=<Your USER>
   PASS=<Your PASS>
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open your browser and visit `http://localhost:3000` to use the app.

## API Endpoints
- `/login` - User Login
- `/signup` - User Registration
- `/verifyemail` - Email Verification
- `/forgotPassword` - Password Reset Request
- `/profile` - User Profile

## Future Improvements
- Implement Role-Based Access Control (RBAC)
- Add OAuth2 / Social Login Integration
- Enhance Security with Rate Limiting

## License
This project is licensed under the MIT License.
