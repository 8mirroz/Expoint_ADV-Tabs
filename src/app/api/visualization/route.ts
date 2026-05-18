import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

interface VisualizationRequest {
  cartItemId: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  text?: string;
  widthMm?: number;
  heightMm?: number;
  depthMm?: number;
  hasFacadePhoto?: boolean;
  facadePhotoUrl?: string;
}

// POST /api/visualization/request
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as VisualizationRequest;

    if (!body.cartItemId || !body.name) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const visualizationId = `viz_${Date.now()}`;

    await new Promise((resolve) => setTimeout(resolve, 50));

    return NextResponse.json({
      success: true,
      visualizationId,
      message: 'Визуализация поставлена в очередь. Ожидайте 15-30 минут.',
      status: 'queued-manual-assist',
      estimatedReadyAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    });
  } catch (error) {
    console.error('Visualization request error:', error);
    return NextResponse.json({ success: false, message: 'Server error during visualization request' }, { status: 500 });
  }
}

// GET /api/visualization/status/[visualizationId]
export async function GET(_request: NextRequest, context: { params: Promise<{ visualizationId?: string }> }) {
  const { visualizationId } = await context.params;

  if (!visualizationId) {
    return NextResponse.json({ success: false, message: 'Missing visualizationId' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    visualizationId,
    status: 'queued-manual-assist',
    progress: 0,
  });
}