import { NextRequest, NextResponse } from 'next/server';
import { getLiveFlightTrips } from '@/lib/travelpayouts-api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const origin = searchParams.get('origin') || 'TFS';
  const isResident = searchParams.get('resident') !== 'false';
  const destination = searchParams.get('destination') || undefined;
  const nights = Number(searchParams.get('nights')) || 3;
  const rawMonth = searchParams.get('month') || undefined;

  // Convert Spanish month names to YYYY-MM if needed
  let departMonth = rawMonth;
  if (rawMonth) {
    const monthMap: Record<string, string> = {
      'enero': '2027-01',
      'febrero': '2027-02',
      'marzo': '2027-03',
      'abril': '2027-04',
      'mayo': '2027-05',
      'junio': '2027-06',
      'julio': '2027-07',
      'agosto': '2027-08',
      'septiembre': '2026-09',
      'octubre': '2026-10',
      'noviembre': '2026-11',
      'diciembre': '2026-12',
    };
    const cleanMonth = rawMonth.toLowerCase().trim();
    if (monthMap[cleanMonth]) {
      departMonth = monthMap[cleanMonth];
    }
  }

  try {
    const liveTrips = await getLiveFlightTrips(origin, isResident, nights, departMonth);
    
    // If specific destination is requested
    const filtered = destination
      ? liveTrips.filter((t) => t.destination.city.toLowerCase().includes(destination.toLowerCase()) || t.outboundFlight.destination.code.toLowerCase() === destination.toLowerCase())
      : liveTrips;

    return NextResponse.json({
      success: true,
      count: filtered.length,
      origin: origin,
      data: filtered,
    });
  } catch (error) {
    console.error('API Flights Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch live flight trips' },
      { status: 500 }
    );
  }
}
