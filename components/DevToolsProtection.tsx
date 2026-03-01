'use client'
import { useEffect } from 'react'

export default function DevToolsProtection() {
  useEffect(() => {
    // Блокировка правой кнопки мыши
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Блокировка горячих клавиш
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault()
        return false
      }
      
      // Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        return false
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault()
        return false
      }
      
      // Ctrl+Shift+C (Inspect)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        return false
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        return false
      }
      
      // Ctrl+S (Save)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        return false
      }
    }

    // Обнаружение открытых DevTools
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      
      if (widthThreshold || heightThreshold) {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-size:2rem;color:#ff5252;">⚠️ Доступ запрещен</div>'
      }
    }

    // Защита от debugger
    const antiDebugger = () => {
      setInterval(() => {
        const before = new Date().getTime()
        debugger
        const after = new Date().getTime()
        if (after - before > 100) {
          document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-size:2rem;color:#ff5252;">⚠️ Доступ запрещен</div>'
        }
      }, 1000)
    }

    // Блокировка выделения текста
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Блокировка копирования
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('copy', handleCopy)
    
    // Проверка DevTools каждые 500мс
    const devToolsInterval = setInterval(detectDevTools, 500)
    
    // Запуск анти-дебаггера
    antiDebugger()

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('copy', handleCopy)
      clearInterval(devToolsInterval)
    }
  }, [])

  return null
}
