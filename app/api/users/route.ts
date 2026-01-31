import { NextResponse } from 'next/server';
import usersData from '@/lib/data/users.json';
import type { User } from '@/lib/interfaces';

const users = usersData as User[];

export async function GET() {
  try {
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Fail' }, { status: 500 });
  }
}