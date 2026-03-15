# task-manager-app
A full-stack Task Management Application built as part of the Full Stack Developer Technical Assessment.
The application allows users to securely manage their personal tasks with authentication, authorization, and full CRUD functionality.
Live Demo
Live Application:
For frontend:https://task-manager-app-six-zeta.vercel.app
For backend:https://task-manager-app-six-zeta.vercel.app
GitHub Repository
Repository Link:https://github.com/Adity322/task-manager-app
Features
Authentication & Security
User Registration
User Login
JWT based authentication
Password hashing using bcrypt
Secure HTTP-Only cookies
Protected routes
User specific data access
Task Management
Create new tasks
View all tasks
Update tasks
Delete tasks
Each task contains:
Title
Description
Status
Created Date
Advanced Features
Pagination in task listing
Filter tasks by status
Search tasks by title
Input validation
Proper error handling
Secure environment variables


Tech Stack
Frontend
Next.js
React
CSS
Backend
Node.js
Express.js
Database
MongoDB
Deployment
Backend: Render
Frontend: Vercel

Project Structure
task-manager/
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.js
│
├── frontend
│   ├── app
│   ├── components
│   ├── pages
│   └── services
│
└── README.md


API Endpoints
Authentication
Register User:POST /api/auth/register
Login User:POST /api/auth/login
Logout:POST /api/auth/logout


Tasks
Get All Tasks:GET /api/tasks
Create task:POST /api/tasks
Update task:PUT /api/tasks/:id
Delete task:DELETE /api/tasks/:id

Sample Request
Create Task:POST /api/tasks
Request body:{
  "title": "Complete assignment",
  "description": "Finish the full stack task manager project",
  "status": "pending"
}

Setup Instructions
1 Clone Repository:git clone https://github.com/Aditya322/task-manager.git
2 Backend Setup:cd backend
                npm install
                npm run dev

3 Frontend Setup:cd frontend
                  npm install
                  npm run dev
Security Implementations
JWT authentication
Password hashing
HTTP-only cookies
Environment variable protection
Input validation
Proper error handling

Future Improvements
Task priority levels
Notifications
Drag & drop task board
Role based authentication
Email verification


Author
Aditya Singh
B.Tech Student
