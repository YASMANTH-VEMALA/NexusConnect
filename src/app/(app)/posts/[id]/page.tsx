import { PostCard } from '@/components/posts/PostCard';
import { mockPosts } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default function PostPage({ params }: { params: { id: string } }) {
  const post = mockPosts.find(p => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PostCard post={post} />
    </div>
  );
}
