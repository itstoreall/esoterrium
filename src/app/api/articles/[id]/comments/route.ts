import { NextRequest, NextResponse } from 'next/server';
import { Article } from '@/src/lib/mongoose/models/Article';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const article = await Article.findById(id).select('comments');
    if (!article)
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });

    return NextResponse.json(article.comments);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Error fetching comments' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { user, message } = await req.json();

    if (!user || !message) {
      return NextResponse.json(
        { error: 'User and message are required' },
        { status: 400 }
      );
    }

    const article = await Article.findById(id);
    if (!article)
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });

    article.comments.push({ user, message });
    await article.save();

    return NextResponse.json(article.comments, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Error adding comment' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { commentId, message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const article = await Article.findOneAndUpdate(
      { 'comments._id': commentId },
      { $set: { 'comments.$.message': message } },
      { new: true }
    );

    if (!article) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    return NextResponse.json(article.comments, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Error updating comment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { commentId } = await req.json();

    if (!commentId) {
      return NextResponse.json(
        { error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    const article = await Article.findOneAndUpdate(
      { _id: id },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article.comments, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Error deleting comment' },
      { status: 500 }
    );
  }
}
