import { Toaster } from 'sonner'
import { ReactNode } from 'react'

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

export interface ToastConfig {
  type?: ToastType
  duration?: number
  position?: 'top-center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  description?: ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  icon?: ReactNode
}

export interface ToastProviderProps {
  children: ReactNode
  position?: ToastConfig['position']
  theme?: 'light' | 'dark' | 'system'
  duration?: number
}

export const ToastProvider = ({
  children,
  position = 'top-right',
  theme = 'light',
  duration = 5000
}: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster
        position={position}
        theme={theme}
        duration={duration}
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: '!font-sans !text-sm !rounded-lg !shadow-lg',
            title: '!font-medium',
            description: '!text-opacity-80',
            actionButton: '!bg-primary !text-white',
            cancelButton: '!bg-error !text-white'
          }
        }}
      />
    </>
  )
}