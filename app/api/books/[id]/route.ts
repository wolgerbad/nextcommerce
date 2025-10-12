import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const book = await sql`SELECT * FROM book WHERE id = ${id}`;

    if (book.length === 0) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(book[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch book' },
      { status: 500 }
    );
  }
}
