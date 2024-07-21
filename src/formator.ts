export const formatScore = (score?: number) => score?.toLocaleString('ko-KR') ?? '-'

export const formatUma = (uma: number) =>
  uma.toLocaleString('ko-KR', { signDisplay: 'always', minimumFractionDigits: 1 })

export const formatTime = (time: number) =>
  new Date(time).toLocaleString('ko-KR', { timeStyle: 'short', hourCycle: 'h23' })
