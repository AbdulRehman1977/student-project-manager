function ProjectItem({ project, onDelete, onUpdateStatus }) {
  const today = new Date();
  const deadline = project.deadline ? new Date(project.deadline) : null;
  const daysLeft = deadline
    ? Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
    : null;
  const dueSoon = daysLeft !== null && daysLeft <= 7 && daysLeft >= 0 && project.status !== "done";
  const overdue = daysLeft !== null && daysLeft < 0 && project.status !== "done";

  return (
    <li className={`project-card ${dueSoon ? "due-soon" : ""} ${overdue ? "overdue" : ""}`}>
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
          <span className={overdue ? "text-overdue" : dueSoon ? "text-due-soon" : ""}>
            {overdue
              ? `Overdue by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? "s" : ""}`
              : daysLeft === 0
              ? "Due today"
              : `Due ${deadline.toLocaleDateString()}`}
          </span>
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
        <button className="delete-btn" onClick={() => { if (window.confirm(`Delete "${project.title}"?`)) onDelete(project._id); }}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default ProjectItem;
