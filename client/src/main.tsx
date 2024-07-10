import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import './assets/index.css'

const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/smartsales" replace />
  },
  {
    path: '/smartsales',
    element: <LandingPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={ROUTER} />
  </React.StrictMode>,
)
