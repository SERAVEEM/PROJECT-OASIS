import Home from './pages/Home';
import { useLenis } from './hooks/useLenis';

function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <Home />
  );
}

export default App;
