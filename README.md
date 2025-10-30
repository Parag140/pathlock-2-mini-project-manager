Project Manager

A full-stack project and task management system built with .NET 8 (C#) and React + TypeScript.
It includes user authentication, project handling, and task scheduling — with a modular and scalable architecture.

🏗️ Project Structure
ProjectManagerAPI/                # Backend (.NET API)
├── Controllers/                  # API Controllers (Auth, Projects, Tasks)
├── Models/                       # Data Models (User, Project, TaskItem)
├── DTOs/                         # Data Transfer Objects
├── Services/                     # Business Logic Layer
├── Data/                         # Data Store Interface & Implementation
└── Program.cs                    # Application Configuration

project-manager-frontend/         # Frontend (React App)
├── src/
│   ├── components/               # Reusable UI Components
│   ├── pages/                    # Application Pages
│   ├── api/                      # API Configuration
│   ├── utils/                    # Utility Functions
│   └── types/                    # TypeScript Type Definitions

🚀 Quick Start
✅ Prerequisites

Make sure you have installed:

.NET 8 SDK

Node.js 18+
 and npm

⚙️ Backend Setup

Navigate to backend directory

cd ProjectManagerAPI


Restore dependencies and run the server

dotnet restore
dotnet run


Access API and Documentation

API Base URL → http://localhost:5142

Swagger UI → http://localhost:5142/swagger

💻 Frontend Setup

Open a new terminal and navigate to frontend

cd project-manager-frontend


Install dependencies and start development server

npm install
npm run dev


Access the application

Frontend → http://localhost:5173

📖 API Endpoints
🔐 Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Authenticate user and return JWT token
📁 Projects (Requires Authentication)
Method	Endpoint	Description
GET	/api/projects	Get all projects of a user
GET	/api/projects/{id}	Get details of a specific project with tasks
POST	/api/projects	Create a new project
DELETE	/api/projects/{id}	Delete a project (with cascading task removal)
✅ Tasks
Method	Endpoint	Description
POST	/api/projects/{projectId}/tasks	Add a new task to a project
PATCH	/api/tasks/{id}	Edit or update a task
DELETE	/api/tasks/{id}	Delete a task
PATCH	/api/tasks/{id}/complete	Mark a task as complete/incomplete
🧠 Core Functionality
🧍 User Management

Secure registration and login

JWT-based authentication

Automatic token storage and management

📊 Project Management

Create and organize projects

View project details with associated tasks

Delete projects (removes all related tasks)

📋 Task Management

Add, edit, and delete tasks per project

Mark tasks as complete or pending

Set due dates for better tracking

🧩 Key Components
🖥️ Backend Architecture

Controllers → Handle HTTP requests/responses

Services → Contain business logic (via dependency injection)

DTOs → Define API request/response contracts

Models → Represent entities with relationships

💡 Frontend Architecture

ProtectedRoute → Ensures only authenticated users can access private routes

Axios Instance → Preconfigured API client with interceptors

Type Safety → Complete TypeScript implementation for reliability

Component Reusability → Modular UI design using React components

Component Reusability: Modular, reusable UI components

