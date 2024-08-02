import { useState, useEffect, FC, useRef } from 'react';
import { useMessage } from './message';
import { useMutating } from '@/odai/useOdaiSuggestions';
import 'emoji-picker-element';

export const Emoji: FC = () => {
  const [emoji, setEmoji] = useState('🗿');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
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
    <div className="fixed flex flex-col gap-1 bottom-4 right-2">
      {openEmojiPicker && <EmojiPicker onClickEmojiInPicker={setEmoji} />}
      <div className="flex items-center text-9xl">
        <span className="inline-block bg-white border-cyan-900 shadow-lg border-2 rounded-2xl mr-[-48px] p-4 text-2xl font-bold h-36 w-96">
          {displayedMessage}
        </span>
        <span
          className={`text-9xl cursor-pointer ${
            thinking ? 'animate-spin' : 'animate-sway'
          }`}
          onClick={() => setOpenEmojiPicker((prev) => !prev)}
        >
          {emoji}
        </span>
      </div>
    </div>
  );
};

const EmojiPicker = ({
  onClickEmojiInPicker,
}: {
  onClickEmojiInPicker: (emoji: string) => void;
}) => {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;

    const listener = (event: Event) => {
      console.log('Emoji clicked!', event);
      onClickEmojiInPicker(event.detail.unicode);
    };
    ref.current.addEventListener('emoji-click', listener);
    return () => {
      ref.current?.removeEventListener('emoji-click', listener);
    };
  }, [onClickEmojiInPicker]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <emoji-picker ref={ref} />;
};
