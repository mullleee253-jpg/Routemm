'use client'
import { useState } from 'react'
import styles from './AddFriendModal.module.css'

export default function AddFriendModal({ 
  onClose, 
  onAdd 
}: { 
  onClose: () => void; 
  onAdd: (username: string) => void 
}) {
  const [username, setUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onAdd(username)
      setUsername('')
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Добавить друга</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.icon}>👤</div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Имя пользователя или ID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@username или ID"
              className={styles.input}
              autoFocus
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Отмена
            </button>
            <button type="submit" className={styles.addBtn}>
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
