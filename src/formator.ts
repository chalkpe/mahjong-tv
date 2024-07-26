export const formatScore = (score?: number) => score?.toLocaleString('ko-KR') ?? '-'

export const formatUma = (uma: number) =>
  uma === 0 ? '0' : uma.toLocaleString('ko-KR', { signDisplay: 'always', minimumFractionDigits: 1 })

export const formatTime = (time: number) =>
  new Date(time).toLocaleString('ko-KR', { timeStyle: 'short', hourCycle: 'h23' })

export const formatLongTime = (time: number) =>
  new Date(time).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short', hourCycle: 'h23' })
