import { toast } from "sonner"
import { ReactElement, ReactNode } from "react"
import { ToastConfig } from "../providers/ToastProvider"

export const useToast = () => {
  const show = (title: ReactNode, config?: ToastConfig) => {
    const { type = 'default', ...rest } = config || {}

    const baseOptions: ToastConfig = {
      duration: 5000,
      position: 'top-right',
      ...rest
    }

    switch (type) {
      case 'success':
        return toast.success(title, baseOptions)
      case 'error':
        return toast.error(title, baseOptions)
      case 'warning':
        return toast.warning(title, baseOptions)
      case 'info':
        return toast.info(title, baseOptions)
      default:
        return toast(title, baseOptions)
    }
  }

  return {
    toast: {
      show,
      dismiss: toast.dismiss,
      loading: toast.loading,
      promise: toast.promise,
      custom: (content: ReactNode) => toast.custom(()=> content as ReactElement)
    }
  }
}