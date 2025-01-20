import React from 'react'

interface ComparisonResultsProps {
  originalText: string
  userInput: string
}

interface DiffResult {
  type: 'equal' | 'insert' | 'delete' | 'replace'
  value: string
}

/**
 * 最小修改距离算法 (Levenshtein Distance) 生成 diff
 */
function calculateDiff(original: string, input: string): DiffResult[] {
  const matrix: number[][] = []
  const originalWords = original.split('')
  const inputWords = input.split('')

  // 初始化矩阵
  for (let i = 0; i <= originalWords.length; i++) {
    matrix[i] = Array.from({ length: inputWords.length + 1 }).fill(0)
    matrix[i][0] = i // 删除成本
  }
  for (let j = 0; j <= inputWords.length; j++) {
    matrix[0][j] = j // 插入成本
  }

  // 填充矩阵
  for (let i = 1; i <= originalWords.length; i++) {
    for (let j = 1; j <= inputWords.length; j++) {
      if (originalWords[i - 1] === inputWords[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] // 无需操作
      }
      else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // 删除
          matrix[i][j - 1] + 1, // 插入
          matrix[i - 1][j - 1] + 1, // 替换
        )
      }
    }
  }

  // 回溯生成 diff 结果
  const diff: DiffResult[] = []
  let i = originalWords.length
  let j = inputWords.length

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && originalWords[i - 1] === inputWords[j - 1]) {
      diff.unshift({ type: 'equal', value: originalWords[i - 1] })
      i--
      j--
    }
    else if (i > 0 && (j === 0 || matrix[i][j] === matrix[i - 1][j] + 1)) {
      diff.unshift({ type: 'delete', value: originalWords[i - 1] })
      i--
    }
    else if (j > 0 && (i === 0 || matrix[i][j] === matrix[i][j - 1] + 1)) {
      diff.unshift({ type: 'insert', value: inputWords[j - 1] })
      j--
    }
    else {
      diff.unshift({
        type: 'replace',
        value: `${originalWords[i - 1]} -> ${inputWords[j - 1]}`,
      })
      i--
      j--
    }
  }

  return diff
}

/**
 * ComparisonResults 组件
 */
const ComparisonResults: React.FC<ComparisonResultsProps> = ({
  originalText,
  userInput,
}) => {
  const originalLines = originalText.trim().split('\n')
  const userLines = userInput.trim().split('\n')

  return (
    <div
      style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', background: 'beige', color: 'black' }}
    >
      <h3>Comparison Results:</h3>
      {originalLines.map((line, index) => {
        const userLine = userLines[index] || ''
        const diff = calculateDiff(line, userLine)

        return (
          <p key={index}>
            <strong>
              Line
              {index + 1}
              :
            </strong>
            {' '}
            {diff.map((part, i) => {
              switch (part.type) {
                case 'equal':
                  return (
                    <span key={i} style={{ color: 'black' }}>
                      {part.value}
                    </span>
                  )
                case 'insert':
                  return (
                    <span key={i} style={{ color: 'green' }}>
                      +
                      {part.value}
                    </span>
                  )
                case 'delete':
                  return (
                    <span key={i} style={{ color: 'red', textDecoration: 'line-through' }}>
                      {part.value}
                    </span>
                  )
                case 'replace':
                  return (
                    <span key={i} style={{ color: 'orange' }}>
                      {part.value}
                    </span>
                  )
                default:
                  return null
              }
            })}
          </p>
        )
      })}
    </div>
  )
}

export default ComparisonResults
