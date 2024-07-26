import { FC, useCallback, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material'

import HistoryTable from '~/table/HistoryTable'

import { useAtomValue, useSetAtom } from 'jotai'
import historiesAtom from '@/store/history'
import roundsAtom, { lastRoundAtom } from '@/store/rounds'

const HistoryTab: FC = () => {
  const setRounds = useSetAtom(roundsAtom)
  const lastRound = useAtomValue(lastRoundAtom)
  const setHistories = useSetAtom(historiesAtom)

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const createHistory = useCallback(() => {
    if (!lastRound) return

    setHistories((histories) => [
      ...histories,
      { time: lastRound.time, mode: lastRound.mode, scores: lastRound.scores },
    ])

    setRounds([])
    setIsConfirmDialogOpen(false)
  }, [lastRound, setHistories, setRounds])

  return (
    <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
      <HistoryTable />
      <Button
        size="large"
        variant="contained"
        fullWidth
        onClick={() => setIsConfirmDialogOpen(true)}
        disabled={!lastRound}
      >
        기록하기
      </Button>

      {isConfirmDialogOpen && (
        <Dialog open onClose={() => setIsConfirmDialogOpen(false)}>
          <DialogTitle>기록하기</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              최종 점수를 기록하고 점수 테이블을 초기화하시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsConfirmDialogOpen(false)}>취소</Button>
            <Button onClick={createHistory} autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Stack>
  )
}

export default HistoryTab
