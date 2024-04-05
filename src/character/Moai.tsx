import { useState, useEffect, FC } from 'react';
import { useMessage } from './message';
import { useMutating } from '@/odai/useOdaiSuggestions';

export const Moai: FC = () => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const message = useMessage();
  const thinking = useMutating();

  useEffect(() => {
    setDisplayedMessage('');
    const charItr = message[Symbol.iterator]();
    let timerId: NodeJS.Timeout;

    (function showChar() {
      const nextChar = charItr.next();
      if (nextChar.done) {
        return;
      }
      setDisplayedMessage((current) => current + nextChar.value);
      timerId = setTimeout(showChar, 50);
    })();

    return () => clearTimeout(timerId);
  }, [message]);

  return (
    <div className="fixed flex items-center bottom-4 right-2 text-9xl">
      <span className="inline-block bg-white border-cyan-900 shadow-lg border-2 rounded-2xl mr-[-48px] p-4 text-2xl font-bold h-36 w-96">
        {displayedMessage}
      </span>
      <span
        className={`text-9xl ${thinking ? 'animate-spin' : 'animate-sway'}`}
      >
        🗿
      </span>
    </div>
  );
};
