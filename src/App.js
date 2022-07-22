import React, { useState } from 'react';
import FetchUriUser from './fetchUriUser'
import FetchUriGlossary from './fetchUriGlossary'
import UriFormUser from './uriFormUser'
import UriFormGlossary from './uriFormGlossary'
import styled from 'styled-components'

function App() {
  // CSS adaptation
  const P1 = styled.p`
    margin : 0px;
  `;

  const [uriUser, setUriUser] = useState("https://pod.inrupt.com/fluidlog/public/Carto4CH/users/");
  const [uriGlossary, setUriGlossary] = useState("https://fluidlog.solidcommunity.net/public/glossary/terms.ttl");
  const [readyToFetchUser, setReadyToFetchUser] = useState(false);
  const [readyToFetchGlossary, setReadyToFetchGlossary] = useState(false);
  const listUriUser =  [
    { value:"fluidlog",uri:"https://pod.inrupt.com/fluidlog/public/Carto4CH/users/"},
    { value:"markhoff",uri:"https://pod.inrupt.com/markhoff/public/maCarto4CH/users/"},
    { value:"marlet",uri:"https://pod.inrupt.com/marlet/public/test4CH/users/"}
  ]

  const listUriGlossary =  [
    { value:"glossary",uri:"https://fluidlog.solidcommunity.net/public/glossary/terms.ttl"}
  ]

  const saveUriUser = (uriUser) => {
		setUriUser(uriUser);
	};

  const goFetchUser = () => {
		setReadyToFetchUser(true);
	};

  const saveUriGlossary = (uriGlossary) => {
		setUriGlossary(uriGlossary);
	};

  const goFetchGlossary = () => {
		setReadyToFetchGlossary(true);
	};

  return (
    <div className='container'>
			<h1>Bienvenu dans le tutoriel SOLID</h1>
      <div className='flex-row'>
				<div className='flex-large'>
						<div>
							<h2>Documentation</h2>
              Retrouvez la documentation de ce projet dans le PAD : <a className="App-link" href="https://pad.lescommuns.org/Solid-Tutos"> PAD des Solid Tutos </a>
						</div>
						<div>
							<h2>Tuto 1 et 2 - Liste des users</h2>
              <P1>Vous avez la possibilité d'entrer une URi manuellement</P1>
							<UriFormUser defaultUriUser={uriUser} saveUriUser={saveUriUser} goFetchUser={goFetchUser} options={listUriUser}/>
						</div>
            <div>
							<h2>Tuto 3 - Glossaire</h2>
              <P1>Vous avez la possibilité d'entrer une URi manuellement</P1>
							<UriFormGlossary defaultUriGlossary={uriGlossary} saveUriGlossary={saveUriGlossary} goFetchGlossary={goFetchGlossary} options={listUriGlossary}/>
						</div>
				</div>
        <div className='flex-large'>
          { // Affichage de la liste des users
            readyToFetchUser ? (
            <div>
  						<h2>Liste des users</h2>
              <FetchUriUser uriUser={uriUser} goFetchUser={goFetchUser} />
            </div>
          ) : (
            <h2>Aucune Uri sélectionnée</h2>
          )}

          { // Affichage de la liste du lexique
            readyToFetchGlossary ? (
            <div>
  						<h2>Liste du lexique</h2>
              <FetchUriGlossary uriGlossary={uriGlossary} goFetchGlossary={goFetchGlossary} />
            </div>
          ) : (
            <h2>Aucune Uri sélectionnée</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
