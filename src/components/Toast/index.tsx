import React, { useEffect, useCallback } from 'react'
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle
} from 'react-icons/fi'
import { useWindow } from '../../context/window'

import { Container } from './styles'

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage;
  style: any;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />
}

const Toast: React.FC<ToastProps> = ({ toast, style }) => {
  const { removeToast } = useWindow().Toast

  const closeToast = useCallback(() => removeToast(toast.id), [
    removeToast,
    toast.id
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast()
    }, 4000)

    return (): void => {
      clearTimeout(timer)
    }
  }, [closeToast])

  return (
    <Container
      type={toast.type}
      hasDescription={!!toast.description}
      style={style}
    >
      {icons[toast.type]}

      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>

      <button type="button" onClick={closeToast}>
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}

export default Toast
