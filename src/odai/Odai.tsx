import { useState } from 'react';
import { useOdaiSuggestions } from './useOdaiSuggestions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const Odai = () => {
  const [keyword, setKeyword] = useState('花見 この世の終わり');
  const {
    mutate,
    data: odaiSuggestions,
    isPending,
  } = useOdaiSuggestions(keyword);

  return (
    <div className="flex flex-col gap-4 justify-center max-w-3xl w-[100%] p-8">
      <Input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button variant="default" onClick={() => mutate()}>
        お題を考える！
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
  const onClickCopy = (odai: string) => {
    navigator.clipboard
      .writeText(odai)
      .then(() => {
        toast.success('クリップボードにコピーしました 💁‍♀️', {
          duration: 2000,
          position: 'top-right',
        });
      })
      .catch(() => {
        toast.error('コピーに失敗しました 😢', {
          duration: 2000,
          position: 'top-right',
        });
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
