# Banana 🍌

Banana is a simple frontend and backend application for user registration and login. Built with Django, Django REST Framework, dj-rest-auth, Vite, and React.

Ideal as a starting point for future projects.

## Features

- User registration and login
- Account deletion
- Avatar and bio customization
- Username and password updates
- Display a list of users
- View any user's profile

## Deployment

Instructions are for macOS.

### Requirements

- Node.js
- Python

### Backend Setup

1. Open the backend directory in your terminal.
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip3 install -r requirements.txt
   ```
4. Apply database migrations:
   ```bash
   python3 manage.py makemigrations
   python3 manage.py migrate
   ```
5. (Optional) Create an admin user:
   ```bash
   python3 manage.py createsuperuser
   ```
6. Start the server:
   ```bash
   python3 manage.py runserver
   ```

### Frontend Setup

1. Open the frontend directory in your terminal.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
