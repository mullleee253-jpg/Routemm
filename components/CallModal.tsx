'use client'
import { useState, useEffect } from 'react'
import styles from './CallModal.module.css'

export default function CallModal({ 
  contact, 
  onClose 
}: { 
  contact: any; 
  onClose: () => void 
}) {
  const [callStatus, setCallStatus] = useState<'calling' | 'connected' | 'ended'>('calling')
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  useEffect(() => {
    // Симуляция подключения через 2 секунды
    const connectTimer = setTimeout(() => {
      setCallStatus('connected')
    }, 2000)

    return () => clearTimeout(connectTimer)
  }, [])

  useEffect(() => {
    if (callStatus === 'connected') {
      const interval = setInterval(() => {
        setDuration(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [callStatus])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const endCall = () => {
    setCallStatus('ended')
    setTimeout(onClose, 1000)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.videoArea}>
          <div className={styles.remoteVideo}>
            <div className={styles.avatar}>{contact.name[0]}</div>
          </div>
          <div className={styles.localVideo}>
            <div className={styles.miniAvatar}>Вы</div>
          </div>
        </div>

        <div className={styles.info}>
          <h2 className={styles.name}>{contact.name}</h2>
          <p className={styles.status}>
            {callStatus === 'calling' && '📞 Звоним...'}
            {callStatus === 'connected' && `⏱️ ${formatDuration(duration)}`}
            {callStatus === 'ended' && '✓ Звонок завершен'}
          </p>
        </div>

        <div className={styles.controls}>
          <button 
            className={`${styles.controlBtn} ${isMuted ? styles.active : ''}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? '🔇' : '🎤'}
          </button>
          
          <button 
            className={`${styles.controlBtn} ${isVideoOff ? styles.active : ''}`}
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? '📹' : '📷'}
          </button>

          <button className={styles.endCallBtn} onClick={endCall}>
            📞
          </button>

          <button className={styles.controlBtn}>
            🔊
          </button>

          <button className={styles.controlBtn}>
            ⋮
          </button>
        </div>
      </div>
    </div>
  )
}
