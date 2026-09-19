import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { useStore } from './store'

if (import.meta.env.DEV) Object.assign(window, { __store: useStore }) // dev-only test handle

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
