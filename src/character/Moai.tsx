// TalkingMoai.tsx
import { useState, useEffect, FC } from 'react';

interface Props {
  message: string;
}

export const Moai: FC<Props> = ({ message }) => {
  const [displayedMessage, setDisplayedMessage] = useState('');

  useEffect(() => {
    let currentCharIndex = 0;
    const timer = setInterval(() => {
      setDisplayedMessage((prev) => prev + message.charAt(currentCharIndex));
      currentCharIndex++;
      if (currentCharIndex > message.length) {
        clearInterval(timer);
      }
    }, 100);

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
