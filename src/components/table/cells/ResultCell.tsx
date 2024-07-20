import { FC } from 'react'
import BaseCell from '../BaseCell'
import { useAtomValue } from 'jotai'
import settingsAtom from '../../../store/settings'
import type { BaseCellProps } from '../../../types/cell'

const ResultCell: FC<BaseCellProps> = ({ round, isLast }) => {
  const { names } = useAtomValue(settingsAtom)
  return (
    <BaseCell isLast={isLast}>
      {round.agari.map((wind) => names[wind]).join('·')}{' '}
      {round.type === 'ryuukyoku' ? (round.agari.length > 0 ? '텐파이' : '유국') : round.type === 'tsumo' ? '쯔모' : '론'}
    </BaseCell>
  )
}

export default ResultCell
