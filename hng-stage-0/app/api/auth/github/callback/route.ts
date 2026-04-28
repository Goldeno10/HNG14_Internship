import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { v7 as uuidv7 } from 'uuid';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const code_verifier = searchParams.get('code_verifier'); // PKCE check

  // 1. Exchange code for GitHub Access Token
  const tokenRes = await fetch('https://github.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const tokenData = await tokenRes.json();

  // 2. Fetch User Info from GitHub
  const userRes = await fetch('https://github.com', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const ghUser = await userRes.json();

  // 3. Upsert User in Database
  const user = await prisma.user.upsert({
    where: { github_id: ghUser.id.toString() },
    update: { last_login_at: new Date() },
    create: {
      id: uuidv7(),
      github_id: ghUser.id.toString(),
      username: ghUser.login,
      email: ghUser.email,
      avatar_url: ghUser.avatar_url,
      role: 'analyst', // Default role
    },
  });

  // 4. Issue Access & Refresh Tokens
  const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '3m' });
  const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_SECRET!, { expiresIn: '5m' });

  // Store refresh token in Redis (Stage 1 logic) or DB for invalidation
  // Response depends on if it's CLI or Web (Web uses cookies, CLI uses JSON)
  return NextResponse.json({
    status: "success",
    access_token: accessToken,
    refresh_token: refreshToken
  });
}
