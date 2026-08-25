import { NextRequest, NextResponse } from 'next/server';
import { getLiveFlightTrips } from '@/lib/travelpayouts-api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const origin = searchParams.get('origin') || 'TFS';
  const isResident = searchParams.get('resident') !== 'false';
  const destination = searchParams.get('destination') || undefined;
  const nights = Number(searchParams.get('nights')) || 3;

  try {
    const liveTrips = await getLiveFlightTrips(origin, isResident, nights);
    
    // If specific destination is requested
    const filtered = destination
      ? liveTrips.filter((t) => t.destination.city.toLowerCase().includes(destination.toLowerCase()) || t.outboundFlight.destination.code.toLowerCase() === destination.toLowerCase())
      : liveTrips;

    return NextResponse.json({
      success: true,
      count: filtered.length,
      origin: origin,
      source: filtered.length > 0 ? 'live' : 'empty',
      data: filtered,
    });
  } catch (error) {
    console.error('API Flights Error:', error);
    return NextResponse.json(
      { success: false, source: 'empty', error: 'Failed to fetch live flight trips' },
      { status: 500 }
    );
  }
}
