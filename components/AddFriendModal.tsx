'use client'
import { useState } from 'react'
import styles from './AddFriendModal.module.css'

export default function AddFriendModal({ 
  onClose, 
  onAdd,
  userId
}: { 
  onClose: () => void; 
  onAdd: (username: string) => void;
  userId: number
}) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/friends/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromUserId: userId, toUsername: username })
      })

      const data = await res.json()

      if (res.ok) {
        alert('Заявка отправлена!')
        onAdd(username)
        setUsername('')
        onClose()
      } else {
        alert(data.error || 'Ошибка отправки заявки')
      }
    } catch (error) {
      alert('Ошибка подключения')
    } finally {
      setLoading(false)
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
            <label className={styles.label}>Username пользователя</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className={styles.input}
              autoFocus
              disabled={loading}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn} disabled={loading}>
              Отмена
            </button>
            <button type="submit" className={styles.addBtn} disabled={loading}>
              {loading ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
