import Home from './pages/Home';
import { useLenis } from './hooks/useLenis';

function App() {
  useLenis();
  

  return (
    <Home />
  );
}

export default App;
