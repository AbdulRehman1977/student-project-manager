function ProjectItem({ project, onDelete, onUpdateStatus }) {
  return (
    <li>
      <strong>{project.title}</strong>
      <p>Status: {project.status}</p>
      <p>Estimated hours: {project.estimatedHours}</p>
      <p>Course: {project.courseId?.title}</p>
      <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>

      <select
        value={project.status}
        onChange={(e) => onUpdateStatus(project._id, e.target.value)}
      >
        <option value="not started">Not started</option>
        <option value="in progress">In progress</option>
        <option value="done">Done</option>
      </select>

      <button onClick={() => onDelete(project._id)}>Delete</button>
    </li>
  );
}

export default ProjectItem;