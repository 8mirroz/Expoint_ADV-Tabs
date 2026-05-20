import { NextResponse } from 'next/server';
import { submitOrder } from './actions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await submitOrder(body);

    return NextResponse.json(
      result,
      { status: result.success ? 200 : 500 }
    );
  } catch (error) {
    console.error('[API/Orders] Failed to process order:', error);
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
