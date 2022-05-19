import FetchUri from './fetchUri'
import UriForm from './uriForm'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Bienvenu dans le tutoriel SOLID
        </p>
      </header>
      <div className="App-form">
        <p>
          Retrouvez la documentation de ce projet dans le PAD : <a className="App-link" href="https://pad.lescommuns.org/Solid-Tutos"> PAD des Solid Tutos </a>
        </p>
      </div>
      <div className="App-form">
        <p>
          <span>
            Merci d'entrer l'URI que vous souhaitez interroger ici :
          </span>
          <span>
            <UriForm defaultUri="https://pod.inrupt.com/fluidlog/public/test-semapps/users"/>
          </span>
        </p>
      </div>
      <div className="App-list">
        <FetchUri />
      </div>
    </div>
  );
}

export default App;
