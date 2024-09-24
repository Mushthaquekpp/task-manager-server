
# Task Management Server

This project is a RESTful API for managing tasks, built using Node.js, Express.js, and MongoDB. The API allows users to register, log in, and manage their tasks with features such as creating, reading, updating, and deleting tasks. The API is secured with JWT (JSON Web Token) authentication, and all task routes are protected to ensure that only authenticated users can access them.


## Features

- **User Authentication**: Register and login with secure password hashing and JWT token generation. q
- **Task Management**: Create, read, update, and delete tasks.
    - Tasks include fields such as title, description, status, and due date.
    - Each task is associated with the user who created it.
- **Input Validation**: Validate user inputs using Joi for both user registration/login and task creation/update.
- **Error Handling**: Comprehensive error handling for validation, authentication, and database errors.
- **API Documentation**: Auto-generated Swagger documentation for easy API testing and reference.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Mushthaquekpp/task-manager-server
```

Go to the project directory

```bash
  cd task-manager-server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`

`PORT`

`JWT_SECRET`

