import { useEffect, useState } from "react";

function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    fetch(`http://localhost:5000/api/projects/${projectId}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const toggleTask = (taskId, currentStatus) => {
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !currentStatus }),
    })
      .then(() => fetchTasks())
      .catch((err) => console.error(err));
  };

  if (loading) return <p className="task-loading">Loading tasks...</p>;
  if (tasks.length === 0) return <p className="task-empty">No tasks for this project.</p>;

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="task-list">
      <p className="task-progress">{completedCount} of {tasks.length} tasks completed</p>
      <ul className="task-items">
        {tasks.map((task) => (
          <li key={task._id} className={`task-item ${task.completed ? "task-done" : ""}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task._id, task.completed)}
            />
            <span className="task-title">{task.title}</span>
            {task.dueDate && (
              <span className="task-due">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
