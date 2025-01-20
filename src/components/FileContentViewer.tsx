import React from 'react'

interface FileContentViewerProps {
  content: string
}

const FileContentViewer: React.FC<FileContentViewerProps> = ({ content }) => {
  return (
    <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
      <h3>File Content:</h3>
      <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{content}</div>
    </div>
  )
}

export default FileContentViewer
