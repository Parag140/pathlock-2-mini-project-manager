
## Project Manager

A full-stack project and task management system built with .NET 8 (C#) and React + TypeScript.
It includes user authentication, project handling, and task scheduling — with a modular and scalable architecture.

## Project Structure
ProjectManagerAPI/                # Backend (.NET API)

                     ```
                     ├── Controllers/                  # API Controllers (Auth, Projects, Tasks)
                     ├── Models/                       # Data Models (User, Project, TaskItem)
                     ├── DTOs/                         # Data Transfer Objects
                     ├── Services/                     # Business Logic Layer
                     ├── Data/                         # Data Store Interface & Implementation
                     └── Program.cs                    # Application Configuration
         
                     project-manager-frontend/         # Frontend (React App)
                     ```
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

5. API Base URL → http://localhost:5298

6. Swagger UI → http://localhost:5298/swagger


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




## UI SCREENSHOTS

1. Register page
    <p align="center">
  <img width="1042" height="1234" alt="image" src="https://github.com/user-attachments/assets/349e23c4-f1a6-429c-aad2-1ba14931c870" />
</p>
2. Login page
<p align="center">
  <img width="902" height="1150" alt="image" src="https://github.com/user-attachments/assets/5a6b1b18-b3a8-438a-a66c-3f6f6a3d19d4" />
</p>

3. Recieved token after login
<p align="center">
<img width="2880" height="1594" alt="image" src="https://github.com/user-attachments/assets/026b5e3c-33cb-4e1b-a086-3dc6e50cea14" />
</p>
4. Project Dashboard
<p align="center">
<img width="1982" height="1522" alt="image" src="https://github.com/user-attachments/assets/bf8a4629-07df-4a9d-8bbd-def4a1e6aa9b" />
</p>
5. Dashboard after adding projects
<p align="center">
<img width="2226" height="1636" alt="image" src="https://github.com/user-attachments/assets/cc07d096-f93c-4477-94bb-e2f8b153694e" />
</p>

6. adding tasks to paricular projects
<p align="center">
<img width="1146" height="1468" alt="image" src="https://github.com/user-attachments/assets/3a623851-2bb3-4f2f-b3c5-e00ffa1c378b" />
</p>
7. progress
<p align="center">
<img width="1884" height="1158" alt="image" src="https://github.com/user-attachments/assets/a38611de-db6e-4d51-9f9e-6c35a7494758" />

</p>

