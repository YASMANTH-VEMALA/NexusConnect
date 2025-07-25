import { CreatePost } from '@/components/posts/CreatePost';
import { PostCard } from '@/components/posts/PostCard';
import { Separator } from '@/components/ui/separator';
import { mockPosts } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 font-headline">Home Feed</h1>
      <CreatePost />
      <Separator className="my-6" />
      <div className="space-y-6">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
