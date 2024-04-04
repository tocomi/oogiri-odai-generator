import { useSetMessage } from '@/character/message';
import { useMutation } from '@tanstack/react-query';
import * as v from 'valibot';

const odaiSuggestionsSchema = v.array(v.string());

export const useOdaiSuggestions = (keyword: string) => {
  const setMessage = useSetMessage();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `https://oogiri-odai-generator-api.tocomi0112.workers.dev/?keyword=${keyword}`
      );
      const data = await response.json();
      const result = v.parse(odaiSuggestionsSchema, data);
      return result;
    },
    onSuccess: () => {
      setMessage('お題を考えたぜ！');
    },
    onError: () => {
      setMessage('エラーが発生したみたいだ、すまんな。');
    },
  });
};
