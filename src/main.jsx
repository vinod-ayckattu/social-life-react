import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import GlobalProvider from './context/GlobalProvider.jsx'   // <-- import provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>         {/* <-- wrap App */}
      <App />
    </GlobalProvider>
  </StrictMode>
)
