import { NextResponse } from 'next/server'
import { users } from '@/lib/users'

export async function POST(request: Request) {
  try {
    const { fromUserId, toUsername } = await request.json()

    const fromUser = users.find(u => u.id === fromUserId)
    const toUser = users.find(u => u.username === toUsername)

    if (!toUser) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      )
    }

    if (fromUser.id === toUser.id) {
      return NextResponse.json(
        { error: 'Нельзя добавить себя в друзья' },
        { status: 400 }
      )
    }

    // Проверка, не отправлена ли уже заявка
    if (toUser.friendRequests?.some((req: any) => req.fromId === fromUserId)) {
      return NextResponse.json(
        { error: 'Заявка уже отправлена' },
        { status: 400 }
      )
    }

    // Проверка, не друзья ли уже
    if (fromUser.friends?.includes(toUser.id)) {
      return NextResponse.json(
        { error: 'Уже в друзьях' },
        { status: 400 }
      )
    }

    // Добавление заявки
    if (!toUser.friendRequests) toUser.friendRequests = []
    toUser.friendRequests.push({
      fromId: fromUser.id,
      fromName: fromUser.name,
      fromUsername: fromUser.username,
      timestamp: Date.now()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка отправки заявки' },
      { status: 500 }
    )
  }
}
