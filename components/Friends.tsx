'use client'
import { useState } from 'react'
import styles from './Friends.module.css'
import AddFriendModal from './AddFriendModal'

export default function Friends() {
  const [friends, setFriends] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)

  const handleAddFriend = (username: string) => {
    const newFriend = {
      id: Date.now(),
      name: username,
      status: 'в сети',
      online: true
    }
    setFriends([...friends, newFriend])
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

      <div className={styles.list}>
        {friends.length === 0 ? (
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
        />
      )}
    </div>
  )
}
