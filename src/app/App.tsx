import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import ExaminPanel from './components/ExaminPanel'

const App = () => {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#272839',
      },
      secondary: {
        light: '#0C4B40',
        main: '#C5F3D9',
      }
    }
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ExaminPanel />      
      </ThemeProvider>
    </div>
  )
}

export default App
