import './App.css';
import WeatherApp from './components/weatherApp/WeatherApp';

function App() {
  return (
    <div className="App">
      <div className="stars" aria-hidden="true" />
      <h1 className="app-title">Weather Tracker</h1>
      <p className="app-subtitle">Real-time weather · Anywhere on Earth</p>
      <WeatherApp />
    </div>
  );
}

export default App;
