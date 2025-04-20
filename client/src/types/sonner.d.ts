// src/types/sonner.d.ts
import { ToastPromise } from 'sonner'

declare module 'sonner' {
  interface ToastOptions {
    /**
     * Custom metadata for analytics tracking
     */
    analytics?: {
      event: string
      payload: Record<string, unknown>
    }
    /**
     * Priority level for queuing system
     */
    priority?: 'low' | 'normal' | 'high'
  }

  interface ToastPromise {
    /**
     * Custom loading spinner component
     */
    useCustomLoader?: boolean
    /**
     * Audit log configuration
     */
    auditLog?: {
      action: string
      entityId: string
    }
  }
}