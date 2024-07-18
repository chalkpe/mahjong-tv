import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

import '@fontsource/noto-sans-kr/300.css'
import '@fontsource/noto-sans-kr/400.css'
import '@fontsource/noto-sans-kr/500.css'
import '@fontsource/noto-sans-kr/700.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: red[600],
    },
  },
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif",
  },
})

export default theme
