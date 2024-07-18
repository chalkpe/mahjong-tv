import { FC, PropsWithChildren } from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { useAtom, useAtomValue } from 'jotai'
import roundsAtom, { selectedRoundIndexAtom } from '../../store/rounds'
import settingsAtom from '../../store/settings'

import { baNames, windsForMode } from '../../util'
import { Edit } from '@mui/icons-material'

const BigTableCell: FC<PropsWithChildren> = ({ children }) => (
  <TableCell align="center" sx={{ fontSize: 18 }}>
    {children}
  </TableCell>
)

const MainTable: FC = () => {
  const rounds = useAtomValue(roundsAtom)
  const { mode, names } = useAtomValue(settingsAtom)
  const [selectedRoundIndex, setSelectedRoundIndex] = useAtom(selectedRoundIndexAtom)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {['시간', '회차', ...windsForMode[mode].map((wind) => names[wind]), '결과', '방총', '편집'].map((column) => (
              <BigTableCell key={column}>{column}</BigTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rounds.map((round, index) => (
            <TableRow key={round.time} selected={selectedRoundIndex === index}>
              <BigTableCell>{new Date(round.time).toLocaleString('ko-KR', { timeStyle: 'short', hourCycle: 'h24' })}</BigTableCell>

              <BigTableCell>
                {baNames[round.ba]}
                {round.kyoku}국 {round.honba}본장
              </BigTableCell>

              {windsForMode[mode].map((wind) => (
                <BigTableCell key={wind}>{round.scores[wind]}</BigTableCell>
              ))}

              <BigTableCell>
                {round.agari.map((wind) => names[wind]).join('·')}{' '}
                {round.type === 'ryuukyoku' ? (round.agari.length > 0 ? '텐파이' : '유국') : round.type === 'tsumo' ? '쯔모' : '론'}
              </BigTableCell>
              <BigTableCell>{round.houjuu ? names[round.houjuu] : '-'}</BigTableCell>

              <TableCell align="center">
                <IconButton
                  onClick={() => (selectedRoundIndex === index ? setSelectedRoundIndex(undefined) : setSelectedRoundIndex(index))}
                >
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MainTable
