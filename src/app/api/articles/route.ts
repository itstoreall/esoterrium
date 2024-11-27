import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/src/lib/mongoose';
import { Article } from '@/src/lib/mongoose/models/Article';

export async function GET() {
  await connect();
  try {
    const articles = await Article.find();
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch articles: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connect();
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
