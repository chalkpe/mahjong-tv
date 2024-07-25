import { FC, useState } from 'react'
import { Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'

import BaseCell from '@/components/table/BaseCell'
import useCells from '@/hooks/useCells'

import { useAtomValue } from 'jotai'
import roundsAtom, { selectedRoundIndexAtom } from '@/store/rounds'

const ROWS_PER_PAGE = 12

const MainTable: FC = () => {
  const cells = useCells()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE)

  const rounds = useAtomValue(roundsAtom)
  const selectedRoundIndex = useAtomValue(selectedRoundIndexAtom)

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {cells.flatMap((cell) =>
                cell.names.map((name) => (
                  <BaseCell key={[cell.key, name].join()} isLast={false}>
                    {name}
                  </BaseCell>
                ))
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rounds
              .map((round, index) => (
                <TableRow key={round.time} selected={selectedRoundIndex === index}>
                  {cells.map(({ key, component: Cell }) => (
                    <Cell key={key} round={round} index={index} isLast={index === rounds.length - 1} />
                  ))}
                </TableRow>
              ))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[ROWS_PER_PAGE]}
        count={rounds.length}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
        page={page}
        onPageChange={(_, page) => setPage(page)}
      />
    </Paper>
  )
}

export default MainTable
