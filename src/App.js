import React, { useState, useEffect } from "react";
import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repositório ${repositories.length+1}`,
	    url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs',
	    techs: ["JS", "React", "C#"]
    });

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {    
    await api.delete(`/repositories/${id}`);

    const list = repositories.filter(f => f.id !== id);
    setRepository(list)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => (
          <li key={item.id}>
            {item.title}

            <button onClick={() => handleRemoveRepository(item.id)}>
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
