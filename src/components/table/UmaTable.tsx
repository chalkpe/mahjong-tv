import { FC } from 'react'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'

import BaseCell from './BaseCell'

import { useAtomValue } from 'jotai'
import settingsAtom from '../../store/settings'

import { windsForMode } from '../../util'
import useUma from '../../hooks/useUma'

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
                {uma[wind]?.score.toFixed(1) ?? '-'}
                {uma[wind]?.index !== undefined && ` (${uma[wind]?.index + 1}위)`}
              </BaseCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UmaTable
