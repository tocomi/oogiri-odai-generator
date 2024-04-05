import { useCallback, useState } from 'react';
import { useOdaiSuggestions } from './useOdaiSuggestions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSetMessage } from '@/character/message';

export const Odai = () => {
  const [keyword, setKeyword] = useState('');
  const {
    mutate,
    data: odaiSuggestions,
    isPending,
  } = useOdaiSuggestions(keyword);

  const setMessage = useSetMessage();
  const onClickGenerate = useCallback(() => {
    if (!keyword) {
      setMessage('いや何か入れろよ');
      return;
    }
    setMessage('お題考えてるから邪魔すんなよ');
    mutate();
  }, [keyword, mutate, setMessage]);

  return (
    <div className="flex flex-col gap-4 justify-center max-w-3xl w-[100%] p-8">
      <Input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="お題を絞り込むキーワード スペース区切りで複数可 例) 日本一 おにぎり"
      />
      <Button variant="default" onClick={onClickGenerate}>
        お題を作る！
      </Button>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <OdaiList odaiSuggestions={odaiSuggestions || []} />
      )}
    </div>
  );
};

const OdaiList = ({ odaiSuggestions }: { odaiSuggestions: string[] }) => {
  const setMessage = useSetMessage();
  const onClickCopy = (odai: string) => {
    navigator.clipboard
      .writeText(odai)
      .then(() => {
        setMessage('クリップボードにコピーしたわ');
      })
      .catch(() => {
        setMessage('エラーでコピーできなかったわ、すまんな。');
      });
  };

  return (
    <div className="flex flex-col gap-2">
      {odaiSuggestions.map((odai) => (
        <div
          key={odai}
          className="flex items-center justify-between gap-4 py-2 px-4 border rounded-lg bg-white shadow-sm dark:bg-gray-850"
        >
          <div className="grid gap-1">
            <h3 className="font-semibold">{odai}</h3>
          </div>
          <Button onClick={() => onClickCopy(odai)} size="sm">
            <span>Copy</span>
          </Button>
        </div>
      ))}
    </div>
  );
};
