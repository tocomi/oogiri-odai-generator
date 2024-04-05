import { useSetMessage } from '@/character/message';
import { useMutation } from '@tanstack/react-query';
import * as v from 'valibot';

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

const odaiSuggestionsSchema = v.array(v.string());

export const useOdaiSuggestions = (keyword: string) => {
  const setMessage = useSetMessage();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_DOMAIN}/?keyword=${keyword}`);
      const data = await response.json();
      const result = v.parse(odaiSuggestionsSchema, data);
      return result;
    },
    onSuccess: () => {
      setMessage('お題できたわ、おもしろくね？');
    },
    onError: () => {
      setMessage('エラーが発生したみたいだ、すまんな。');
    },
  });
};
