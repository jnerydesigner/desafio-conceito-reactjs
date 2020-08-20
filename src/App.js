import React, { useEffect, useState } from "react";
import api from '../src/services/api';
import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);



  async function handleAddRepository() {
    const repository = {
      title: `Novo Projeto Adicionado ${Date.now()}`,
      url: 'https://github.com/Rocketseat/umbriel',
      techs: ["Node", "Express", "React Native"]
    }

    const { data } = await api.post('repositories', repository);

    setRepositories([...repositories, data ]);    
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`, {});
    const repository = repositories.filter(repo => repo.id !== id);

    setRepositories(repository);
  }

  return (
    <div>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>


    </div>
  );
}

export default App;
