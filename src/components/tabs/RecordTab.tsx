import { FC, useCallback, useMemo, useState } from 'react'
import { Alert, Box, Button, ButtonGroup, Divider, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'

import { useAtom, useAtomValue } from 'jotai'
import settingsAtom from '../../store/settings'
import roundsAtom, { lastRoundAtom } from '../../store/rounds'

import { scoresForMode, baNames, windsForMode } from '../../util'

import { AgariType, agariTypeOptions } from '../../types/agari'
import { Wind } from '../../types/wind'

const RecordTab: FC = () => {
  const { mode, names } = useAtomValue(settingsAtom)
  const winds = useMemo(() => windsForMode[mode], [mode])

  const [rounds, setRounds] = useAtom(roundsAtom)
  const lastRound = useAtomValue(lastRoundAtom)

  const [ba, setBa] = useState<Wind>(lastRound?.ba ?? 'east')
  const [kyoku, setKyoku] = useState<number>(lastRound?.kyoku ?? 1)
  const [honba, setHonba] = useState<number>(lastRound?.honba ?? 0)
  const [scores, setScores] = useState<Partial<Record<Wind, number>>>(lastRound ? lastRound.scores : scoresForMode[mode])
  const [type, setType] = useState<AgariType>('tsumo')
  const [agari, setAgari] = useState<Wind[]>([])
  const [houjuu, setHoujuu] = useState<Wind>()

  const isBaKyuokuHonbaValid = useMemo(
    () => ({
      valid: kyoku >= 1 && honba >= 0,
      duplicate: !rounds.some((r) => r.ba === ba && r.kyoku === kyoku && r.honba === honba),
    }),
    [ba, honba, kyoku, rounds]
  )

  const isSelectValid = useMemo(() => {
    switch (type) {
      case 'tsumo':
        return agari.length === 1
      case 'ron':
        return agari.length > 0 && houjuu !== undefined
      case 'ryuukyoku':
        return true
      default:
        return false
    }
  }, [agari.length, houjuu, type])

  const isValid = useMemo(() => isBaKyuokuHonbaValid.valid && isSelectValid, [isBaKyuokuHonbaValid.valid, isSelectValid])

  const scoreChanges = useMemo(
    () =>
      lastRound
        ? winds.flatMap((wind) => {
            if (scores[wind] && lastRound.scores[wind]) {
              const diff = scores[wind] - lastRound.scores[wind]
              return diff !== 0 ? [`${names[wind]} ${diff > 0 ? '+' : ''}${diff}점`] : []
            }
            return []
          })
        : [],
    [lastRound, names, scores, winds]
  )

  const record = useCallback(() => {
    // create round
    const time = Date.now()
    setRounds((rounds) => [...rounds, { time, mode, ba, kyoku, honba, scores, type, agari, houjuu }])

    // reset
    setType('tsumo')
    setAgari([])
  }, [agari, ba, honba, houjuu, kyoku, mode, scores, setRounds, type])

  return (
    <Stack direction="column" spacing={2}>
      <section>
        <Typography variant="h6" gutterBottom>
          회차
        </Typography>
        <Stack direction="row" spacing={1}>
          <Select
            fullWidth
            value={ba}
            onChange={(event) => {
              setBa(event.target.value as Wind)
              setKyoku(1)
              setHonba(0)
            }}
          >
            {winds.map((wind) => (
              <MenuItem key={wind} value={wind}>
                {baNames[wind]}
              </MenuItem>
            ))}
          </Select>
          <TextField
            type="number"
            label="국"
            fullWidth
            value={kyoku.toString()}
            onChange={(event) => {
              setKyoku(Number(event.target.value))
              setHonba(0)
            }}
          />
          <TextField
            type="number"
            label="본장"
            fullWidth
            value={honba.toString()}
            onChange={(event) => setHonba(Number(event.target.value))}
          />
        </Stack>
      </section>

      <section>
        <Typography variant="h6" gutterBottom>
          점수
        </Typography>
        <Stack direction="row" spacing={1} pt={1}>
          {winds.map((wind) => (
            <TextField
              key={wind}
              type="number"
              margin="normal"
              label={names[wind]}
              fullWidth
              value={scores[wind]?.toString() ?? ''}
              onChange={(event) => setScores({ ...scores, [wind]: Number(event.target.value) })}
            />
          ))}
        </Stack>
      </section>

      <section>
        <Typography variant="h6" gutterBottom>
          결과
        </Typography>
        <ButtonGroup size="large" fullWidth>
          {agariTypeOptions.map((agariType) => (
            <Button
              key={agariType.value}
              variant={type === agariType.value ? 'contained' : 'outlined'}
              onClick={() => {
                setType(agariType.value)
                setAgari([])
              }}
            >
              {agariType.label}
            </Button>
          ))}
        </ButtonGroup>
      </section>

      <section>
        <Typography variant="h6" gutterBottom>
          {type === 'tsumo' || type === 'ron' ? '화료' : '텐파이'}
        </Typography>
        <ButtonGroup size="large" fullWidth>
          {winds.map((wind) => (
            <Button
              key={wind}
              variant={agari.includes(wind) ? 'contained' : 'outlined'}
              onClick={() => {
                setHoujuu(undefined)
                if (type === 'tsumo') {
                  setAgari([wind]) // select
                } else {
                  if (agari.includes(wind)) setAgari(agari.filter((w) => w !== wind)) // remove
                  else if (type === 'ryuukyoku' || winds.length - 1 > agari.length) setAgari([...agari, wind]) // add
                }
              }}
            >
              {names[wind]}
            </Button>
          ))}
        </ButtonGroup>
      </section>

      {type === 'ron' && agari.length > 0 && (
        <section>
          <Typography variant="h6" gutterBottom>
            방총
          </Typography>
          <ButtonGroup size="large" fullWidth>
            {winds
              .filter((wind) => !agari.includes(wind))
              .map((wind) => (
                <Button key={wind} variant={houjuu === wind ? 'contained' : 'outlined'} onClick={() => setHoujuu(wind)}>
                  {names[wind]}
                </Button>
              ))}
          </ButtonGroup>
        </section>
      )}

      <Divider />

      {scoreChanges.length > 0 && (
        <Box>
          <Typography variant="body1" fontWeight="700">
            점수 등락
          </Typography>
          <Typography variant="body1">{scoreChanges.join(', ')}</Typography>
        </Box>
      )}

      {isSelectValid && !isBaKyuokuHonbaValid.valid && <Alert severity="error">회차가 올바르지 않습니다.</Alert>}
      {isSelectValid && !isBaKyuokuHonbaValid.duplicate && (
        <Alert severity="error">
          {baNames[ba]}
          {kyoku}국 {honba}본장은 이미 기록되어 있습니다.
        </Alert>
      )}

      <ButtonGroup size="large" fullWidth>
        <Button variant="contained" color="primary" disabled={!isValid} onClick={record}>
          생성
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

export default RecordTab
