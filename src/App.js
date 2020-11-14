import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then( response => {
      console.log(response.data);
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    
    const response =  await api.post('repositories', {
      title: `repository ${Date.now()}` ,
      url: "www.lalala.com",
      techs: "node, react"
    })

    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    // TODO

    const response = await api.delete(`repositories/${id}`);

    const indexId = repositories.findIndex(repo => repo.id === id);

    repositories.splice(indexId, 1);

    setRepositories([...repositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        
           {repositories.map(repo => <li key={repo.id}>{repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
           </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
