import { FC, PropsWithChildren } from 'react'
import { TableCell } from '@mui/material'

interface BaseCellProps {
  isLast: boolean
}

const BaseCell: FC<PropsWithChildren<BaseCellProps>> = ({ isLast, children }) => (
  <TableCell align="center" sx={{ fontSize: 18, borderBottomWidth: isLast ? 0 : undefined }}>
    {children}
  </TableCell>
)

export default BaseCell
