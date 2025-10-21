import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const purchase = await sql`SELECT * FROM purchase WHERE user_id = ${id}`;

    if (purchase.length === 0) {
      return NextResponse.json({ error: 'You have no orders to look at.' });
    }

    return NextResponse.json(purchase);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch purchase' });
  }
}
