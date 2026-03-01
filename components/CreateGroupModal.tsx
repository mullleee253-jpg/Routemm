'use client'
import { useState } from 'react'
import styles from './CreateGroupModal.module.css'

type ModalType = 'group' | 'channel' | null

export default function CreateGroupModal({ 
  type, 
  onClose, 
  onCreate 
}: { 
  type: ModalType; 
  onClose: () => void; 
  onCreate: (name: string, type: string) => void 
}) {
  const [name, setName] = useState('')

  if (!type) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onCreate(name, type)
      setName('')
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{type === 'group' ? 'Создание группы' : 'Создание канала'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarPlaceholder}>
              {type === 'group' ? '👥' : '📢'}
            </div>
            <button type="button" className={styles.uploadBtn}>
              Загрузить фото
            </button>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              {type === 'group' ? 'Название группы' : 'Название канала'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={type === 'group' ? 'Моя группа' : 'Мой канал'}
              className={styles.input}
              autoFocus
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Отмена
            </button>
            <button type="submit" className={styles.createBtn}>
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
