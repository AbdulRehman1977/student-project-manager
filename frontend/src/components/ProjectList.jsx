import ProjectItem from "./ProjectItem";

function ProjectList({ projects, onDelete, onUpdateStatus }) {
  return (
    <ul>
      {projects.map((project) => (
        <ProjectItem
          key={project._id}
          project={project}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </ul>
  );
}

export default ProjectList;