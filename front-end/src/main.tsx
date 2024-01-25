import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ProductDetails from './components/ProductDetails.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,

} from 'react-router-dom';
import HomeContent from './components/HomeContent.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'


const theme = createTheme({
  palette: {
    primary: {
      main: '#70e000'
    }
  },
  components: {
    'MuiButton': {
      'defaultProps': {
        sx: {
          fontWeight: 700
        }
      }
      
    }
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/product/:id',
        element: <ProductDetails />
      },
      {
        path: '',
        element: <HomeContent />
      }, 
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
