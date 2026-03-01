'use client'
import { useState, useEffect } from 'react'
import styles from './ChatList.module.css'
import CreateGroupModal from './CreateGroupModal'

type ModalType = 'group' | 'channel' | null

export default function ChatList({ onSelectChat }: { onSelectChat: (chat: any) => void }) {
  const [chats, setChats] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [showCreateMenu, setShowCreateMenu] = useState(false)
  const [modalType, setModalType] = useState<ModalType>(null)

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(search.toLowerCase())
  )

  const createGroup = () => {
    setModalType('group')
    setShowCreateMenu(false)
  }

  const createChannel = () => {
    setModalType('channel')
    setShowCreateMenu(false)
  }

  const handleCreate = (name: string, type: string) => {
    const newChat = {
      id: Date.now(),
      name,
      lastMessage: type === 'group' ? 'Группа создана' : 'Канал создан',
      time: 'Сейчас',
      unread: 0,
      online: false,
      type
    }
    setChats([newChat, ...chats])
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="🔍 Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
        <div className={styles.createWrapper}>
          <button 
            className={styles.createBtn}
            onClick={() => setShowCreateMenu(!showCreateMenu)}
          >
            ✏️
          </button>
          {showCreateMenu && (
            <div className={styles.createMenu}>
              <button onClick={createGroup} className={styles.menuItem}>
                👥 Создать группу
              </button>
              <button onClick={createChannel} className={styles.menuItem}>
                📢 Создать канал
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.list}>
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            className={styles.chatItem}
            onClick={() => onSelectChat(chat)}
          >
            <div className={styles.avatarWrapper}>
              <div className={styles.chatAvatar}>{chat.name[0]}</div>
              {chat.online && <div className={styles.onlineIndicator} />}
            </div>
            
            <div className={styles.chatInfo}>
              <div className={styles.chatHeader}>
                <span className={styles.chatName}>{chat.name}</span>
                <span className={styles.chatTime}>{chat.time}</span>
              </div>
              <div className={styles.chatFooter}>
                <span className={styles.lastMessage}>{chat.lastMessage}</span>
                {chat.unread > 0 && (
                  <span className={styles.unread}>{chat.unread}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateGroupModal 
        type={modalType} 
        onClose={() => setModalType(null)} 
        onCreate={handleCreate}
      />
    </div>
  )
}
