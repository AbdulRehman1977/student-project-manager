import ProjectItem from "./ProjectItem";

function ProjectList({ projects, onDelete }) {
  return (
    <ul>
      {projects.map((project) => (
        <ProjectItem
          key={project._id}
          project={project}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ProjectList;