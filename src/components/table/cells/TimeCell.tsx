import { FC } from 'react'
import { formatTime } from '../../../formator'
import BaseCell from '../BaseCell'
import type { BaseCellProps } from '../../../types/cell'

const TimeCell: FC<BaseCellProps> = ({ round, isLast }) => {
  return <BaseCell isLast={isLast}>{formatTime(round.time)}</BaseCell>
}

export default TimeCell
