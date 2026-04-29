import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ status: "error", message: "Code parameter missing" }, { status: 400 });
  }

  // Purely redirect back to the local CLI server holding the verifier
  return NextResponse.redirect(`http://localhost:4800?code=${code}`);
}




// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import jwt from 'jsonwebtoken';
// import { v7 as uuidv7 } from 'uuid';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const code = searchParams.get('code');

//     // Extract and decode the verifier back to its valid RFC 7636 format
//   const raw_verifier = searchParams.get('code_verifier'); 
//   const code_verifier = raw_verifier ? decodeURIComponent(raw_verifier) : undefined;



//   if (!code) {
//     return NextResponse.json({ status: "error", message: "Code parameter missing" }, { status: 400 });
//   }

//   try {
//     // 1. Exchange code for GitHub Access Token
//     // Fixed: Pointed to the actual GitHub OAuth endpoint
//     const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json', 
//         'Accept': 'application/json' 
//       },
//       body: JSON.stringify({
//         client_id: process.env.GITHUB_CLIENT_ID,
//         client_secret: process.env.GITHUB_CLIENT_SECRET,
//         code,
//         code_verifier, // Include PKCE code verifier
//       }),
//     });

//     const responseText = await tokenRes.text();
    
//     let tokenData;
//     try {
//       tokenData = JSON.parse(responseText);
//     } catch (e) {
//       console.error("GitHub didn't return JSON. It returned HTML:", responseText);
//       return NextResponse.json({ status: "error", message: "Failed to parse GitHub response" }, { status: 500 });
//     }

//     if (tokenData.error) {
//       return NextResponse.json({ status: "error", message: tokenData.error_description }, { status: 400 });
//     }

//     // 2. Fetch User Info from GitHub
//     // Fixed: Pointed to the correct GitHub users API
//     const userRes = await fetch('https://api.github.com/user', {
//       headers: { Authorization: `Bearer ${tokenData.access_token}` },
//     });
    
//     if (!userRes.ok) {
//       return NextResponse.json({ status: "error", message: "Failed to fetch user from GitHub" }, { status: 500 });
//     }
    
//     const ghUser = await userRes.json();

//     // 3. Upsert User in Database
//     const user = await prisma.user.upsert({
//       where: { github_id: ghUser.id.toString() },
//       update: { last_login_at: new Date() },
//       create: {
//         id: uuidv7(),
//         github_id: ghUser.id.toString(),
//         username: ghUser.login,
//         email: ghUser.email,
//         avatar_url: ghUser.avatar_url,
//         role: 'analyst', // Default role
//       },
//     });

//     // 4. Issue Access & Refresh Tokens
//     const accessToken = jwt.sign(
//       { userId: user.id, role: user.role }, 
//       process.env.JWT_SECRET!, 
//       { expiresIn: '3m' }
//     );
    
//     const refreshToken = jwt.sign(
//       { userId: user.id }, 
//       process.env.REFRESH_SECRET!, 
//       { expiresIn: '5m' }
//     );

//     // Return successful response
//     return NextResponse.json({
//       status: "success",
//       access_token: accessToken,
//       refresh_token: refreshToken
//     });

//   } catch (error) {
//     console.error("OAuth Callback Error:", error);
//     return NextResponse.json({ status: "error", message: "Internal server failure" }, { status: 500 });
//   }
// }
