
export default function ProjectList({ projects }) {
  const pList = projects.length ? (
    projects.map((p) => (
      <div key={p.id} className="project-card">
        {p.content}
      </div>
    ))
  ) : (
    <p className="empty">No Projects left</p>
  );
  return <div className="project-list">{pList}</div>;
}

export function DeleteFromList({ projects, deleter }) {
  if (!projects.length) return <p className="empty">No Projects left</p>;

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div key={project.id} className="delete-card">
          <span onClick={() => deleter(project.id)} className="delete-button">
            {project.content} ❌
          </span>
        </div>
      ))}
    </div>
  );
}