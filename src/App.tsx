import { Container, Grid } from '@mui/material'
import Table from './components/table'
import Tabs from './components/tabs'

function App() {
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Table />
        </Grid>
        <Grid item xs={4}>
          <Tabs />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
