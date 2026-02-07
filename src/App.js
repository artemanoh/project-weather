import './App.css';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Weather } from './components/Weather';
import { Pets } from './components/Pets';
import { Footer } from './components/Footer';
import { Nature } from './components/Nature';

function App() {
  return (
    <div className="App">
<Header/>
 <Dashboard/>
<Weather/>
<Pets/>
<Nature/>
<Footer/>

    </div>
  );
}

export default App;
