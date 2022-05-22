import React, { useState } from 'react';
import FetchUri from './fetchUri'
import UriForm from './uriForm'

function App() {
  const [uri, setUri] = useState("https://pod.inrupt.com/fluidlog/public/Carto4CH/users/");
  const [readyToFetch, setReadyToFetch] = useState(false);

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
							<UriForm defaultUri={uri} saveUri={saveUri} goFetch={goFetch} />
						</div>
				</div>
        <div className='flex-large'>
          { readyToFetch ? (
            <div>
  						<h2>Contenu LDP</h2>
              <FetchUri uri={uri} />
            </div>
          ) : (
            <h2>Aucune ressource</h2>
          )}
          </div>
        </div>
    </div>
  );
}

export default App;
