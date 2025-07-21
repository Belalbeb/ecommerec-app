 E-Commerce Web Application

A full-stack e-commerce web application using Angular (frontend), Express.js (backend), and MongoDB for the database.


## Tech Stack

- Frontend: Angular
- Backend: Express.js (Node.js)
- Database: MongoDB 
- Authentication: jwt Authentication

## Features

- User registration and login
- Product listing with images and descriptions
- Add to cart and remove from cart
- Update product quantity in cart
- Admin: Add/Edit/Delete products
- Responsive UI for desktop and mobile

## Project Structure
ecommerce-app/
│
├── backend/                  # Node.js + Express + MongoDB
│   ├── controllers/          # Route handler logic
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth & error handling
│   ├── config/               # DB connection & config
│   ├── server.js             # App entry point
│   └── .env                  # Environment variables
│
├── frontend/                 # Angular app
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # UI components (login, cart, etc.)
│   │   │   ├── services/     # HTTP services
│   │   │   ├── models/       # Interfaces for product, user...
│   │   │   └── app.module.ts # Root Angular module
│   └── angular.json          # Angular config
│
├── README.md
└── package.json
