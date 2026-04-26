function ProjectItem({ project, onDelete }) {
  return (
    <li>
      <strong>{project.title}</strong> — {project.status} —{" "}
      {project.estimatedHours} hours
      <button onClick={() => onDelete(project._id)}>Delete</button>
    </li>
  );
}

export default ProjectItem;