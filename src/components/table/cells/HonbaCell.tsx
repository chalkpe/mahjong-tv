import { FC } from 'react'
import BaseCell from './BaseCell'
import { baNames } from '../../../util'
import type { BaseCellProps } from '../../../types/cell'

const HonbaCell: FC<BaseCellProps> = ({ round }) => {
  return (
    <BaseCell>
      {baNames[round.ba]}
      {round.kyoku}국 {round.honba}본장
    </BaseCell>
  )
}

export default HonbaCell
