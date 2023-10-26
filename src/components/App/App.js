import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Menu, Segment } from 'semantic-ui-react';

import './App.scss';
import logoGithub from 'src/assets/images/logo-github.png';

import { NavLink, Route, Routes } from 'react-router-dom';
import Message from '../Message/Message';
import SearchBar from '../SearchBar/SearchBar';
import Repositories from '../Repositories/Repositories';

function App() {
  const [totalCount, setTotalCount] = useState(0);
  const [repositories, setRepositories] = useState([]);
  const [search, setSearch] = useState('react');
  const [repositoriesError, setRepositoriesError] = useState(false);

  const getRepositories = () => {
    axios.get(`https://api.github.com/search/repositories?q=${search}`)
      .then((res) => {
        setTotalCount(res.data.total_count);
        // Attention, les repositories étaient dans une clé de l'objet de la réponse
        // il fallait aller chercher "items"
        setRepositories(res.data.items);
      })
      .catch((error) => {
        setRepositoriesError(error);
      });
  };

  // Au premier rendu de mon composant (car j'ai passé [] en 2ème paramètre du useEffect)
  // j'appelle la méthode getRepositories qui va récupérer les données depuis l'API
  // et les stocker dans mon state
  useEffect(getRepositories, []);

  return (
    <Container>
      <div className="header-container">
        <img className="header-image" src={logoGithub} alt="Logo Github" />
      </div>

      <Menu>
        <Menu.Item>
          <NavLink to="/">Recherche</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/faq">FAQ</NavLink>
        </Menu.Item>
      </Menu>

      <Routes>
        <Route
          path="/"
          element={(
            <>
              <SearchBar
                search={search}
                setSearch={setSearch}
                getRepositories={getRepositories}
              />
              <Message totalCount={totalCount} />
              {
              repositoriesError
                ? <p>{repositoriesError.message}</p>
                : <Repositories repositories={repositories} />
              }
            </>
        )}
        />

        <Route
          path="/faq"
          element={(
            <Segment>
              <ul>
                <li>
                  <strong>A quoi ça sert ?</strong>
                  <p>
                    Cette application permet de trouver une liste de dépôts GitHub
                    pour un critère donné.
                  </p>
                </li>
                <br />
                <li>
                  <strong>Comment faire une recherche ?</strong>
                  <p>
                    Sur la page recherche, complétez le champ de recherche et
                    valider la recherche.
                  </p>
                </li>
                <br />
                <li>
                  <strong>Puis-je chercher n'importe quel terme ?</strong>
                  <p>
                    Oui, c'est fou.
                  </p>
                </li>
              </ul>
            </Segment>
        )}
        />

        <Route path="*" element={<Segment><h1>404</h1></Segment>} />
      </Routes>
    </Container>
  );
}

export default App;