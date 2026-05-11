import { useState } from "react";

function ProjectForm({ onCreate, courseId }) {
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      title,
      estimatedHours: Number(hours),
      deadline: deadline || undefined,
      status: "not started",
      courseId,
    });

    setTitle("");
    setHours("");
    setDeadline("");
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
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add Project</button>
    </form>
  );
}

export default ProjectForm;