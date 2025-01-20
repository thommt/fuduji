import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'
import AudioUploader from './AudioUploader'
import RegionControls from './RegionControls'

interface AudioPlayerWithRegionsProps {
  waveColor: string // 波形颜色
  progressColor: string // 进度颜色
  regionColor: string // 区域颜色
}

const waveColorDefault = '#7C444F'
const progressColorDefault = '#E16A54'
const regionColorDefault = '#F39E60'

const AudioPlayerWithRegions: React.FC<AudioPlayerWithRegionsProps> = ({
  waveColor,
  progressColor,
  regionColor,
}) => {
  const [file, setFile] = useState<File | null>(null)
  const [loop, setLoop] = useState<boolean>(false)

  const waveformRef = useRef<HTMLDivElement | null>(null)
  const wavesurfer = useRef<WaveSurfer | null>(null)
  const regionRef = useRef<any>(null) // 保存区域引用
  const regionsPlugin = useRef(RegionsPlugin.create()) // 保存插件实例

  const loopRef = useRef<boolean>(loop) // 用于追踪最新的 loop 状态

  useEffect(() => {
    // 每次 loop 状态变化时更新 loopRef 的值
    loopRef.current = loop
  }, [loop])

  useEffect(() => {
    if (waveformRef.current && file) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: waveColor || waveColorDefault,
        progressColor: progressColor || progressColorDefault,
        plugins: [regionsPlugin.current],
        mediaControls: true,
        barWidth: 3,
        barGap: 1,
        cursorWidth: 1,
        cursorColor: regionColor || regionColorDefault,
      })

      const fileUrl = URL.createObjectURL(file)
      wavesurfer.current.load(fileUrl)

      // 添加区域
      wavesurfer.current.on('decode', () => {
        const region = regionsPlugin.current.addRegion({
          start: 0,
          end: 8,
          color: `${regionColor || regionColorDefault}80`,
          drag: true,
          resize: true,
        })
        regionRef.current = region
      })

      regionsPlugin.current.on('region-in', (region) => {
        regionRef.current = region
      })

      regionsPlugin.current.on('region-out', (region) => {
        // 使用最新的 loop 值
        if (regionRef.current === region && loopRef.current) {
          region.play()
        }
      })

      // 清理资源
      return () => {
        wavesurfer.current?.destroy()
      }
    }
  }, [file])

  // 动态更新波形颜色
  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setOptions({ waveColor, progressColor, cursorColor: regionColor })
    }
  }, [waveColor, progressColor])

  // 动态更新区域颜色
  useEffect(() => {
    // 保存旧区域范围并重新创建区域
    if (regionRef.current) {
      const { start, end } = regionRef.current
      createOrUpdateRegion(start, end, regionColor) // 使用新的颜色重建区域
    }
  }, [regionColor])

  const createOrUpdateRegion = (start: number, end: number, color: string) => {
    // 如果已存在区域，先删除
    // if (regionRef.current && regionRef.current.remove) {
    //     regionRef.current.remove();
    // }

    regionsPlugin.current.clearRegions()

    // 创建新区域
    const newRegion = regionsPlugin.current.addRegion({
      start,
      end,
      color: `${color}80`, // 设置区域颜色，带透明度
      drag: true,
      resize: true,
    })

    regionRef.current = newRegion // 更新区域引用
  }

  const handleKeyboardShortcuts = (event: KeyboardEvent) => {
    if (!wavesurfer.current || !event.altKey)
      return

    const currentTime = wavesurfer.current.getCurrentTime()
    const duration = wavesurfer.current.getDuration()

    switch (event.key) {
      case 'p': // Alt + P: 播放/暂停
        event.preventDefault()
        wavesurfer.current.playPause()
        break
      case 'ArrowRight': // Alt + →: 快进 5 秒
        event.preventDefault()
        wavesurfer.current.seekTo(Math.min((currentTime + 1) / duration, 1))

        break
      case 'ArrowLeft': // Alt + ←: 快退 5 秒
        event.preventDefault()
        wavesurfer.current.seekTo(Math.max((currentTime - 1) / duration, 0))

        break
      default:
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcuts)

    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcuts)
    }
  }, [])

  return (
    <div>

      {/* 上传文件 */}
      <AudioUploader onFileSelect={setFile} />

      {/* 波形显示 */}
      {file && (
        <>
          <div id="waveform" ref={waveformRef} style={{ width: '100%' }} />

          {/* <Waveform ref={waveformRef} file={file} loop={loop}/> */}
          <RegionControls loop={loop} onLoopChange={setLoop} />
        </>
      )}
    </div>
  )
}

export default AudioPlayerWithRegions
