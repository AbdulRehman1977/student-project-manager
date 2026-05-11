function StatsBar({ stats }) {
  if (!stats) return null;

  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-number">{stats.totalProjects}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat">
        <span className="stat-number in-progress">{stats.inProgressProjects}</span>
        <span className="stat-label">In Progress</span>
      </div>
      <div className="stat">
        <span className="stat-number done">{stats.completedProjects}</span>
        <span className="stat-label">Done</span>
      </div>
      <div className="stat">
        <span className="stat-number not-started">{stats.notStartedProjects}</span>
        <span className="stat-label">Not Started</span>
      </div>
    </div>
  );
}

export default StatsBar;
