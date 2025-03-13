import { useSetMessage } from '@/character/message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCallback, useState } from 'react'
import { useOdaiSuggestions } from './useOdaiSuggestions'

export const Odai = () => {
  const [keyword, setKeyword] = useState('')
  const {
    mutate,
    data: odaiSuggestions,
    isPending,
  } = useOdaiSuggestions(keyword)

  const setMessage = useSetMessage()
  const onClickGenerate = useCallback(() => {
    if (!keyword) {
      setMessage('いや何か入れろよ')
      return
    }
    setMessage('お題考えてるから邪魔すんなよ')
    mutate()
  }, [keyword, mutate, setMessage])

  return (
    <div className="flex flex-col gap-4 justify-center max-w-3xl w-[100%] p-8">
      <Input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="お題に利用するキーワード スペース区切りで複数可 例) 日本一 おにぎり"
      />
      <ModelSelect />
      <Button variant="default" disabled={isPending} onClick={onClickGenerate}>
        お題を作る！
      </Button>
      {isPending ? null : <OdaiList odaiSuggestions={odaiSuggestions || []} />}
    </div>
  )
}

const models = [
  { value: 'GPT-4o', label: 'GPT-4o' },
  { value: 'Claude 3.5', label: 'Claude 3.5' },
]

const ModelSelect = () => {
  const [selectedModel, setSelectedModel] = useState(models[0].value)

  return (
    <Select value={selectedModel} onValueChange={setSelectedModel}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Model</SelectLabel>
          {models.map((model) => (
            <SelectItem key={model.value} value={model.value}>
              {model.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const OdaiList = ({ odaiSuggestions }: { odaiSuggestions: string[] }) => {
  const setMessage = useSetMessage()
  const onClickCopy = (odai: string) => {
    navigator.clipboard
      .writeText(odai)
      .then(() => {
        setMessage('クリップボードにコピーしたわ')
      })
      .catch(() => {
        setMessage('エラーでコピーできなかったわ、すまんな。')
      })
  }

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
  )
}
