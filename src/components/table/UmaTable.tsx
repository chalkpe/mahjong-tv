import { FC } from 'react'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { useAtomValue } from 'jotai'
import useUma from '../../hooks/useUma'
import settingsAtom from '../../store/settings'
import { windsForMode } from '../../util'
import BaseCell from './BaseCell'

const UmaTable: FC = () => {
  const uma = useUma()
  const { mode, names } = useAtomValue(settingsAtom)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {windsForMode[mode].map((wind) => (
              <BaseCell key={wind} isLast={false}>
                {names[wind]}
              </BaseCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {windsForMode[mode].map((wind) => (
              <BaseCell key={wind} isLast>
                {uma[wind]?.score.toLocaleString('ko-KR', { signDisplay: 'always', minimumFractionDigits: 1 }) ?? '-'}
                {uma[wind]?.index !== undefined && ` (${uma[wind]?.index + 1})`}
              </BaseCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UmaTable
