import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base/variables.css'
import './styles/base/reset.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
