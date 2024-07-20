import { FC } from 'react'
import { useAtomValue } from 'jotai'
import settingsAtom from '../../../store/settings'
import { windsForMode } from '../../../util'
import BaseCell from '../BaseCell'
import type { BaseCellProps } from '../../../types/cell'

const ScoreCell: FC<BaseCellProps> = ({ round, isLast }) => {
  const { mode } = useAtomValue(settingsAtom)
  return (
    <>
      {windsForMode[mode].map((wind) => (
        <BaseCell key={wind} isLast={isLast}>
          {round.scores[wind]?.toLocaleString('ko-KR') ?? '-'}
        </BaseCell>
      ))}
    </>
  )
}

export default ScoreCell
