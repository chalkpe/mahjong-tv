import { FC } from 'react'

import BaseCell from '@/components/table/BaseCell'
import { formatTime } from '@/formator'

import type { BaseCellProps } from '@/types/cell'

const TimeCell: FC<BaseCellProps> = ({ round, isLast }) => {
  return <BaseCell isLast={isLast}>{formatTime(round.time)}</BaseCell>
}

export default TimeCell
