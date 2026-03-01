'use client'
import { useState } from 'react'
import styles from './Calls.module.css'
import CallModal from './CallModal'

export default function Calls() {
  const [calls] = useState<any[]>([])
  const [activeCall, setActiveCall] = useState<any>(null)

  const startCall = (contact: any) => {
    setActiveCall(contact)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.newCallBtn}>
          📞 Новый звонок
        </button>
      </div>

      <div className={styles.list}>
        {calls.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📞</div>
            <p>История звонков пуста</p>
          </div>
        ) : (
          calls.map(call => (
            <div key={call.id} className={styles.callItem}>
              <div className={styles.avatar}>{call.name[0]}</div>
              
              <div className={styles.callInfo}>
                <div className={styles.name}>{call.name}</div>
                <div className={styles.details}>
                  <span className={`${styles.icon} ${call.missed ? styles.missed : ''}`}>
                    {call.type === 'incoming' ? '📥' : '📤'}
                  </span>
                  <span className={styles.time}>{call.time}</span>
                  {!call.missed && (
                    <span className={styles.duration}> • {call.duration}</span>
                  )}
                  {call.missed && (
                    <span className={styles.missedText}> • Пропущенный</span>
                  )}
                </div>
              </div>

              <button 
                className={styles.callBtn}
                onClick={() => startCall(call)}
              >
                📞
              </button>
            </div>
          ))
        )}
      </div>

      {activeCall && (
        <CallModal 
          contact={activeCall} 
          onClose={() => setActiveCall(null)} 
        />
      )}
    </div>
  )
}
