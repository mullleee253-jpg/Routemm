'use client'
import { useState } from 'react'
import Auth from '@/components/Auth'
import MainApp from '@/components/MainApp'

export default function Home() {
  const [user, setUser] = useState<any>(null)

  return user ? <MainApp user={user} onLogout={() => setUser(null)} /> : <Auth onAuth={setUser} />
}
