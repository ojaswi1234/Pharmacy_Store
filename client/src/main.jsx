import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
import AppRoutes from './routes/route.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
