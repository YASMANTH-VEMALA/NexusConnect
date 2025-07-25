import type { User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col items-center text-center">
        <Avatar className="h-20 w-20 mb-3">
          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile portrait" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="font-bold text-lg">{user.name}</p>
        <p className="text-sm text-muted-foreground mb-4">{user.college}</p>
        <Button className="w-full">Follow</Button>
      </CardContent>
    </Card>
  );
}
