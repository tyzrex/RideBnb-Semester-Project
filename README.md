
# RideBnb - A vehicle sharing platform

Ridebnb is a project that aims to revolutionize the way people explore the world by offering a unique marketplace for booking rides on their own terms. This project provides a platform where users can rent cars and bikes directly from owners, ensuring freedom, flexibility, and affordability.

## Tech Stack

Ridebnb is built using the following technologies:

* **PostgreSQL**: An open-source relational database management system for storing and managing data related to users, rides, bookings, and transactions.
* **Express.js**: A fast and minimalist web application framework for Node.js, used to build the server-side application logic, handle HTTP requests, and manage API routing.
* **React**: A popular JavaScript library for building user interfaces, utilized to create dynamic and interactive components for a seamless user experience.
* **Node.js**: A JavaScript runtime environment that powers the server-side of Ridebnb, handling incoming requests, interacting with the database, and performing server operations.)
* **Socket-io**: Event-driven library for real-time web applications, used for realtime notification and messaging system

## Features

- Light/dark mode toggle
- Realtime Messaging
- Realtime Notifications
- User Authentication
- Booking Service

## Running the project locally

Clone the github repo

```bash
  git clone https://github.com/tyzrex/RideBnb-Semester-Project/tree/main
  cd Ridebnb-Semester-Project
```

Install the dependencies

```bash
  cd server 
  npm install

  cd ..
  cd client 

  npm install 
```

Running the project

* In both the server and client directory run

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PG_USER = postgres`
`PG_PASSWORD = password`
`PG_HOST = localhost`
`PG_PORT = 5432`
`PG_DATABASE = dbname`

`CLOUDINARY_URL = cloudinaryurl`
`CLOUDINARY_API_KEY = apikey`
`CLOUDINARY_API_SECRET = apisecrect`
`CLOUDINARY_CLOUD_NAME = cloudname`

`JWT_SECRET = jwtsecrectkey`

## Screenshots

Dark Mode

![App Screenshot](./docs/darkmode.jpg)

Light Mode

![App](./docs/lightmode.jpg)

## Lessons Learned

* Basic Backend development with node and express
* ui development and frontend with react
* database design
* socket for realtime communication

## Feedback

If you have any feedback, please reach out to me at sulavbaral58@gmail.com

## Contributing

Contributions are always welcome! If you want to contribute to this project follow the following instructions

* Create a new branch for the feature you want to add
* Send a pull request to the `dev` branch of this repo with the feature description you have added
