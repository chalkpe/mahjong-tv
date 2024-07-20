import { FC } from 'react'
import { useAtomValue } from 'jotai'
import settingsAtom from '../../../store/settings'
import BaseCell from '../BaseCell'
import type { BaseCellProps } from '../../../types/cell'

const HoujuuCell: FC<BaseCellProps> = ({ round, isLast }) => {
  const { names } = useAtomValue(settingsAtom)
  return <BaseCell isLast={isLast}>{round.houjuu ? names[round.houjuu] : '-'}</BaseCell>
}

export default HoujuuCell
