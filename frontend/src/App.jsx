import { useEffect, useState } from "react";
import "./App.css";
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
        const sorted = [...data].sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
        setProjects(sorted);
        setLoading(false);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load projects. Is the backend running?");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
    const interval = setInterval(fetchProjects, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCreate = (newProject) => {
    fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        fetchProjects();
      })
      .catch(() => setError("Failed to create project"));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/projects/${id}`, { method: "DELETE" })
      .then(fetchProjects)
      .catch(() => setError("Failed to delete project"));
  };

  const handleUpdateStatus = (id, status) => {
    fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then(fetchProjects)
      .catch(() => setError("Failed to update project"));
  };

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Project Tracker</h1>

      {error && <div className="error-banner">{error}</div>}

      <div className="top-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ProjectForm
        onCreate={handleCreate}
        courseId={projects[0]?.courseId?._id}
      />

      {loading ? (
        <p className="loading">Loading projects...</p>
      ) : filtered.length === 0 ? (
        <p className="empty">No projects found. Add one above.</p>
      ) : (
        <ProjectList
          projects={filtered}
          onDelete={handleDelete}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}

export default App;
