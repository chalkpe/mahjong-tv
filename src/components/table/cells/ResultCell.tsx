import { FC } from 'react'

import BaseCell from '~/table/BaseCell'

import { useAtomValue } from 'jotai'
import settingsAtom from '@/store/settings'

import type { BaseCellProps } from '@/types/cell'

const ResultCell: FC<BaseCellProps> = ({ round, isLast }) => {
  const { mode, names } = useAtomValue(settingsAtom)
  const isTotalRyuukyoku = round.type === 'ryuukyoku' && (round.agari.length === mode || round.agari.length === 0)

  return (
    <BaseCell isLast={isLast}>
      {isTotalRyuukyoku ? '' : <>{round.agari.map((wind) => names[wind]).join('·')} </>}
      {round.type === 'tsumo' ? '쯔모' : round.type === 'ron' ? '론' : isTotalRyuukyoku ? '유국' : '텐파이'}
    </BaseCell>
  )
}

export default ResultCell
