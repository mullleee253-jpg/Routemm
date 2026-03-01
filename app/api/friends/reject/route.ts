import { NextResponse } from 'next/server'
import { users } from '../../auth/register/route'

export async function POST(request: Request) {
  try {
    const { userId, requestFromId } = await request.json()

    const user = users.find(u => u.id === userId)

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      )
    }

    // Удаление заявки
    user.friendRequests = user.friendRequests?.filter((req: any) => req.fromId !== requestFromId) || []

    return NextResponse.json({ 
      success: true,
      friendRequests: user.friendRequests
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка отклонения заявки' },
      { status: 500 }
    )
  }
}
