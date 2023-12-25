import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

export const Providers: React.ComponentType<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  )
}
