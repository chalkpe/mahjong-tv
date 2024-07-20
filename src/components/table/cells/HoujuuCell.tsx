import { FC } from 'react'
import BaseCell from './BaseCell'
import { useAtomValue } from 'jotai'
import settingsAtom from '../../../store/settings'
import type { BaseCellProps } from '../../../types/cell'

const HoujuuCell: FC<BaseCellProps> = ({ round }) => {
  const { names } = useAtomValue(settingsAtom)
  return <BaseCell>{round.houjuu ? names[round.houjuu] : '-'}</BaseCell>
}

export default HoujuuCell
