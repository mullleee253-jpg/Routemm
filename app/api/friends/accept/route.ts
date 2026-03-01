import { NextResponse } from 'next/server'
import { users } from '@/lib/users'

export async function POST(request: Request) {
  try {
    const { userId, requestFromId } = await request.json()

    const user = users.find(u => u.id === userId)
    const friendUser = users.find(u => u.id === requestFromId)

    if (!user || !friendUser) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      )
    }

    // Удаление заявки
    user.friendRequests = user.friendRequests?.filter((req: any) => req.fromId !== requestFromId) || []

    // Добавление в друзья обоим
    if (!user.friends) user.friends = []
    if (!friendUser.friends) friendUser.friends = []
    
    user.friends.push(friendUser.id)
    friendUser.friends.push(user.id)

    return NextResponse.json({ 
      success: true,
      friends: user.friends,
      friendRequests: user.friendRequests
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка принятия заявки' },
      { status: 500 }
    )
  }
}
