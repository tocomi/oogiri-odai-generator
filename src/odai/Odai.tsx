import { useState } from 'react';
import { useOdaiSuggestions } from './useOdaiSuggestions';

export const Odai = () => {
  const [keyword, setKeyword] = useState('花見 この世の終わり');
  const {
    mutate,
    data: odaiSuggestions,
    isPending,
  } = useOdaiSuggestions(keyword);

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={() => mutate()}>Search</button>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <OdaiList odaiSuggestions={odaiSuggestions || []} />
      )}
    </div>
  );
};

const OdaiList = ({ odaiSuggestions }: { odaiSuggestions: string[] }) => {
  return (
    <ul>
      {odaiSuggestions.map((odai) => (
        <li key={odai}>{odai}</li>
      ))}
    </ul>
  );
};
