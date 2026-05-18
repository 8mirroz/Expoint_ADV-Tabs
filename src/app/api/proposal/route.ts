import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { CapabilityState } from '@/store/useSalesEngineStore';
import type { CalculatorHandoffAsset, HandoffRequirement, HandoffStatus } from '@/components/calculator/calculator.types';

interface ProposalRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    metadata?: Record<string, unknown>;
  }>;
  total: number;
  projectBrief?: string;
  capabilities?: CapabilityState[];
  handoffAssets?: CalculatorHandoffAsset[];
  handoffRequirements?: HandoffRequirement[];
  handoffStatus?: HandoffStatus;
}

// POST /api/proposal/generate
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ProposalRequest;

    if (!body.items?.length || !body.name) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const proposalId = `prop_${Date.now()}`;
    const pdfUrl = `/api/proposal/download/${proposalId}`;

    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      proposalId,
      pdfUrl,
      message: 'PDF proposal generated and queued for operator review',
      status: 'queued-manual-assist',
    });
  } catch (error) {
    console.error('Proposal generation error:', error);
    return NextResponse.json({ success: false, message: 'Server error during proposal generation' }, { status: 500 });
  }
}

// GET /api/proposal/download/[proposalId]
export async function GET(_request: NextRequest, context: { params: Promise<{ proposalId?: string }> }) {
  const { proposalId } = await context.params;

  if (!proposalId) {
    return NextResponse.json({ success: false, message: 'Missing proposalId' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    pdfUrl: `/proposals/${proposalId}.pdf`,
    message: 'PDF ready for download',
  });
}
