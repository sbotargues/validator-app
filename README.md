# Technical Test - Token Generator and Validator

This project consists of a frontend application and a backend server. The frontend application generates random tokens and validates them via the backend server.

## Tools Used

- Frontend: React, TypeScript, Axios
- Backend: Node.js, Express

## Usage Instructions

To get this project up and running, follow these steps:

### Clone the Repository

To start, clone this repository to your local machine using git:

- git clone https://github.com/sbotargues/validator-app.git
- cd your-repository

### Environment Configuration

Before running the application, ensure you have correctly set up your environment variables. You can do this by renaming the .env.development file to .env. This allows the application to correctly access the PORT variable for the frontend.

### Start the Application

This project comes with two start scripts, one for Unix-based environments (like Linux or MacOS) and one for Windows.

## Unix (Linux, MacOS)

To start the project in a Unix environment, use the start.sh script:

- chmod +x start.sh
- ./start.sh

This will install all necessary dependencies and start both the backend server and the frontend application.

## Windows

To start the project on Windows, use the start.bat script:

- start.bat

This will install all necessary dependencies and start both the backend server and the frontend application.

### Navigate to the Application

Once both the backend and frontend are running, you can navigate to the application in your web browser. By default, the application will be available at http://localhost:8080.

### How It Works

The application allows you to enter a series of digits, which are used to generate a token. Each token consists of 16 of these digits, grouped in blocks of 4 separated by dashes.

Once the token is generated, you can validate it by pressing the "Validate Token" button. The token will be sent to the backend server, which will determine whether it is valid or not according to the specific implementation of the validation algorithm.

In addition, you can start an automatic cycle of token generation and validation by pressing the "Start/Stop Generation" button. While this cycle is active, the application will generate and validate a new token every second.
