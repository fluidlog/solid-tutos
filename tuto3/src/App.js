import React, { useState } from 'react';
import FetchUriGlossary from './fetchUriGlossary'
import UriFormGlossary from './uriFormGlossary'
import styled from 'styled-components'
import {
  LoginButton,
  LogoutButton,
  Text,
  useSession,
  CombinedDataProvider,
} from "@inrupt/solid-ui-react";

const authOptions = {
    clientName: "Solid Todo App",
  };

function App() {
  // CSS adaptation
  const P1 = styled.p`
    margin : 0px;
  `;

  const Palert = styled.p`
    font-weight: bold;
    font-size: 2em;
    color: palevioletred;
  `;

  const [uriGlossary, setUriGlossary] = useState("https://fluidlog.solidcommunity.net/public/glossary/terms.ttl");
  const [readyToFetchGlossary, setReadyToFetchGlossary] = useState(false);
  const [readyToDisplayEditForm, setReadyToDisplayEditForm] = useState(false);
  const [readyToDisplaySelectedTerm, setReadyToDisplaySelectedTerm] = useState(false);
  const [signification, setSignification] = useState();
  const [uriSelectedTerm, setUriSelectedTerm] = useState();

  const listUriGlossary =  [
    { value:"glossary1",uri:"https://fluidlog.solidcommunity.net/public/glossary/terms.ttl"},
    { value:"glossary2",uri:"https://fluidlog.solidcommunity.net/public/glossary/terms2.ttl"},
    { value:"glossary3",uri:"https://fluidlog.solidcommunity.net/public/glossary/terms3.ttl"}
  ]

  const saveUriGlossary = (uriGlossary) => {
		setUriGlossary(uriGlossary);
	};

  const goSetReadyToFetchGlossary = () => {
		setReadyToFetchGlossary(true);
	};

  const goSetReadyToDisplayEditForm = () => {
		setReadyToDisplayEditForm(true);
	};

  const goSetReadyToDisplaySelectedTerm = () => {
		setReadyToDisplaySelectedTerm(true);
	};

  const goSetSignification = (s) => {
		setSignification(s);
	};

  const goSetUriSelectedTerm = (uri) => {
		setUriSelectedTerm(uri);
	};

  const { session } = useSession();

  return (
    <div className='container'>
			<h1>Bienvenu dans le tutoriel SOLID N°3</h1>

      <div className="app-container">
        {session.info.isLoggedIn ? (
          <CombinedDataProvider
            datasetUrl={session.info.webId}
            thingUrl={session.info.webId}
          >
          <div className="message logged-in">
        	  <span>You are logged in as: </span>
        	  <Text properties={[
        	     "http://xmlns.com/foaf/0.1/name",
        	     "http://www.w3.org/2006/vcard/ns#fn",
        	   ]} />
        	   <LogoutButton />
        	 </div>
          </CombinedDataProvider>
        ) : (
          <div className="message">
            <span>You are not logged in. </span>
            <LoginButton
              oidcIssuer="https://fluidlog.solidcommunity.net/"
              redirectUrl={window.location.href}
  						authOptions={authOptions}
            />
          </div>
        )}
      </div>

      <div className='flex-row'>
				<div className='flex-large'>
						<div>
							<h2>Documentation</h2>
              Retrouvez la documentation de ce projet dans le PAD : <a className="App-link" href="https://pad.lescommuns.org/Solid-Tutos"> PAD des Solid Tutos </a>
						</div>
            <div>
							<h2>Choix du lexique</h2>
              <P1>Vous avez la possibilité d'entrer une URi manuellement</P1>
							<UriFormGlossary
                session={session}
                uriGlossary={uriGlossary}
                saveUriGlossary={saveUriGlossary}
                goSetReadyToFetchGlossary={goSetReadyToFetchGlossary}
                readyToFetchGlossary={readyToFetchGlossary}
                options={listUriGlossary}
                goSetReadyToDisplayEditForm={goSetReadyToDisplayEditForm}
                readyToDisplayEditForm={readyToDisplayEditForm}
                goSetReadyToDisplaySelectedTerm={goSetReadyToDisplaySelectedTerm}
                readyToDisplaySelectedTerm={readyToDisplaySelectedTerm}
                goSetUriSelectedTerm={goSetUriSelectedTerm}
                uriSelectedTerm={uriSelectedTerm}
                goSetSignification={goSetSignification}
                signification={signification}
              />
						</div>
				</div>
        <div className='flex-large'>
            { // Affichage de la liste du lexique
            readyToFetchGlossary ? (
            <div>
  						<h2>Liste des termes</h2>
              <div><Palert id="message"></Palert></div>
              <FetchUriGlossary
                session={session}
                uriGlossary={uriGlossary}
                goSetReadyToFetchGlossary={goSetReadyToFetchGlossary}
                readyToFetchGlossary={readyToFetchGlossary}
                goSetReadyToDisplaySelectedTerm={goSetReadyToDisplaySelectedTerm}
                readyToDisplaySelectedTerm={readyToDisplaySelectedTerm}
                goSetSignification={goSetSignification}
                signification={signification}
                goSetUriSelectedTerm={goSetUriSelectedTerm}
                uriSelectedTerm={uriSelectedTerm}
              />
            </div>
          ) : (
            <div></div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
