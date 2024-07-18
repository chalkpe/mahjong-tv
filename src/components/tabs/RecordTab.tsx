import { FC, useCallback, useMemo, useState } from 'react'
import { Button, ButtonGroup, Divider, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'

import { useAtomValue, useSetAtom } from 'jotai'
import settingsAtom from '../../store/settings'
import roundsAtom, { lastRoundAtom } from '../../store/rounds'

import { scoresForMode, baNames, windsForMode } from '../../util'

import { AgariType, agariTypeOptions } from '../../types/agari'
import { Wind } from '../../types/wind'

const RecordTab: FC = () => {
  const { mode, names } = useAtomValue(settingsAtom)
  const winds = windsForMode[mode]

  const setRounds = useSetAtom(roundsAtom)
  const lastRound = useAtomValue(lastRoundAtom)

  const [ba, setBa] = useState<Wind>('east')
  const [kyoku, setKyoku] = useState<number>(1)
  const [honba, setHonba] = useState<number>(0)
  const [scores, setScores] = useState<Partial<Record<Wind, number>>>(lastRound ? lastRound.scores : scoresForMode[mode])
  const [type, setType] = useState<AgariType>('tsumo')
  const [agari, setAgari] = useState<Wind[]>([])
  const [houjuu, setHoujuu] = useState<Wind>()

  const isValid = useMemo(() => {
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

  const record = useCallback(() => {
    // create round
    setRounds((rounds) => [...rounds, { mode, ba, kyoku, honba, scores, type, agari, houjuu }])

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
          <Select fullWidth value={ba} onChange={(event) => setBa(event.target.value as Wind)}>
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
            onChange={(event) => setKyoku(Number(event.target.value))}
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

      <ButtonGroup size="large" fullWidth>
        <Button variant="contained" color="primary" disabled={!isValid} onClick={record}>
          생성
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

export default RecordTab
