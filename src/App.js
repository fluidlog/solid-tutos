import React, { useState } from 'react';
import FetchUri from './fetchUri'
import UriForm from './uriForm'
import styled from 'styled-components'

function App() {
  // CSS adaptation
  const P1 = styled.p`
    margin : 0px;
  `;

  const [uri, setUri] = useState("https://pod.inrupt.com/fluidlog/public/Carto4CH/users/");
  const [readyToFetch, setReadyToFetch] = useState(false);

  const listUri =  [
    { value:"fluidlog",uri:"https://pod.inrupt.com/fluidlog/public/Carto4CH/users/"},
    { value:"markhoff",uri:"https://pod.inrupt.com/markhoff/public/maCarto4CH/users/"},
    { value:"marlet",uri:"https://pod.inrupt.com/marlet/public/test4CH/users/"}
  ]

  const saveUri = (uri) => {
		setUri(uri);
	};

  const goFetch = () => {
		setReadyToFetch(true);
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
							<h2>URi du container</h2>
              <P1>Vous avez la possibilité d'entrer une URi manuellement</P1>
							<UriForm defaultUri={uri} saveUri={saveUri} goFetch={goFetch} options={listUri}/>
						</div>
				</div>
        <div className='flex-large'>
          { readyToFetch ? (
            <div>
  						<h2>Contenu LDP</h2>
              <FetchUri uri={uri} goFetch={goFetch} />
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
