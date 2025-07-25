import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Image as ImageIcon, Video, Smile } from 'lucide-react';
import { mockCurrentUser } from '@/lib/mock-data';

export function CreatePost() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={mockCurrentUser.avatarUrl} alt={mockCurrentUser.name} data-ai-hint="profile avatar" />
            <AvatarFallback>{mockCurrentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <Textarea
              placeholder="What's on your mind, Alex?"
              className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-base resize-none"
              rows={3}
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-1">
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
              <Button>Post</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
