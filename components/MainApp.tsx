'use client'
import { useState } from 'react'
import styles from './MainApp.module.css'
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'
import Settings from './Settings'
import Calls from './Calls'
import Friends from './Friends'

type Tab = 'chats' | 'calls' | 'friends' | 'settings'

export default function MainApp({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('chats')
  const [selectedChat, setSelectedChat] = useState<any>(null)

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h2 className={styles.logo}>Routeem</h2>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{user.name?.[0] || 'U'}</div>
            <span>{user.name}</span>
          </div>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'chats' ? styles.active : ''}`}
            onClick={() => setActiveTab('chats')}
          >
            💬 Чаты
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'calls' ? styles.active : ''}`}
            onClick={() => setActiveTab('calls')}
          >
            📞 Звонки
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'friends' ? styles.active : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            👥 Друзья
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Настройки
          </button>
        </div>

        {activeTab === 'chats' && <ChatList onSelectChat={setSelectedChat} />}
        {activeTab === 'calls' && <Calls />}
        {activeTab === 'friends' && <Friends user={user} />}
        {activeTab === 'settings' && <Settings user={user} onLogout={onLogout} />}
      </div>

      <div className={styles.main}>
        {activeTab === 'chats' && selectedChat ? (
          <ChatWindow chat={selectedChat} user={user} />
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>💬</div>
            <p>Выберите чат для начала общения</p>
          </div>
        )}
      </div>
    </div>
  )
}
