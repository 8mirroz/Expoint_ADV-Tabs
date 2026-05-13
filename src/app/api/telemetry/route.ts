import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const head = await headers();
    const ip = head.get('x-forwarded-for') || head.get('x-real-ip') || 'unknown';
    const userAgent = head.get('user-agent') || 'unknown';

    // In production, we would send this to a DB (ClickHouse, Postgres) or an external collector
    console.log('[TELEMETRY]', {
      ip,
      userAgent,
      eventsCount: body.events?.length || 0,
      timestamp: new Date().toISOString(),
    });

    // Optionally log each event
    // body.events?.forEach((e: any) => console.log(' -> Event:', e.event, e.metadata));

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
