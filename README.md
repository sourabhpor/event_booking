# Event Booking API

A Node.js API for managing events and bookings with roles for ORGANIZER and CUSTOMER.

## Features

- User registration and login with JWT authentication
- Role-based access control (ORGANIZER | CUSTOMER)
- Event workflow: DRAFT → PUBLISHED → CANCELLED
- Booking system with atomic seat updates
- Organizer analytics: revenue, tickets sold, top-selling event
- Event filtering, sorting, and pagination
- Real-time notifications (Socket.io support)
- Optional: caching (Redis)

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- Morgan for logging
- Joi for request validation

## Project Structure
