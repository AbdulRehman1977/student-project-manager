import { useState } from "react";
import TaskList from "./TaskList";

function ProjectItem({ project, onDelete, onUpdateStatus }) {
  const [showTasks, setShowTasks] = useState(false);

  const deadline = project.deadline ? new Date(project.deadline) : null;

  return (
    <li className="project-card">
      <div className="project-header">
        <strong className="project-title">{project.title}</strong>
        <span className={`status-badge status-${project.status.replace(" ", "-")}`}>
          {project.status}
        </span>
      </div>

      <div className="project-meta">
        {project.courseId && <span>Course: {project.courseId.title}</span>}
        {project.estimatedHours > 0 && <span>{project.estimatedHours}h estimated</span>}
        {deadline && (
          <span>Due {deadline.toLocaleDateString()}</span>
        )}
      </div>

      <div className="project-actions">
        <select
          value={project.status}
          onChange={(e) => onUpdateStatus(project._id, e.target.value)}
        >
          <option value="not started">Not started</option>
          <option value="in progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <button
          className="tasks-btn"
          onClick={() => setShowTasks((prev) => !prev)}
        >
          {showTasks ? "Hide tasks" : "Show tasks"}
        </button>
        <button className="delete-btn" onClick={() => { if (window.confirm(`Delete "${project.title}"?`)) onDelete(project._id); }}>
          Delete
        </button>
      </div>

      {showTasks && <TaskList projectId={project._id} />}
    </li>
  );
}

export default ProjectItem;
