import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { InfoOutlined } from '@mui/icons-material'
import { Alert, Box, Button, ButtonGroup, Divider, MenuItem, Select, Stack, Typography } from '@mui/material'

import NumberField from '~/NumberField'

import { formatScore } from '@/formator'
import { baNames, calculateChanges, scoresForMode, sumScores, windsForMode } from '@/util'

import { useAtom, useAtomValue } from 'jotai'
import roundsAtom, {
  isEditModeAtom,
  lastRoundAtom,
  preSelectedRoundAtom,
  selectedRoundAtom,
  selectedRoundIndexAtom,
} from '@/store/rounds'
import settingsAtom from '@/store/settings'

import { AgariType, agariTypeOptions } from '@/types/agari'
import type { Wind } from '@/types/wind'

const RecordTab: FC = () => {
  const { mode, names } = useAtomValue(settingsAtom)
  const winds = useMemo(() => windsForMode[mode], [mode])

  const [rounds, setRounds] = useAtom(roundsAtom)
  const [selectedRoundIndex, setSelectedRoundIndex] = useAtom(selectedRoundIndexAtom)

  const isEditMode = useAtomValue(isEditModeAtom)
  const color = useMemo(() => (isEditMode ? 'secondary' : 'primary'), [isEditMode])

  const lastRound = useAtomValue(lastRoundAtom)
  const selectedRound = useAtomValue(selectedRoundAtom)
  const preSelectedRound = useAtomValue(preSelectedRoundAtom)

  const [ba, setBa] = useState<Wind>(lastRound?.ba ?? 'east')
  const [kyoku, setKyoku] = useState<number>(lastRound?.kyoku ?? 1)
  const [honba, setHonba] = useState<number>(lastRound?.honba ?? 0)
  const [scores, setScores] = useState<Partial<Record<Wind, number>>>(lastRound?.scores ?? scoresForMode[mode])
  const [type, setType] = useState<AgariType>('tsumo')
  const [agari, setAgari] = useState<Wind[]>([])
  const [houjuu, setHoujuu] = useState<Wind>()

  useEffect(() => {
    if (selectedRound) {
      setBa(selectedRound.ba)
      setKyoku(selectedRound.kyoku)
      setHonba(selectedRound.honba)
      setScores(selectedRound.scores)
      setType(selectedRound.type)
      setAgari(selectedRound.agari)
      setHoujuu(selectedRound.houjuu)
    } else {
      setBa(lastRound?.ba ?? 'east')
      setKyoku(lastRound?.kyoku ?? 1)
      setHonba(lastRound?.honba ?? 0)
      setScores(lastRound?.scores ?? scoresForMode[mode])
      setType('tsumo')
      setAgari([])
      setHoujuu(undefined)
    }
  }, [lastRound, mode, selectedRound])

  const isHonbaValid = useMemo(() => kyoku >= 1 && honba >= 0, [honba, kyoku])
  const isHonbaUnique = useMemo(
    () => !rounds.some((r) => r.ba === ba && r.kyoku === kyoku && r.honba === honba),
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

  const maxScore = useMemo(() => (mode === 2 ? Infinity : sumScores(scoresForMode[mode])), [mode])
  const isScoreValid = useMemo(() => sumScores(scores) <= maxScore, [maxScore, scores])

  const isValid = useMemo(
    () => isHonbaValid && isSelectValid && isScoreValid,
    [isHonbaValid, isScoreValid, isSelectValid]
  )

  const scoreChanges = useMemo(
    () =>
      isEditMode
        ? preSelectedRound
          ? calculateChanges(winds, names, scores, preSelectedRound.scores)
          : calculateChanges(winds, names, scores, scoresForMode[mode])
        : lastRound
        ? calculateChanges(winds, names, scores, lastRound.scores)
        : calculateChanges(winds, names, scores, scoresForMode[mode]),
    [isEditMode, lastRound, mode, names, preSelectedRound, scores, winds]
  )

  const record = useCallback(() => {
    // create round
    const time = Date.now()
    setRounds((rounds) => [...rounds, { time, mode, ba, kyoku, honba, scores, type, agari, houjuu }])

    // reset
    setType('tsumo')
    setAgari([])
  }, [agari, ba, honba, houjuu, kyoku, mode, scores, setRounds, type])

  const edit = useCallback(() => {
    if (isEditMode) {
      // edit round
      setRounds((rounds) =>
        rounds.map((r, index) =>
          index === selectedRoundIndex ? { time: r.time, mode, ba, kyoku, honba, scores, type, agari, houjuu } : r
        )
      )

      // reset
      setSelectedRoundIndex(undefined)
      setType('tsumo')
      setAgari([])
    }
  }, [
    agari,
    ba,
    honba,
    houjuu,
    isEditMode,
    kyoku,
    mode,
    scores,
    selectedRoundIndex,
    setRounds,
    setSelectedRoundIndex,
    type,
  ])

  const deleteRound = useCallback(() => {
    if (isEditMode) {
      // delete round
      setRounds((rounds) => rounds.filter((_, index) => index !== selectedRoundIndex))

      // reset
      setSelectedRoundIndex(undefined)
      setType('tsumo')
      setAgari([])
    }
  }, [isEditMode, selectedRoundIndex, setRounds, setSelectedRoundIndex])

  return (
    <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
      <section>
        <Typography variant="h6" gutterBottom>
          회차
        </Typography>
        <Stack direction="row" spacing={1}>
          <Select
            color={color}
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

          <Select
            color={color}
            fullWidth
            value={kyoku}
            onChange={(event) => {
              setKyoku(Number(event.target.value))
              setHonba(0)
            }}
          >
            {[...Array(mode)].map((_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}국
              </MenuItem>
            ))}
          </Select>

          <Select color={color} fullWidth value={honba} onChange={(event) => setHonba(Number(event.target.value))}>
            {[...Array(10)].map((_, index) => (
              <MenuItem key={index} value={index}>
                {index}본장
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </section>

      <section>
        <Typography variant="h6" gutterBottom>
          <Stack direction="row" spacing={1} alignItems="center">
            <span>점수</span>
            <InfoOutlined />
          </Stack>
        </Typography>
        <Stack direction="row" spacing={1} pt={1}>
          {winds.map((wind) => (
            <NumberField
              key={wind}
              id={wind}
              color={color}
              type="number"
              margin="normal"
              label={names[wind]}
              fullWidth
              value={scores[wind]}
              onChange={(value) => setScores({ ...scores, [wind]: value })}
              onFocus={() => setScores({ ...scores, [wind]: undefined })}
            />
          ))}
        </Stack>
      </section>

      <section>
        <Typography variant="h6" gutterBottom>
          결과
        </Typography>
        <ButtonGroup size="large" fullWidth color={color}>
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
        <ButtonGroup size="large" fullWidth color={color}>
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
          <ButtonGroup size="large" fullWidth color={color}>
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

      <Divider sx={{ flex: 1 }} />

      {scoreChanges.length > 0 && (
        <Box>
          <Typography variant="body1" fontWeight="700">
            점수 등락
          </Typography>
          <Typography variant="body1">{scoreChanges.join(', ')}</Typography>
        </Box>
      )}

      {!isHonbaValid && <Alert severity="error">회차가 올바르지 않습니다.</Alert>}
      {!isEditMode && !isHonbaUnique && (
        <Alert severity="warning">
          {baNames[ba]}
          {kyoku}국 {honba}본장은 이미 기록되어 있습니다.
        </Alert>
      )}

      {!isScoreValid && <Alert severity="error">점수의 총합은 {formatScore(maxScore)}점을 넘을 수 없습니다.</Alert>}

      {isEditMode && (
        <Button size="large" fullWidth color="error" variant="contained" onClick={deleteRound}>
          삭제
        </Button>
      )}

      <Button
        size="large"
        fullWidth
        color={color}
        variant="contained"
        disabled={!isValid}
        onClick={isEditMode ? edit : record}
      >
        {isEditMode ? '수정' : '생성'}
      </Button>
    </Stack>
  )
}

export default RecordTab
