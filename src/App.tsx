import { Odai } from './odai/Odai';
import { Providers } from './Providers';
import './index.css';
import { Toaster } from 'sonner';
import { Moai } from './character/Moai';

function App() {
  return (
    <Providers>
      <main className="flex justify-center pb-36">
        <Odai />
        <Toaster />
        <Moai message="おはようございます" />
      </main>
    </Providers>
  );
}

export default App;
