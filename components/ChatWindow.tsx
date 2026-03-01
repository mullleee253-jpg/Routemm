'use client'
import { useState, useEffect, useRef } from 'react'
import styles from './ChatWindow.module.css'

export default function ChatWindow({ chat, user }: { chat: any; user: any }) {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: user.name,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.chatInfo}>
          <div className={styles.avatar}>{chat.name[0]}</div>
          <div>
            <div className={styles.name}>{chat.name}</div>
            <div className={styles.status}>{chat.online ? 'в сети' : 'был(а) недавно'}</div>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.iconBtn}>🔍</button>
          <button className={styles.iconBtn}>📞</button>
          <button className={styles.iconBtn}>⋮</button>
        </div>
      </div>

      <div className={styles.messages}>
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`${styles.message} ${msg.isMine ? styles.mine : styles.theirs}`}
          >
            <div className={styles.bubble}>
              <div className={styles.text}>{msg.text}</div>
              <div className={styles.time}>{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className={styles.inputArea}>
        <button type="button" className={styles.attachBtn}>📎</button>
        <input
          type="text"
          placeholder="Написать сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.sendBtn}>
          ➤
        </button>
      </form>
    </div>
  )
}
