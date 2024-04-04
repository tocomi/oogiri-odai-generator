import { Odai } from './odai/Odai';
import { Providers } from './Providers';
import './index.css';
import { Toaster } from 'sonner';

function App() {
  return (
    <Providers>
      <main className="flex justify-center">
        <Odai />
        <Toaster />
      </main>
    </Providers>
  );
}

export default App;
