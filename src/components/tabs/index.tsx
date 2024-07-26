import { FC } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Paper, Tab } from '@mui/material'

import useTabs from '@/hooks/useTabs'

const Tabs: FC = () => {
  const { value, onChange, color, tabs } = useTabs()

  return (
    <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TabContext value={value}>
        <TabList variant="fullWidth" textColor={color} indicatorColor={color} onChange={onChange}>
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </TabList>
        {tabs.map(({ component: Component, value: tabValue }) => (
          <TabPanel
            key={tabValue}
            value={tabValue}
            sx={{
              flex: 1,
              flexDirection: 'column',
              display: tabValue === value ? 'flex' : 'none',
            }}
          >
            <Component />
          </TabPanel>
        ))}
      </TabContext>
    </Paper>
  )
}

export default Tabs
