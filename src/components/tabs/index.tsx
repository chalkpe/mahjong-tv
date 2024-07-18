import { FC, useMemo, useState } from 'react'
import { Paper, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

import { useAtomValue } from 'jotai'
import { selectedRoundIndexAtom } from '../../store/rounds'

import SettingsTab from './SettingsTab'
import RecordTab from './RecordTab'

const Tabs: FC = () => {
  const [tab, setTab] = useState('settings')
  const selectedRoundIndex = useAtomValue(selectedRoundIndexAtom)
  const color = useMemo(() => selectedRoundIndex !== undefined  && tab === 'record' ? 'secondary' : 'primary', [selectedRoundIndex, tab])

  return (
    <Paper sx={{ height: '100%' }}>
      <TabContext value={tab}>
        <TabList variant="fullWidth" textColor={color} indicatorColor={color} onChange={(_, v) => setTab(v)}>
          <Tab label="설정" value="settings" />
          <Tab label={selectedRoundIndex !== undefined ? '수정' : '기록'} value="record" />
          <Tab label="역사" value="history" />
        </TabList>
        <TabPanel value="settings">
          <SettingsTab />
        </TabPanel>
        <TabPanel value="record">
          <RecordTab />
        </TabPanel>
        <TabPanel value="history">Item Three</TabPanel>
      </TabContext>
    </Paper>
  )
}

export default Tabs
