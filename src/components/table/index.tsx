import { FC } from 'react'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'

import BaseCell from '@/components/table/BaseCell'
import useCells from '@/hooks/useCells'

import { useAtomValue } from 'jotai'
import roundsAtom, { selectedRoundIndexAtom } from '@/store/rounds'

const MainTable: FC = () => {
  const cells = useCells()

  const rounds = useAtomValue(roundsAtom)
  const selectedRoundIndex = useAtomValue(selectedRoundIndexAtom)

  return (
    <TableContainer component={Paper}>
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
          {rounds.map((round, index) => (
            <TableRow key={round.time} selected={selectedRoundIndex === index}>
              {cells.map(({ key, component: Cell }) => (
                <Cell key={key} round={round} index={index} isLast={index === rounds.length - 1} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MainTable
