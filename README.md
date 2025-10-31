## Project Manager

A full-stack project and task management system built with .NET 8 (C#) and React + TypeScript.
It includes user authentication, project handling, and task scheduling — with a modular and scalable architecture.

## Project Structure
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

## Quick Start 
## Prerequisites

Make sure you have installed:

1. .NET 8 SDK

2. Node.js 18+
   and npm

## Backend Setup

1. Navigate to backend directory
   cd ProjectManagerAPI

2. Restore dependencies and run the server
   dotnet restore
   ```bash
   dotnet run

4. Access API and Documentation

5. API Base URL → http://localhost:5142

6. Swagger UI → http://localhost:5142/swagger


## Frontend Setup

1. Open a new terminal and navigate to frontend
    cd project-manager-frontend

2. Install dependencies and start development server
     ```bash
         npm install
         npm run dev

 Access the application
   Frontend → http://localhost:5173

## API Endpoints
1. POST	/api/auth/register	Register a new user
2. POST	/api/auth/login	Authenticate user and return JWT token
3. GET	/api/projects	Get all projects of a user
4. GET	/api/projects/{id}	Get details of a specific project with tasks
5. POST	/api/projects	Create a new project
6. DELETE	/api/projects/{id}	Delete a project (with cascading task removal)
7. POST	/api/projects/{projectId}/tasks	Add a new task to a project
8. PATCH	/api/tasks/{id}	Edit or update a task
9. DELETE	/api/tasks/{id}	Delete a task
10. PATCH	/api/tasks/{id}/complete	Mark a task as complete/incomplete
    
## Core Functionality
1. User Management
2. Secure registration and login
3. JWT-based authentication
4. Automatic token storage and management

## Project Management

1. Create and organize projects

2. View project details with associated tasks

3. Delete projects (removes all related tasks)

##Task Management

1. Add, edit, and delete tasks per project

2. Mark tasks as complete or pending

3. Set due dates for better tracking

## Key Components
## Backend Architecture

1. Controllers → Handle HTTP requests/responses

2. Services → Contain business logic (via dependency injection)

3. DTOs → Define API request/response contracts

4. Models → Represent entities with relationships

## Frontend Architecture

1. ProtectedRoute → Ensures only authenticated users can access private routes

2. Axios Instance → Preconfigured API client with interceptors

3. Type Safety → Complete TypeScript implementation for reliability

4. Component Reusability → Modular UI design using React components

5. Component Reusability: Modular, reusable UI components

