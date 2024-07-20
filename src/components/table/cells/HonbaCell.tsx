import { FC } from 'react'
import { baNames } from '../../../util'
import BaseCell from '../BaseCell'
import type { BaseCellProps } from '../../../types/cell'

const HonbaCell: FC<BaseCellProps> = ({ round, isLast }) => {
  return (
    <BaseCell isLast={isLast}>
      {baNames[round.ba]}
      {round.kyoku}국 {round.honba}본장
    </BaseCell>
  )
}

export default HonbaCell
