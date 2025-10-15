import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const purchases = await sql`SELECT * FROM purchase ORDER BY id DESC`;
    return NextResponse.json(purchases);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      user_id,
      address,
      phone,
      email,
      discount,
      total_price,
      purchase_items,
    } = body;

    if (!user_id || !phone || !total_price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO purchase (user_id, address, phone, email, discount, total_price, purchase_items)
      VALUES (${user_id}, ${address}, ${phone}, ${email}, ${discount}, ${total_price}, ${purchase_items})
      RETURNING *;
    `;

    return NextResponse.json(result[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to create purchase' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing purchase id' },
        { status: 400 }
      );
    }

    const existing = await sql`SELECT * FROM purchase WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Purchase not found' },
        { status: 404 }
      );
    }

    await sql`DELETE FROM purchase WHERE id = ${id}`;

    return NextResponse.json({ message: 'Purchase deleted successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to delete purchase' },
      { status: 500 }
    );
  }
}
