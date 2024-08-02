import { Odai } from './odai/Odai';
import { Providers } from './Providers';
import './index.css';
import { Emoji } from './character/Emoji';

function App() {
  return (
    <Providers>
      <main className="flex flex-col items-center mt-8 pb-36">
        <h1 className="text-4xl font-bold">大喜利お題ジェネレーター</h1>
        <Odai />
        <Emoji />
      </main>
    </Providers>
  );
}

export default App;
