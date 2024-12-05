import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/mongoose';
import { Comment } from '@/src/lib/mongoose/models/Comment';

export async function GET(
  _: Request,
  { params }: { params: { articleId: string } }
) {
  await connectToDatabase();
  const { articleId } = params;

  if (!articleId) {
    return NextResponse.json(
      { error: 'Article ID is required' },
      { status: 400 }
    );
  }

  try {
    const comments = await Comment.find({ articleId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error('Error fetching comment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await connectToDatabase();

  const { articleId, userName, message } = await req.json();

  if (!articleId || !userName || !message) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    const comment = await Comment.create({ articleId, userName, message });
    return NextResponse.json(
      { message: 'Comment added successfully', comment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  await connectToDatabase();

  const { commentId, message } = await req.json();

  if (!commentId || !message) {
    return NextResponse.json(
      { error: 'Comment ID and message are required' },
      { status: 400 }
    );
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { message },
      { new: true }
    );

    if (!updatedComment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Comment updated successfully', comment: updatedComment },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}
