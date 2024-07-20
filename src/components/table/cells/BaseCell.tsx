import { FC, PropsWithChildren } from 'react'
import { TableCell } from '@mui/material'

const BaseCell: FC<PropsWithChildren> = ({ children }) => (
  <TableCell align="center" sx={{ fontSize: 18 }}>
    {children}
  </TableCell>
)

export default BaseCell
