export type Tab = 'settings' | 'record' | 'history'

export const tabOptions: { label: [string, string]; value: Tab }[] = [
  { label: ['설정', '설정'], value: 'settings' },
  { label: ['기록', '수정'], value: 'record' },
  { label: ['역사', '역사'], value: 'history' },
]
