import { useEffect, useState } from "react";
import ProjectList from "./components/ProjectList";
import ProjectForm from "./components/ProjectForm";

function App() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = () => {
  setLoading(true);
  fetch("http://localhost:5000/api/projects")
    .then((res) => res.json())
    .then((data) => {
      setProjects(data);
      setLoading(false);
      setError(null);
    })
    .catch(() => {
      setError("Failed to load projects");
      setLoading(false);
    });
};

  useEffect(() => {
  fetchProjects();

  const interval = setInterval(fetchProjects, 30000);

  return () => {
    clearInterval(interval);
  };
}, []);

  const handleCreate = (newProject) => {
    fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then(() => fetchProjects())
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchProjects())
      .catch((err) => console.error(err));
  };

  const handleUpdateStatus = (id, status) => {
  fetch(`http://localhost:5000/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
    .then(() => fetchProjects())
    .catch(() => setError("Failed to update project"));
};

  return (
    <div>
      <h1>Projects</h1>

      <input
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ProjectForm
        onCreate={handleCreate}
        courseId={projects[0]?.courseId?._id}
      />

      <ProjectList
        projects={projects.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
        )}
        onDelete={handleDelete}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}

export default App;