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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
