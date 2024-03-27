import { useMutation } from '@tanstack/react-query';
import * as v from 'valibot';

const odaiSuggestionsSchema = v.array(v.string());

export const useOdaiSuggestions = (keyword: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `https://oogiri-odai-api.onrender.com/?keyword=${keyword}`
      );
      const data = await response.json();
      const result = v.parse(odaiSuggestionsSchema, data);
      return result;
    },
  });
};