import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  App  from './App.tsx'
import './App.css'
//import Homepage from './homepage.tsx'
//import Footer from './component/footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  
  </StrictMode>,
)
