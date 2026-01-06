import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/register?error=NoToken', request.url));
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/confirm-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  if (response.ok) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    const data = await response.json();
    const error = data.error || 'Confirmation failed';
    return NextResponse.redirect(new URL(`/register?error=${encodeURIComponent(error)}`, request.url));
  }
}