import { Odai } from './odai/Odai';
import { Providers } from './Providers';
import './index.css';

function App() {
  return (
    <Providers>
      <main className="flex justify-center">
        <Odai />
      </main>
    </Providers>
  );
}

export default App;
