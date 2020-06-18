import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });

  }, [repositories]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "desafio-conceitos-do-reactjs",
      url: "https://github.com/Qnedy/desafio-conceitos-do-reactjs",
      techs: ["nodejs", "javascript, axios, reactjs"]
    });

    const newRepository = response.data;

    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(response => {
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      
      setRepositories(repositories.splice(repositoryIndex, 1));
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (<li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
