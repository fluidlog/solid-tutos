import TeamList from './teamList'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Bienvenu dans le tutoriel SOLID
        </p>
        Retrouvez plus d'informations dans le <a className="App-link" href="https://pad.lescommuns.org/4CH-testsSolid">PAD</a>
      </header>
      <div className="App-list">
        <TeamList />
      </div>
    </div>
  );
}

export default App;
