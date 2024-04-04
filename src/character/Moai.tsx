import { useState, useEffect, FC } from 'react';
import { useMessage } from './message';

interface Props {
  message: string;
}

export const Moai: FC<Props> = () => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const message = useMessage();

  useEffect(() => {
    setDisplayedMessage('');

    let currentCharIndex = 0;
    const timer = setInterval(() => {
      setDisplayedMessage((prev) => prev + message.charAt(currentCharIndex));
      currentCharIndex++;
      if (currentCharIndex > message.length) {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [message]);

  return (
    <div className="fixed flex items-center bottom-4 right-4 text-9xl">
      <span className="inline-block bg-white border-cyan-900 shadow-lg border-2 rounded-2xl p-4 text-2xl font-bold h-36 w-96">
        {displayedMessage}
      </span>
      <span className="text-9xl">🗿</span>
    </div>
  );
};
