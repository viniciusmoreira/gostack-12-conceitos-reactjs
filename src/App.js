import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: "teste"
    })

    setRepositories([
      ...repositories,
      response.data
    ])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    if(response.status === 204){
      const updatedRepo = [...repositories];
      const repositoryIndex = updatedRepo.findIndex(repository => repository.id === id);

      if(repositoryIndex >= 0){
        updatedRepo.splice(repositoryIndex, 1);

        setRepositories(updatedRepo);
      }
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
