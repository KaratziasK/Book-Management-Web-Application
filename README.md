# Book Management Web Application
## Overview
 The application allows users to manage a collection of books with functionalities for adding and searching books. It consists of a frontend interface and a backend server.
 
**NOTE** : This project was developed as part of an assignment at Harokopio University of Athens.

## Features
### Frontend
The frontend of the application provides two main functionalities:

1. **Add a New Book:**
- Users can enter details of a new book, including the author, title, genre, and price.
- The data is sent to the backend via an HTTP POST request.
- Alerts are displayed to inform users of the status of their submission.

2. **Search for Books:**
- Users can search for books using a keyword.
- The search results, which include books with matching titles or authors, are displayed on the page via an HTTP GET request to the backend.

### Backend
The backend consists of two primary endpoints:

1. **POST /books**:

Receives data from the frontend and adds a new book to the SQLite database.

2. **GET /books/**:
Returns books that contain the keyword in either the title or author fields.

## Project Files

- `index.html`: Contains the HTML structure for the user interface.
- `styles.css`: Defines the styling and layout of the web page.
- `app.js`: Handles client-side scripting for interacting with the form and managing user inputs.
- `server.js`: Implements the backend server using Node.js and Express, including database interactions.
- `books.sqlite`: SQLite database file containing book records.
