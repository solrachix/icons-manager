import React, { useEffect, useState } from 'react'

import { SketchPicker } from 'react-color'
import { Container } from './styles'

interface PickerColorProps {
  color: string
  onChange(color: any): void
}

function PickerColor ({
  color,
  onChange
}: PickerColorProps): React.ReactElement {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // window.addEventListener('click', function (e) {
    //   if (
    //     !document.getElementsByClassName('picker-color')[0]?.contains(e.target)
    //   ) {
    //     setOpen(!open)
    //   }
    // })
  }, [])

  return (
    <Container>
      <button
        className="picker-button"
        style={{ borderColor: color, color }}
        onClick={() => setOpen(!open)}
      >
        {color}
      </button>

      {open && (
        <div className="overlay" onClick={() => setOpen(!open)}>
          <div className="picker-color" onClick={(e) => e.stopPropagation()}>
            <SketchPicker color={color} onChangeComplete={onChange} />
          </div>
        </div>
      )}
    </Container>
  )
}

export default PickerColor
