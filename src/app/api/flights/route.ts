import { NextRequest, NextResponse } from 'next/server';
import { getLiveFlightPrices } from '@/lib/travelpayouts-api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const origin = searchParams.get('origin') || 'TFS';
  const destination = searchParams.get('destination') || undefined;
  const departDate = searchParams.get('departDate') || undefined;
  const returnDate = searchParams.get('returnDate') || undefined;

  try {
    const liveFlights = await getLiveFlightPrices(origin, destination, departDate, returnDate);
    return NextResponse.json({
      success: true,
      count: liveFlights.length,
      data: liveFlights,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch flight prices' },
      { status: 500 }
    );
  }
}
