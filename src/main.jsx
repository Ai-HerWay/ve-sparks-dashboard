import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import VESkillsDashboard from './VESkillsDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VESkillsDashboard />
  </StrictMode>,
)
