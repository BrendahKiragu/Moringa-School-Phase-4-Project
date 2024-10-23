# Book Swap Hub

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation Guidelines](#installation-guidelines)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Database Models](#database-models)
8. [Deployment](#deployment)
9. [License](#license)

## Overview
The Book Swap Hub App is a full-stack web application that allows users to buy, rent, and review books. It includes functionality for user authentication, book listings, leaving book reviews, and transaction management. The front end is built using React and styled with Bootstrap for a responsive design, while the backend is powered by Flask, handling API requests, database interactions, and authentication.

A user signs up as a customer and can browse the existing catalogue of books, make purchases or rent books, and leave reviews.

## Features
- **Authentication**: User authentication using hashed passwords and JWT.
- **Transactions**: Users can buy or rent books, and the status of books (available, rented, sold) is updated accordingly.
- **Book Reviews**: Users can leave reviews and ratings (1-5) for books they’ve purchased or rented.
- **Responsive Design**: Bootstrap is used for styling, making the app mobile-friendly.

## Tech Stack
- **Frontend**: React, Bootstrap
- **Backend**: Flask, SQLAlchemy
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: Flask-Bcrypt for password hashing.

## Installation Guidelines

### Prerequisites
1. **Python:** Ensure you have Python installed (version 3.6 or higher).
2. **Flask:** You need to have Flask installed. If you haven't done so, you can install it using pip:
  ```bash
  pip install flask
  ```

### Backend Setup (Flask)
1. **Clone the repository**:
Visit the repo, click the green `Code` button, and copy the `SSH` key. Then clone it to your local machine.
    ```bash
    git clone git@github.com:BrendahKiragu/Book-Swap-Hub.git
    cd Book-Swap-Hub
    ```

2. **Create a virtual environment and install backend dependencies**:
    ```bash
    pipenv install # Install pipenv if it's not installed
    pipenv shell #Activate the virtual environment
    ```

3. **Install backend dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Seed the database**:
    ```bash
    cd server/ #change to the server directory
    python seed.py
    ```
5. **Set Environment Variables:** Before running the application, you need to set the following environment variables.
- open your terminal and run these commands:
    ```bash
    export FLASK_APP=app.py
    export FLASK_RUN_PORT=5555
    ```
6. **Run the Flask server**: Start the Flask server by executing:
    ```bash
    flask run
    ````

### Frontend Setup (React)
1. **Navigate to the frontend directory**:
    ```bash
    cd client
    ```

2. **Install frontend dependencies**:
    ```bash
    npm install
    ```

3. **Run the React development server**:
    ```bash
    npm run dev
    ```

The React app will run on `http://localhost:4000`, and the Flask API will run on `http://localhost:5000`.

## Usage
1. Sign up as a new user (either vendor or customer).
2. As a vendor, you can:
   - Add new books for sale or rent.
   - View and manage your listed books.
3. As a customer, you can:
   - Browse available books.
   - Buy or rent books.
   - Leave reviews and ratings on purchased or rented books.

## API Endpoints
Here are the key API endpoints available in the app:

- **User Authentication**
  - `POST /api/signup`: Register a new user.
  - `POST /api/login`: Log in a user.
  
- **Books**
  - `GET /api/books`: Get a list of all books.

- **Transactions**
  - `POST /api/transactions`: Create a new transaction (buy/rent a book).
  - `GET /api/transactions`: Get all transactions for the logged-in user.

- **Reviews**
  - `POST /api/reviews`: Add a review for a book.
  - `GET /api/reviews/:book_id`: Get reviews for a specific book.

## Database Models
- **User**: Stores information about users, such as username, email and password.
- **Book**: Stores book information, including title, author, price, condition, and status (available, sold, or rented).
- **Transaction**: Represents transactions, such as book purchases or rentals.
- **Review**: Stores user reviews, date of posting a review and ratings for books.

## Deployment

This app has been deployed on Render. Click on this link [Book Swap hub](https://book-swap-hub.onrender.com/) to see the live app.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
