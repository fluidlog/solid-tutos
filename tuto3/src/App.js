import React, { useState } from 'react';
import FetchUriUser from './fetchUriUser'
import FetchUriGlossary from './fetchUriGlossary'
import UriFormUser from './uriFormUser'
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

  const [uriUser, setUriUser] = useState("https://pod.inrupt.com/fluidlog/public/Carto4CH/users/");
  const [uriGlossary, setUriGlossary] = useState("https://fluidlog.solidcommunity.net/public/glossary/terms.ttl");
  const [readyToFetchUser, setReadyToFetchUser] = useState(false);
  const [readyToFetchGlossary, setReadyToFetchGlossary] = useState(false);
  const [readyToDisplayEditForm, setReadyToDisplayEditForm] = useState(false);
  const [readyToDisplaySelectedTerm, setReadyToDisplaySelectedTerm] = useState(false);
  const [signification, setSignification] = useState();
  const [uriSelectedTerm, setUriSelectedTerm] = useState();

  const listUriUser =  [
    { value:"fluidlog",uri:"https://pod.inrupt.com/fluidlog/public/Carto4CH/users/"},
    { value:"markhoff",uri:"https://pod.inrupt.com/markhoff/public/maCarto4CH/users/"},
    { value:"marlet",uri:"https://pod.inrupt.com/marlet/public/test4CH/users/"}
  ]

  const listUriGlossary =  [
    { value:"glossary1",uri:"https://fluidlog.solidcommunity.net/public/glossary/terms.ttl"},
    { value:"glossary2",uri:"https://fluidlog.solidcommunity.net/public/glossary/terms2.ttl"},
    { value:"glossary3",uri:"https://fluidlog.solidcommunity.net/public/glossary/terms3.ttl"}
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
			<h1>Bienvenu dans le tutoriel SOLID</h1>

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
							<h2>Tuto 1 et 2 - Liste des users</h2>
              <P1>Vous avez la possibilité d'entrer une URi manuellement</P1>
							<UriFormUser defaultUriUser={uriUser} saveUriUser={saveUriUser} goFetchUser={goFetchUser} options={listUriUser}/>
						</div>
            <div>
							<h2>Tuto 3 - Glossaire</h2>
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
            <h2>Aucune Uri sélectionnée</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
