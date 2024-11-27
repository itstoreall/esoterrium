import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/mongoose';
import { Article } from '@/src/lib/mongoose/models/Article';

function getParamsFromUrl(url: string): { id: string } | null {
  const urlSegments = url.split('/');
  const id = urlSegments[urlSegments.length - 1];
  return id ? { id } : null;
}

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const params = getParamsFromUrl(req.url);

  if (!params || !params.id) {
    return NextResponse.json({ error: 'Missing article ID' }, { status: 400 });
  }

  try {
    const article = await Article.findById(params.id);

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

export async function PUT(req: NextRequest) {
  await connectToDatabase();

  const params = getParamsFromUrl(req.url);

  if (!params || !params.id) {
    return NextResponse.json({ error: 'Missing article ID' }, { status: 400 });
  }

  try {
    const data = await req.json();

    const updatedArticle = await Article.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!updatedArticle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}
