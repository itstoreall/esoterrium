import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/mongoose';
import { Article } from '@/src/lib/mongoose/models/Article';

type GetArticleData = {
  isPublished: boolean;
  access: string;
};

export async function GET(req: NextRequest) {
  await connectToDatabase();
  try {
    const isPublished = req.nextUrl.searchParams.get('isPublished');
    const access = req.nextUrl.searchParams.get('access');
    const filter: Record<string, GetArticleData['isPublished' | 'access']> = {};
    if (isPublished === 'true') filter.isPublished = true;
    if (access === 'public') filter.access = 'public';
    const articles = await Article.find(filter).sort({ updatedAt: -1 });
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
