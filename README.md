# Book Management Store

## Overview

Book Management Store is a web application that allows users to manage their book collection. Users can add, update, view and delete books. The app includes user authentication to ensure secure access to the book management features.

## Features

- User Authentication: Users can register and log in to manage their books.
- Add Book: Authenticated users can add new books to their collection.
- Update Book: Authenticated users can update details of existing books.
- View Books: Users can view the list of books.
- Delete Book: Authenticated users can delete a book from the coolection.


## Installation

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB Atlas account for database

### Backend Setup

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Install backend dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your environment variables:
    ```
    PORT=5000
    MONGODB_URI=<your_mongodb_uri>
    ABCD=<your_value>
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install frontend dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. Register a new account or log in with an existing account.
3. Use the navigation bar to add new books, update existing books, and view the list of books.

