# Student Project Manager

## Overview
A web application that helps students manage courses, projects, and tasks with deadlines and progress tracking.

## Problem
Students struggle to organize multiple course projects and deadlines.

## Tech Stack
- React (Vite)
- Express.js
- MongoDB Atlas

## Setup
1. Clone repo
2. cd backend → npm install → npm run dev
3. cd frontend → npm install → npm run dev


## API Endpoints

GET /api/projects  
→ Returns all projects

POST /api/projects  
→ Creates a new project

PUT /api/projects/:id  
→ Updates a project

DELETE /api/projects/:id  
→ Deletes a project

GET /api/projects/:id/tasks  
→ Returns tasks for a project

GET /api/projects/stats/summary  
→ Returns project statistics

## Features
- Create, update, delete projects
- Search projects
- View tasks per project
- Project statistics endpoint