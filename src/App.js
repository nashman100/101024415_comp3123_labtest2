import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import Weather from './components/Weather'


function App() {
  return (
    <div>
      <Header/>
      <Weather/>
    </div>
  );
}

export default App;
