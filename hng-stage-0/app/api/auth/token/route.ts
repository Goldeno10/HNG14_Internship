import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { code, code_verifier } = await request.json();

  // In a real-world PKCE flow:
  // 1. Verify that code_verifier matches the code_challenge stored earlier
  // (You'd store the challenge in Redis keyed by a state parameter)

  // 2. Exchange code for GitHub info (similar to your callback logic)
  // ... (fetch github token, then github user) ...

  // 3. Generate tokens
  const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '3m' });
  const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET!, { expiresIn: '5m' });

  return NextResponse.json({
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: 180
  });
}
