import { NextRequest, NextResponse } from 'next/server';
import * as mongoose from '@/src/lib/mongoose';

function getParamsFromUrl(url: string): { id: string } | null {
  const urlSegments = url.split('/');
  const id = urlSegments[urlSegments.length - 1];
  return id ? { id } : null;
}

export async function GET(req: NextRequest) {
  await mongoose.connect();
  const params = getParamsFromUrl(req.url);

  if (!params || !params.id) {
    return NextResponse.json({ error: 'Missing article ID' }, { status: 400 });
  }

  try {
    const article = await mongoose.Article.findById(params.id);
    if (!article)
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch article: ${error}` },
      { status: 500 }
    );
  }
}
