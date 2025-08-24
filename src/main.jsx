import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react';
import CounterContextProvider from './Context/Countercontext.jsx';
import AuthContextProvider from './Context/Authcontext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <HeroUIProvider>

      <CounterContextProvider>

        <AuthContextProvider>

          <QueryClientProvider client={queryClient}>

            <App />

            <ReactQueryDevtools/>

          </QueryClientProvider>

        </AuthContextProvider>

      </CounterContextProvider>

    </HeroUIProvider>

  </StrictMode>,
)
