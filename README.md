ProjectManagerAPI/ # Backend .NET API
├── Controllers/ # API Controllers (Auth, Projects, Tasks)
├── Models/ # Data Models (User, Project, TaskItem)
├── DTOs/ # Data Transfer Objects
├── Services/ # Business Logic Layer
├── Data/ # Data Store Interface & Implementation
└── Program.cs # Application Configuration

project-manager-frontend/ # Frontend React App
├── src/
│ ├── components/ # Reusable UI Components
│ ├── pages/ # Application Pages
│ ├── api/ # API Configuration
│ ├── utils/ # Utility Functions
│ └── types/ # TypeScript Type Definitions


## 🚀 Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js 18+ and npm

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd ProjectManagerAPI

   restore dependencies and run
   dotnet run
```
API: http://localhost:5142

Swagger UI: http://localhost:5142/swagger


Open a new terminal and navigate to frontend:

bash
cd project-manager-frontend
Install dependencies and start:

bash
npm install
npm run dev
Access the application:

Frontend: http://localhost:5173

📖 API Endpoints
Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

Projects (Requires Authentication)
GET /api/projects - Get user's projects

GET /api/projects/{id} - Get project details with tasks

POST /api/projects - Create new project

DELETE /api/projects/{id} - Delete project

Core Functionality
User Management

Secure registration and login

JWT token-based authentication

Automatic token storage and management

Project Management

Create and organize projects

View project details with associated tasks

Delete projects with cascading task removal

Task Management

Add tasks to specific projects

Mark tasks as complete/incomplete

Edit task details and due dates

Delete individual tasks

Key Components
Backend Architecture
Controllers: Handle HTTP requests and responses

Services: Business logic with dependency injection

DTOs: Data transfer objects for API contracts

Models: Entity definitions with relationships

Frontend Architecture
ProtectedRoute: Authentication guard for private pages

Axios Instance: Configured API client with interceptors

Type Safety: Full TypeScript implementation

Component Reusability: Modular, reusable UI components

