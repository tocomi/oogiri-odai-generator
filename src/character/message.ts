import { atom, useAtomValue, useSetAtom } from 'jotai';

const initialMessages = [
  'うっす',
  'お前も暇だよなあ',
  'いま機嫌悪いから話しかけないでくれ',
];

const initialMessage =
  initialMessages[Math.floor(Math.random() * initialMessages.length)];

const messageAtom = atom(initialMessage);

export const useMessage = () => {
  const message = useAtomValue(messageAtom);
  return message;
};

export const useSetMessage = () => {
  const setMessage = useSetAtom(messageAtom);
  return setMessage;
};
