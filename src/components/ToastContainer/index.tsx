import React from 'react'
import { createPortal } from 'react-dom'
import { useTransition } from 'react-spring'

import Toast, { ToastMessage } from '../Toast'

import { Container } from './styles'

interface ToastContainerProps {
  toasts: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const transitions = useTransition(toasts, toast => toast.id, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' },
    config: {
      duration: 200
    }
  })

  return createPortal(
    <Container>
      {transitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} toast={item} />
      ))}
    </Container>,
    document.body
  )
}

export default ToastContainer
