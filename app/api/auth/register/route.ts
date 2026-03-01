import { NextResponse } from 'next/server'

// Простое хранилище пользователей (в продакшене использовать БД)
const users: any[] = []

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // Проверка существующего пользователя
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь уже существует' },
        { status: 400 }
      )
    }

    // Создание нового пользователя
    const user = {
      id: Date.now(),
      email,
      name,
      password, // В продакшене хешировать с bcrypt
      createdAt: new Date()
    }

    users.push(user)

    // Генерация токена (в продакшене использовать JWT)
    const token = Buffer.from(`${user.id}:${user.email}`).toString('base64')

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
      token
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка регистрации' },
      { status: 500 }
    )
  }
}
