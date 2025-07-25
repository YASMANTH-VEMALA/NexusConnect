import type { User } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const allTags = [...user.skills.slice(0, 2), ...user.interests.slice(0, 2)];

  return (
    <Card className="overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
      <Link href={`/profile/${user.id}`} className="block">
        <div className="relative h-24 w-full bg-muted">
           <Image
            src={user.bannerUrl}
            alt={`${user.name}'s banner`}
            fill
            className="object-cover"
            data-ai-hint="abstract background"
          />
        </div>
        <CardContent className="p-4 flex flex-col items-center text-center relative">
            <div className="relative -mt-16 mb-2">
                <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile portrait" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
            <p className="font-bold text-lg">{user.name}</p>
            <p className="text-sm text-muted-foreground mb-3">{user.college}</p>
            <div className="flex flex-wrap gap-2 justify-center mb-4 h-12 overflow-hidden">
                {allTags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
        </CardContent>
      </Link>
      <div className="p-4 pt-0">
         <Button className="w-full">Follow</Button>
      </div>
    </Card>
  );
}
