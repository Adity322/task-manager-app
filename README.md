# Task Manager Application

A full-stack **Task Management Application** built as part of the Full Stack Developer Technical Assessment.  
The application allows users to securely manage their tasks with authentication and full CRUD functionality.

---

## 🚀 Live Deployment

Frontend Application  
https://task-manager-app-six-zeta.vercel.app

Backend API  
https://task-manager-app-7w3x.onrender.com

---

## 📂 GitHub Repository

Repository Link  
https://github.com/Adity322/task-manager-app

---

## ✨ Features

### Authentication & Security
- User Registration
- User Login
- JWT-based authentication
- Password hashing using bcrypt
- Secure HTTP-only cookies
- Protected routes
- Users can access only their own tasks

### Task Management
- Create tasks
- View tasks
- Update tasks
- Delete tasks

Each task includes:
- Title
- Description
- Status
- Created Date

### Advanced Features
- Pagination in task listing
- Filter tasks by status
- Search tasks by title
- Proper validation
- Structured error handling

---

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Deployment
- Frontend deployed on Vercel
- Backend deployed on Render

---

## 📁 Project Structure

task-manager/

backend/
- controllers
- models
- routes
- middleware
- config
- server.js

frontend/
- app
- components
- services

README.md

---

## 🔗 API Endpoints

### Authentication

Register User

POST /api/auth/register

Login User

POST /api/auth/login

Logout

POST /api/auth/logout

---

### Tasks

Get All Tasks

GET /api/tasks

Create Task

POST /api/tasks

Update Task

PUT /api/tasks/:id

Delete Task

DELETE /api/tasks/:id

---

## 📌 Sample API Request

Create Task

POST /api/tasks

Request Body

{
  "title": "Complete assignment",
  "description": "Finish full stack task manager project",
  "status": "pending"
}

---

## ⚙️ Setup Instructions

### 1 Clone Repository

git clone https://github.com/Adity322/task-manager-app.git

---

### 2 Backend Setup

cd backend  
npm install  
npm run dev

Create `.env` file:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key

---

### 3 Frontend Setup

cd frontend  
npm install  
npm run dev

---

## 🔒 Security Implementations

- JWT authentication
- Password hashing
- HTTP-only cookies
- Environment variables
- Input validation
- Proper error handling

---

## 👨‍💻 Author

Aditya Singh  
B.Tech Student
