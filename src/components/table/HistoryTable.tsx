import { Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'

import { formatLongTime, formatScore, formatUma } from '@/formator'
import { calculateUma } from '@/util'

import { useAtom, useAtomValue } from 'jotai'
import historiesAtom from '@/store/history'
import settingsAtom from '@/store/settings'

import type { Wind } from '@/types/wind'

const HistoryTable = () => {
  const [histories] = useAtom(historiesAtom)
  const { names } = useAtomValue(settingsAtom)

  return (
    <Stack direction="column" sx={{ flex: 1 }}>
      <List sx={{ m: -3 }}>
        {histories.map((history, index) => {
          const uma = calculateUma(history.scores, history.mode)
          return (
            <>
              {index !== 0 && <Divider component="li" />}
              <ListItem key={history.time}>
                <ListItemText
                  primary={formatLongTime(history.time)}
                  primaryTypographyProps={{ gutterBottom: true}}
                  secondary={
                    <Stack direction="row" spacing={2}>
                      {Object.entries(uma).map(([wind, { score, index }]) => (
                        <Typography key={wind} variant="body2">
                          #{index + 1} {names[wind as Wind]} <br />
                          {formatScore(history.scores[wind as Wind])}점 ({formatUma(score)})
                        </Typography>
                      ))}
                    </Stack>
                  }
                />
              </ListItem>
            </>
          )
        })}
      </List>
    </Stack>
  )
}

export default HistoryTable
