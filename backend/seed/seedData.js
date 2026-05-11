import dotenv from "dotenv";
import mongoose from "mongoose";
import Course from "../models/courseModel.js";
import Project from "../models/projectModel.js";
import Task from "../models/taskModel.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Course.deleteMany();
await Project.deleteMany();
await Task.deleteMany();

const courses = await Course.insertMany([
  { title: "Fullstack Development", courseCode: "DA219B", instructorName: "Kristian Nilsson" },
  { title: "Database Systems", courseCode: "DA204A", instructorName: "Maria Andersson" },
  { title: "Software Engineering", courseCode: "DA191A", instructorName: "Erik Lund" },
  { title: "Web Security", courseCode: "DA301B", instructorName: "Sara Berg" },
  { title: "Interaction Design", courseCode: "DA156A", instructorName: "Jonas Holm" },
]);

const projects = await Project.insertMany([
  { title: "Fullstack Lab Submission", deadline: "2026-05-10", estimatedHours: 30, status: "in progress", courseId: courses[0]._id },
  { title: "ERD Database Report", deadline: "2026-05-03", estimatedHours: 12, status: "not started", courseId: courses[1]._id },
  { title: "Agile Reflection Essay", deadline: "2026-05-15", estimatedHours: 8, status: "not started", courseId: courses[2]._id },
  { title: "Security Risk Analysis", deadline: "2026-05-20", estimatedHours: 14, status: "in progress", courseId: courses[3]._id },
  { title: "Usability Test Prototype", deadline: "2026-05-25", estimatedHours: 18, status: "not started", courseId: courses[4]._id },
]);

await Task.insertMany([
  // Fullstack Lab Submission
  { title: "Create backend folder structure", completed: true, dueDate: "2026-04-27", projectId: projects[0]._id },
  { title: "Implement project CRUD API", completed: true, dueDate: "2026-04-28", projectId: projects[0]._id },
  { title: "Build React project form", completed: true, dueDate: "2026-04-29", projectId: projects[0]._id },
  { title: "Connect frontend to backend API", completed: false, dueDate: "2026-05-05", projectId: projects[0]._id },
  { title: "Write README and setup instructions", completed: false, dueDate: "2026-05-08", projectId: projects[0]._id },

  // ERD Database Report
  { title: "Draw ERD diagram", completed: false, dueDate: "2026-05-01", projectId: projects[1]._id },
  { title: "Write database relationship explanation", completed: false, dueDate: "2026-05-02", projectId: projects[1]._id },
  { title: "Document normalization decisions", completed: false, dueDate: "2026-05-03", projectId: projects[1]._id },

  // Agile Reflection Essay
  { title: "Read assigned agile literature", completed: true, dueDate: "2026-05-05", projectId: projects[2]._id },
  { title: "Write first draft of reflection", completed: false, dueDate: "2026-05-10", projectId: projects[2]._id },
  { title: "Revise and submit final essay", completed: false, dueDate: "2026-05-14", projectId: projects[2]._id },

  // Security Risk Analysis
  { title: "Identify assets and threats", completed: true, dueDate: "2026-05-10", projectId: projects[3]._id },
  { title: "Perform risk assessment matrix", completed: false, dueDate: "2026-05-14", projectId: projects[3]._id },
  { title: "Write mitigation recommendations", completed: false, dueDate: "2026-05-18", projectId: projects[3]._id },

  // Usability Test Prototype
  { title: "Create low-fidelity wireframes", completed: false, dueDate: "2026-05-15", projectId: projects[4]._id },
  { title: "Build clickable Figma prototype", completed: false, dueDate: "2026-05-19", projectId: projects[4]._id },
  { title: "Conduct usability test with 3 users", completed: false, dueDate: "2026-05-23", projectId: projects[4]._id },
]);

console.log("Seed data inserted");
process.exit();