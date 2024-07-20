import { Container, Grid, Stack } from '@mui/material'

import Table from './components/table'
import UmaTable from './components/table/UmaTable'
import Tabs from './components/tabs'

function App() {
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Table />
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2}>
            <UmaTable />
            <Tabs />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
