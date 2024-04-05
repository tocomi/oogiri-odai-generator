import { Odai } from './odai/Odai';
import { Providers } from './Providers';
import './index.css';
import { Moai } from './character/Moai';

function App() {
  return (
    <Providers>
      <main className="flex justify-center pb-36">
        <Odai />
        <Moai />
      </main>
    </Providers>
  );
}

export default App;
