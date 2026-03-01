'use client'
import { useState, useEffect } from 'react'
import styles from './Friends.module.css'
import AddFriendModal from './AddFriendModal'

export default function Friends({ user }: { user: any }) {
  const [friends, setFriends] = useState<any[]>([])
  const [friendRequests, setFriendRequests] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    // Загрузка заявок из user
    setFriendRequests(user.friendRequests || [])
  }, [user])

  const handleAddFriend = (username: string) => {
    // Заявка отправлена через API
  }

  const acceptRequest = async (requestFromId: number) => {
    try {
      const res = await fetch('/api/friends/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, requestFromId })
      })

      const data = await res.json()

      if (res.ok) {
        setFriendRequests(data.friendRequests)
        // Обновить список друзей
        alert('Заявка принята!')
      }
    } catch (error) {
      alert('Ошибка')
    }
  }

  const rejectRequest = async (requestFromId: number) => {
    try {
      const res = await fetch('/api/friends/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, requestFromId })
      })

      const data = await res.json()

      if (res.ok) {
        setFriendRequests(data.friendRequests)
      }
    } catch (error) {
      alert('Ошибка')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.addBtn}
          onClick={() => setShowAddModal(true)}
        >
          ➕ Добавить друга
        </button>
      </div>

      {friendRequests.length > 0 && (
        <div className={styles.requestsSection}>
          <h3 className={styles.sectionTitle}>Заявки в друзья ({friendRequests.length})</h3>
          {friendRequests.map((req: any) => (
            <div key={req.fromId} className={styles.requestItem}>
              <div className={styles.avatar}>{req.fromName[0]}</div>
              <div className={styles.requestInfo}>
                <div className={styles.name}>{req.fromName}</div>
                <div className={styles.username}>@{req.fromUsername}</div>
              </div>
              <div className={styles.requestActions}>
                <button 
                  className={styles.acceptBtn}
                  onClick={() => acceptRequest(req.fromId)}
                >
                  ✓
                </button>
                <button 
                  className={styles.rejectBtn}
                  onClick={() => rejectRequest(req.fromId)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.list}>
        {friends.length === 0 && friendRequests.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>👥</div>
            <p>У вас пока нет друзей</p>
            <button 
              className={styles.emptyBtn}
              onClick={() => setShowAddModal(true)}
            >
              Добавить первого друга
            </button>
          </div>
        ) : (
          friends.map(friend => (
            <div key={friend.id} className={styles.friendItem}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>{friend.name[0]}</div>
                {friend.online && <div className={styles.onlineIndicator} />}
              </div>
              
              <div className={styles.friendInfo}>
                <div className={styles.name}>{friend.name}</div>
                <div className={styles.status}>{friend.status}</div>
              </div>

              <div className={styles.actions}>
                <button className={styles.actionBtn}>💬</button>
                <button className={styles.actionBtn}>📞</button>
                <button className={styles.actionBtn}>⋮</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <AddFriendModal 
          onClose={() => setShowAddModal(false)} 
          onAdd={handleAddFriend}
          userId={user.id}
        />
      )}
    </div>
  )
}
