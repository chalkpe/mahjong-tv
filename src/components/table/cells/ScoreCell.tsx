import { FC } from 'react'

import BaseCell from '~/table/BaseCell'

import { formatScore } from '@/formator'
import { windsForMode } from '@/util'

import { useAtomValue } from 'jotai'
import settingsAtom from '@/store/settings'

import type { BaseCellProps } from '@/types/cell'

const ScoreCell: FC<BaseCellProps> = ({ round, isLast }) => {
  const { mode } = useAtomValue(settingsAtom)
  return (
    <>
      {windsForMode[mode].map((wind) => (
        <BaseCell key={wind} isLast={isLast}>
          {formatScore(round.scores[wind])}
        </BaseCell>
      ))}
    </>
  )
}

export default ScoreCell
