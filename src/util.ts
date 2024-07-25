import type { Mode } from '@/types/mode'
import type { Round } from '@/types/round'
import type { Wind } from '@/types/wind'

export const baNames: Record<Wind, string> = {
  east: '동',
  south: '남',
  west: '서',
  north: '북',
}

export const seatNames: Record<Wind, string> = {
  east: '동가',
  south: '남가',
  west: '서가',
  north: '북가',
}

export const windsForMode: Record<Mode, Wind[]> = {
  4: ['east', 'south', 'west', 'north'],
  3: ['east', 'south', 'west'],
  2: ['east', 'west'],
}

export const scoresForMode: Record<Mode, Partial<Record<Wind, number>>> = {
  4: { east: 25000, south: 25000, west: 25000, north: 25000 },
  3: { east: 35000, south: 35000, west: 35000 },
  2: { east: 0, west: 0 },
}

export const sumScores = (scores: Partial<Record<Wind, number>>) => Object.values(scores).reduce((a, b) => a + b)

export const umaForMode: Record<Mode, number[]> = {
  4: [15, 5, -5, -15],
  3: [15, 0, -15],
  2: [0, 0],
}

export const umaWindPriority: Wind[] = ['east', 'south', 'west', 'north']

export const calculateChanges = (
  winds: Wind[],
  names: Record<Wind, string>,
  scores: Partial<Record<Wind, number>>,
  round: Round
) =>
  winds.flatMap((wind) => {
    if (scores[wind] && round.scores[wind]) {
      const diff = scores[wind] - round.scores[wind]
      return diff !== 0 ? [`${names[wind]} ${diff.toLocaleString('ko-KR', { signDisplay: 'always' })}점`] : []
    }
    return []
  })
