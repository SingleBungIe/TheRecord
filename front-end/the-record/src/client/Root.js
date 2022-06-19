import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@mui/material/styles'
import App from '../App'
import Login from '../pages/User/Login'
import SignUp from '../pages/User/SignUp'
import '../styles/common/app.css'
import '../styles/common/background.css'
import store from '../store'

const persistor = persistStore(store)
const theme = createMuiTheme()

function RootRouter() {
  const location = useLocation()
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {location.pathname !== '/' && location.pathname !== '/signup' && (
        <Route path="/*" element={<App />} />
      )}
    </Routes>
  )
}

function Root() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootRouter />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Root
