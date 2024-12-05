import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/lib/mongoose';
import { Comment } from '@/src/lib/mongoose/models/Comment';

type ReqParams = { params: { articleId: string; commentId: string } };

export async function DELETE(_: Request, { params }: ReqParams) {
  await connectToDatabase();

  const { commentId } = params;

  if (!commentId) {
    return NextResponse.json(
      { error: 'Comment ID is required' },
      { status: 400 }
    );
  }

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Comment deleted successfully', commentId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
