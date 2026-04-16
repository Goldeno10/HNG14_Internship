import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Create this helper to avoid multiple instances

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const profile = await prisma.profile.findUnique({ where: { id: params.id } });
  if (!profile) return NextResponse.json({ status: "error", message: "Profile not found" }, { status: 404 });
  return NextResponse.json({ status: "success", data: profile });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.profile.delete({ where: { id: params.id } });
    return new Response(null, { status: 204 });
  } catch {
    return NextResponse.json({ status: "error", message: "Profile not found" }, { status: 404 });
  }
}
