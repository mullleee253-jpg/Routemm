import { NextResponse } from 'next/server'
import { users } from '../register/route'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Поиск пользователя
    const user = users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      )
    }

    // Генерация токена
    const token = Buffer.from(`${user.id}:${user.email}`).toString('base64')

    return NextResponse.json({
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        username: user.username,
        friends: user.friends || [],
        friendRequests: user.friendRequests || []
      },
      token
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка входа' },
      { status: 500 }
    )
  }
}
