import { Redis } from '@upstash/redis';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
// import { logRequest } from '@/lib/logger'

const redis = Redis.fromEnv();
const corsHeaders = { 'Access-Control-Allow-Origin': '*' };

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // const profile = await redis.get(`profile:data:${id}`);
  const profile = await prisma.profile.findFirst({ where: { id } });
  const startTime = Date.now();

  if (!profile) {
    // await logRequest('GET', `/api/profiles/${id}`, 404, startTime);
    return NextResponse.json({ status: "error", message: "Profile not found" }, { status: 404, headers: corsHeaders });
  }
  // await logRequest('GET', `/api/profiles/${id}`, 200, startTime);
  return NextResponse.json({ status: "success", data: profile }, { headers: corsHeaders });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile: any = await prisma.profile.findFirst({ where: { id } });
  const startTime = Date.now();
  if (!profile) {
    // await logRequest('DELETE', `/api/profiles/${id}`, 404, startTime);
    return NextResponse.json({ status: "error", message: "Profile not found" }, { status: 404, headers: corsHeaders });
  }
  // await logRequest('DELETE', `/api/profiles/${id}`, 200, startTime);

  await prisma.profile.delete({ where: { id } });

  return new Response(null, { status: 204, headers: corsHeaders });
}
