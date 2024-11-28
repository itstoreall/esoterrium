import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/mongoose';
import { Article } from '@/src/lib/mongoose/models/Article';

export async function GET() {
  await connectToDatabase();
  try {
    const articles = await Article.find().sort({ updatedAt: -1 });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch articles: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  try {
    const data = await req.json();
    const article = await Article.create(data);
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create article: ${error}` },
      { status: 500 }
    );
  }
}
