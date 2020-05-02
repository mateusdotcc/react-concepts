import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api("repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    api
      .post("repositories", {
        title: `New Repo ${Date.now()}`,
        url: "url",
        techs: ["new item", "new item", "new item"],
      })
      .then((response) => {
        const newRepository = response.data;
        setRepositories((repositories) => [...repositories, newRepository]);
      });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      const arrRepositories = repositories.filter((repo) => repo.id !== id);
      setRepositories(arrRepositories);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
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
