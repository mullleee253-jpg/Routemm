import { NextResponse } from 'next/server'
import { users } from '@/lib/users'

export async function POST(request: Request) {
  try {
    const { email, password, name, username } = await request.json()

    // Проверка существующего email
    const existingEmail = users.find(u => u.email === email)
    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email уже используется' },
        { status: 400 }
      )
    }

    // Проверка существующего username
    const existingUsername = users.find(u => u.username === username)
    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username уже занят' },
        { status: 400 }
      )
    }

    // Создание нового пользователя
    const user = {
      id: Date.now(),
      email,
      name,
      username,
      password, // В продакшене хешировать с bcrypt
      friends: [],
      friendRequests: [],
      createdAt: new Date()
    }

    users.push(user)

    // Генерация токена
    const token = Buffer.from(`${user.id}:${user.email}`).toString('base64')

    return NextResponse.json({
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        username: user.username,
        friends: user.friends,
        friendRequests: user.friendRequests
      },
      token
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка регистрации' },
      { status: 500 }
    )
  }
}
