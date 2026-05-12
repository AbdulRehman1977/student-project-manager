# Student Project Manager

**Problem:** Students struggle to keep track of multiple course projects, deadlines, and tasks all at once.

This app lets students create and manage their academic projects, set deadlines, estimate hours, track status, and break each project down into individual tasks — all in one place.

## Tech Stack

- React (Vite) — frontend
- Express.js — backend API
- MongoDB Atlas — cloud database
- Mongoose — ODM / schema validation
- concurrently — runs frontend and backend with one command

## Setup (under 5 minutes)

### Prerequisites
- Node.js installed
- A MongoDB Atlas account with a cluster

### 1. Clone the repo
```bash
git clone https://github.com/AbdulRehman1977/student-project-manager.git
cd student-project-manager
```

### 2. Configure environment variables
Create a `.env` file inside the `backend/` folder:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### 3. Install dependencies
```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 4. Seed the database (optional but recommended)
```bash
cd backend
node seed/seedData.js
cd ..
```

### 5. Start the app
```bash
npm run dev
```
This starts both frontend (http://localhost:5173) and backend (http://localhost:5000) with one command.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects (with course populated) |
| POST | `/api/projects` | Create a new project |
| PUT | `/api/projects/:id` | Update a project (title, status, hours, deadline) |
| DELETE | `/api/projects/:id` | Delete a project and its tasks |
| GET | `/api/projects/:id/tasks` | Get all tasks for a project |
| GET | `/api/projects/stats/summary` | Get project count by status |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Toggle task completion |
| GET | `/api/courses` | Get all courses |

## Features

- Create, update, and delete projects
- Set deadline and estimated hours per project
- Change project status (not started / in progress / done)
- Search projects by title
- Add and complete tasks per project
- Auto-refreshes data every 30 seconds
- Loading and error states throughout the UI

## Database Collections

- **courses** — university courses (title, courseCode, instructorName)
- **projects** — student projects linked to a course (title, deadline, estimatedHours, status, courseId)
- **tasks** — individual tasks linked to a project (title, completed, projectId)