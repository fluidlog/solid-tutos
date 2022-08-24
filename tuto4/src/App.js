import React, { useState } from 'react';
import ListTerm from './ListTerm'
import AddTerm from './AddTerm'
import ChooseGlossary from './ChooseGlossary'
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

  const listUriGlossary =  [
    { value:"glossary1",uri:"https://fluidlog.solidcommunity.net/public/glossary/terms.ttl"},
    { value:"glossary2",uri:"https://fluidlog.solidcommunity.net/public/glossary/terms2.ttl"},
    { value:"glossary3",uri:"https://fluidlog.solidcommunity.net/public/glossary/terms3.ttl"}
  ]

  const [newTerm, setNewTerm] = useState();
  const [termList, setTermList] = useState();

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

  const goSetTermList = (l) => {
		setTermList(l);
	};

  const goSetNewTerm = (t) => {
		setNewTerm(t);
	};

  const { session } = useSession();

  return (
    <div className='container'>
			<h1>Bienvenu dans le tutoriel SOLID N°4</h1>

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
							<ChooseGlossary
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
              />
						</div>
				</div>
        <div className='flex-large'>
            { // Affichage de la liste du lexique
            readyToFetchGlossary ? (
            <div>
              <AddTerm
                session={session}
                uriGlossary={uriGlossary}
                termList={termList}
                goSetTermList={goSetTermList}
              />
              <div><Palert id="message"></Palert></div>
              <ListTerm
                session={session}
                uriGlossary={uriGlossary}
                goSetReadyToFetchGlossary={goSetReadyToFetchGlossary}
                readyToFetchGlossary={readyToFetchGlossary}
                goSetReadyToDisplaySelectedTerm={goSetReadyToDisplaySelectedTerm}
                readyToDisplaySelectedTerm={readyToDisplaySelectedTerm}
                newTerm={newTerm}
                goSetNewTerm={goSetNewTerm}
                termList={termList}
                goSetTermList={goSetTermList}
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
