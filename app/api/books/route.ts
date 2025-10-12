import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const books = await sql`SELECT * FROM book ORDER BY id ASC`;
    return NextResponse.json(books);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, author, price, description, stock, rating } =
      await req.json();
    await sql`
      INSERT INTO book (title, author, price, description, stock, rating)
      VALUES (${title}, ${author}, ${price}, ${description}, ${stock}, ${rating})
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to add book' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, author, price, description, stock, rating } =
      await req.json();
    await sql`
      UPDATE book
      SET title = ${title}, author = ${author}, price = ${price},
          description = ${description}, stock = ${stock}, rating = ${rating}
      WHERE id = ${id}
    `;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to update book' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await sql`DELETE FROM book WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    );
  }
}
