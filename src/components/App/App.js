import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Button,
  Container, Dimmer, Loader, Menu, Segment,
} from 'semantic-ui-react';

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
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getRepositories = () => {
    // Avant 'appel à l'API, j'indique que je suis en train de charger les données
    // En passant le loading state à true
    setLoading(true);

    axios.get(`https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc&page=${currentPage}&per_page=30`)
      .then((res) => {
        setTotalCount(res.data.total_count);
        // Attention, les repositories étaient dans une clé de l'objet de la réponse
        // il fallait aller chercher "items"
        setRepositories(res.data.items);
      })
      .catch((error) => {
        setRepositoriesError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Au premier rendu de mon composant (car j'ai passé [] en 2ème paramètre du useEffect)
  // j'appelle la méthode getRepositories qui va récupérer les données depuis l'API
  // et les stocker dans mon state.
  useEffect(getRepositories, [currentPage]);

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
            loading
              ? (
                <Segment>
                  <Dimmer active inverted>
                    <Loader size="large">Loading</Loader>
                  </Dimmer>
                </Segment>
              )
              : (
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
                  <Segment>
                    <Button onClick={() => {
                      setCurrentPage(currentPage - 1);
                    }}
                    >
                      précédent
                    </Button>
                    <Button onClick={() => {
                      setCurrentPage(currentPage + 1);
                    }}
                    >
                      Suivant
                    </Button>
                  </Segment>
                </>
              )
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

        <Route path="*" element={<Segment><h1>Ce chemin n'existe pas, Retournez sur "Recherche" et essayez une nouvelle recherche</h1></Segment>} />
      </Routes>
    </Container>
  );
}

export default App;
