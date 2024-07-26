import { Container, Grid, Stack } from '@mui/material'

import RoundTable from '~/table/RoundTable'
import UmaTable from '~/table/UmaTable'
import Tabs from '~/tabs'

import theme from '@/theme'

function App() {
  return (
    <Container maxWidth="xl" sx={{ mt: 2, minHeight: '100vh' }}>
      <Grid container spacing={2} sx={{ minHeight: '100vh' }}>
        <Grid item xs={8}>
          <RoundTable />
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2} sx={{ minHeight: `calc(100vh - ${theme.spacing(4)})` }}>
            <UmaTable />
            <Tabs />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
