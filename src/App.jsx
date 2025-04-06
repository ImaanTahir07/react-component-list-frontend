import "./App.css";
import { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import { DeleteFromList } from "./ProjectList";

const API_URL = 'https://project-list-assignment-backend.vercel.app/projects';

export default function App() {
  const [projects, setProjects] = useState([]);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete');
      
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const addProject = async (content) => {
    console.log("EMMMMAANNNNN");
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      
      if (!response.ok) throw new Error('Failed to add');
      
      const newProject = await response.json();
      setProjects([...projects, newProject]);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Capstone Projects List</h1>
      <ProjectList projects={projects} />
      <DeleteFromList projects={projects} deleter={deleteProject} />
      <AddProjectForm onAdd={addProject} />
    </div>
  );
}

function AddProjectForm({ onAdd }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAdd(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter project content"
        className="add-input"
      />
      <button type="submit" className="add-button">
        Add Project
      </button>
    </form>
  );
}