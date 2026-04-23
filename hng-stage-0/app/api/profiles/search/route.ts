import { NextResponse } from 'next/server';
import { parseNaturalLanguage } from '@/lib/nlp-parser';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const corsHeaders = { 'Access-Control-Allow-Origin': '*' };

  if (!q) return NextResponse.json({ status: "error", message: "Missing or empty parameter" }, { status: 400, headers: corsHeaders });

  const filters = parseNaturalLanguage(q);
  if (!filters) {
    return NextResponse.json({ status: "error", message: "Unable to interpret query" }, { status: 400, headers: corsHeaders });
  }

  // Build the filtered query string
  const baseUrl = new URL(request.url).origin;
  const queryParams = new URLSearchParams(filters);
  
  // Forward pagination if provided
  if (searchParams.get('page')) queryParams.set('page', searchParams.get('page')!);
  if (searchParams.get('limit')) queryParams.set('limit', searchParams.get('limit')!);

  // Call the main internal endpoint
  const res = await fetch(`${baseUrl}/api/profiles?${queryParams.toString()}`);
  const result = await res.json();

  return NextResponse.json(result, { headers: corsHeaders });
}
