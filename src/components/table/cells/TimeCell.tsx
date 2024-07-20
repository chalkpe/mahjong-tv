import { FC } from 'react'
import BaseCell from './BaseCell'
import type { BaseCellProps } from '../../../types/cell'

const TimeCell: FC<BaseCellProps> = ({ round }) => {
  return <BaseCell>{new Date(round.time).toLocaleString('ko-KR', { timeStyle: 'short', hourCycle: 'h23' })}</BaseCell>
}

export default TimeCell
