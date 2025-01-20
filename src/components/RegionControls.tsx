import React from 'react'

interface RegionControlsProps {
  loop: boolean
  onLoopChange: (loop: boolean) => void
}

const RegionControls: React.FC<RegionControlsProps> = ({ loop, onLoopChange }) => {
  return (
    <p>
      <label>
        <input
          type="checkbox"
          checked={loop}
          onChange={e => onLoopChange(e.target.checked)}
        />
        Loop region
      </label>
    </p>
  )
}

export default RegionControls
