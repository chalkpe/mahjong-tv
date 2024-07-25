import { FC, useState } from 'react'
import { Button, ButtonGroup, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material'

import { seatNames, windsForMode } from '@/util'

import { useAtom } from 'jotai'
import settingsAtom from '@/store/settings'

import { modeOptions } from '@/types/mode'
import { Wind } from '@/types/wind'

const SettingsTab: FC = () => {
  const [settings, setSettings] = useAtom(settingsAtom)
  const [editingWind, setEditingWind] = useState<Wind>()

  return (
    <Stack direction="column" spacing={2}>
      <section>
        <Typography variant="h6" gutterBottom>
          모드
        </Typography>
        <ButtonGroup size="large" fullWidth>
          {modeOptions.map((mode) => (
            <Button
              key={mode.value}
              variant={settings.mode === mode.value ? 'contained' : 'outlined'}
              onClick={() => setSettings({ ...settings, mode: mode.value })}
            >
              {mode.label}
            </Button>
          ))}
        </ButtonGroup>
      </section>
      <section>
        <Typography variant="h6" gutterBottom>
          닉네임
        </Typography>
        <Stack direction="row" spacing={2}>
          {windsForMode[settings.mode].map((wind) => (
            <Button key={wind} fullWidth size="large" variant="outlined" onClick={() => setEditingWind(wind)}>
              {settings.names[wind]}
            </Button>
          ))}
        </Stack>
        {editingWind && (
          <Dialog open onClose={() => setEditingWind(undefined)}>
            <DialogTitle>{seatNames[editingWind]} 닉네임 편집</DialogTitle>
            <DialogContent sx={{ overflow: 'visible' }}>
              <TextField
                autoFocus
                type="text"
                fullWidth
                value={settings.names[editingWind]}
                onChange={(event) =>
                  setSettings({ ...settings, names: { ...settings.names, [editingWind]: event.target.value } })
                }
              />
            </DialogContent>
          </Dialog>
        )}
      </section>
    </Stack>
  )
}

export default SettingsTab
