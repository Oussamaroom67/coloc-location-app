import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//provider
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
