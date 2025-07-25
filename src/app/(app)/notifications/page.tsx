import Link from 'next/link';
import { mockNotifications } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, UserPlus, Heart, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Notification } from '@/lib/types';

function NotificationIcon({ type }: { type: Notification['type'] }) {
    switch (type) {
        case 'like':
            return <Heart className="h-6 w-6 text-red-500" />;
        case 'comment':
            return <MessageCircle className="h-6 w-6 text-blue-500" />;
        case 'collab_request':
            return <UserPlus className="h-6 w-6 text-primary" />;
        default:
            return <Bell className="h-6 w-6 text-muted-foreground" />;
    }
}

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 font-headline">Notifications</h1>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {mockNotifications.map((notification) => (
              <Link key={notification.id} href={notification.link}>
                <div className={cn(
                    "p-4 flex items-start gap-4 hover:bg-muted/50 cursor-pointer",
                    !notification.read && "bg-primary/5"
                )}>
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={notification.user.avatarUrl} alt={notification.user.name} />
                      <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                      <NotificationIcon type={notification.type} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-semibold">{notification.user.name}</span>
                      {' '}
                      {notification.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.createdAt}
                    </p>
                    {notification.type === 'collab_request' && (
                        <div className="mt-3 flex gap-2">
                            <Button size="sm">Accept</Button>
                            <Button size="sm" variant="outline">Decline</Button>
                        </div>
                    )}
                  </div>
                   {!notification.read && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}