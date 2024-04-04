import { Odai } from './odai/Odai';
import { Providers } from './Providers';
import './index.css';

function App() {
  return (
    <Providers>
      <h1>Vite + React</h1>
      <Odai />
    </Providers>
  );
}

export default App;
