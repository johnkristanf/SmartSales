import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import './assets/index.css'
import GraphsPage from './pages/GraphsPage'

const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/smartsales/analysis" replace />
  },
  {
    path: '/smartsales/analysis',
    element: <LandingPage />
  },

  {
    path: '/smartsales/graphs',
    element: <GraphsPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={ROUTER} />
  </React.StrictMode>,
)
