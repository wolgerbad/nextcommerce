import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const user = await sql`SELECT * FROM "user" WHERE id = ${id}`;

    if (!user) {
      return NextResponse.json(
        { error: 'You have no user to look at.' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const { address, national_id } = await req.json();

    await sql`UPDATE "user"
      SET address = ${address}, national_id = ${national_id}
      WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to update "user"' },
      { status: 500 }
    );
  }
}
