import { FC } from 'react'
import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import BaseCell from '~/table/BaseCell'

import { useAtom } from 'jotai'
import { selectedRoundIndexAtom } from '@/store/rounds'

import type { BaseCellProps } from '@/types/cell'

const SelectCell: FC<BaseCellProps> = ({ index, isLast }) => {
  const [selectedRoundIndex, setSelectedRoundIndex] = useAtom(selectedRoundIndexAtom)
  return (
    <BaseCell isLast={isLast}>
      <IconButton
        onClick={() => (selectedRoundIndex === index ? setSelectedRoundIndex(undefined) : setSelectedRoundIndex(index))}
      >
        <Edit />
      </IconButton>
    </BaseCell>
  )
}

export default SelectCell
