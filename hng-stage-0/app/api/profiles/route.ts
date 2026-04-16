import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Create this helper to avoid multiple instances
import { v7 as uuidv7 } from 'uuid';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ status: "error", message: "Missing or invalid name" }, { status: 400 });
    }

    // 1. Check if exists
    const existing = await prisma.profile.findUnique({ where: { name: name.toLowerCase() } });
    if (existing) {
      return NextResponse.json({ status: "success", message: "Profile already exists", data: existing }, { status: 201 });
    }

    // 2. Fetch from 3 APIs concurrently
    const [genRes, agiRes, natRes] = await Promise.all([
      fetch(`https://genderize.io{name}`),
      fetch(`https://agify.io{name}`),
      fetch(`https://nationalize.io{name}`)
    ]);

    const gen = await genRes.json();
    const agi = await agiRes.json();
    const nat = await natRes.json();

    // 3. Edge Case Validation
    if (!gen.gender || gen.count === 0) return error502("Genderize");
    if (agi.age === null) return error502("Agify");
    if (!nat.country || nat.country.length === 0) return error502("Nationalize");

    // 4. Classification Logic
    const age = agi.age;
    let ageGroup = "senior";
    if (age <= 12) ageGroup = "child";
    else if (age <= 19) ageGroup = "teenager";
    else if (age <= 59) ageGroup = "adult";

    const topCountry = nat.country.sort((a: any, b: any) => b.probability - a.probability)[0];

    // 5. Save to DB
    const newProfile = await prisma.profile.create({
      data: {
        id: uuidv7(),
        name: name.toLowerCase(),
        gender: gen.gender,
        gender_probability: gen.probability,
        sample_size: gen.count,
        age: age,
        age_group: ageGroup,
        country_id: topCountry.country_id,
        country_probability: topCountry.probability,
      }
    });

    return NextResponse.json({ status: "success", data: newProfile }, { status: 201 });

  } catch (e) {
    return NextResponse.json({ status: "error", message: "Server failure" }, { status: 500 });
  }
}

function error502(api: string) {
  return NextResponse.json({ status: "error", message: `${api} returned an invalid response` }, { status: 502 });
}



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get('gender');
  const country_id = searchParams.get('country_id');
  const age_group = searchParams.get('age_group');

  const profiles = await prisma.profile.findMany({
    where: {
      gender: gender ? { equals: gender.toLowerCase() } : undefined,
      country_id: country_id ? { equals: country_id.toUpperCase() } : undefined,
      age_group: age_group ? { equals: age_group.toLowerCase() } : undefined,
    }
  });

  return NextResponse.json({ status: "success", count: profiles.length, data: profiles });
}
