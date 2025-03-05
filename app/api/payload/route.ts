import { NextResponse } from 'next/server';
import payload from 'payload';
import { initPayload } from './initPayload';

let initialized = false;

export async function GET() {
  if (!initialized) {
    await initPayload();
    initialized = true;
  }

  const { res } = await payload.response({});

  return new NextResponse(res.body, {
    headers: res.headers,
    status: res.statusCode,
  });
}

export async function POST(req: Request) {
  if (!initialized) {
    await initPayload();
    initialized = true;
  }

  const { res } = await payload.response({
    req: {
      method: 'POST',
      body: await req.json(),
      headers: req.headers,
    },
  });

  return new NextResponse(res.body, {
    headers: res.headers,
    status: res.statusCode,
  });
}

export const dynamic = 'force-dynamic'; 