import React, { useEffect, useRef } from 'react'

interface TextInputProps {
  value: string
  onChange: (input: string) => void
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null) // 输入框引用

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  const handleKeyboardShortcuts = (event: KeyboardEvent) => {
    if (!inputRef.current)
      return

    if (event.key === 'f2' || (event.altKey && event.key === 'i'))
      event.preventDefault()
    inputRef.current?.focus() // 定位到输入框
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcuts)

    return () => {
      window.removeEventListener('keydown', handleKeyboardShortcuts)
    }
  }, [])

  return (
    <div style={{ marginTop: '20px' }}>
      <label htmlFor="user-input" style={{ display: 'block', marginBottom: '10px' }}>
        Your Input:
      </label>
      <textarea
        id="user-input"
        value={value}
        onChange={handleInputChange}
        ref={inputRef}
        style={{
          width: '100%',
          height: '150px',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
        }}
      />
    </div>
  )
}

export default TextInput
