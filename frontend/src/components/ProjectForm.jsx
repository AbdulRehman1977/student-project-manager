import { useState } from "react";

function ProjectForm({ onCreate, courseId }) {
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      title,
      estimatedHours: Number(hours),
      status: "not started",
      courseId,
    });

    setTitle("");
    setHours("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Estimated hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <button type="submit">Add Project</button>
    </form>
  );
}

export default ProjectForm;