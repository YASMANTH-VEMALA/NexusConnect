import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { UserCard } from '@/components/users/UserCard';
import { mockUsers } from '@/lib/mock-data';

export default function DiscoverPage() {
  const recommendedUsers = mockUsers.filter(u => u.id !== 'user-1');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4 font-headline">Discover Creators</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by skill, class, or interest..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Skills</Button>
            <Button variant="outline">Class</Button>
            <Button variant="outline">Interests</Button>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4 font-headline">Recommended For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recommendedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
