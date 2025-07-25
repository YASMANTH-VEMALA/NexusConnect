import { mockChats, mockMessages, mockCurrentUser, mockUsers } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function MessagesPage() {
    const selectedChat = mockChats[0];
    const selectedUser = mockUsers.find(u => u.id === selectedChat.user.id);
    const messages = mockMessages.filter(m => m.sender.id === selectedUser?.id || m.sender.id === mockCurrentUser.id);

  return (
    <div className="h-[calc(100vh-4rem)] flex">
        <Card className="w-1/3 h-full flex flex-col">
            <CardHeader>
                <CardTitle>Messages</CardTitle>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search messages..." className="pl-10" />
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-auto">
                <ScrollArea className="h-full">
                    <div className="divide-y divide-border">
                        {mockChats.map(chat => (
                            <div key={chat.id} className={cn(
                                "p-4 flex items-center gap-4 cursor-pointer hover:bg-muted/50",
                                chat.id === selectedChat.id && "bg-muted"
                            )}>
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={chat.user.avatarUrl} alt={chat.user.name} />
                                    <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold">{chat.user.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                                </div>
                                <div className="text-xs text-muted-foreground text-right">
                                    <p>{chat.lastMessageAt}</p>
                                    {chat.unreadCount > 0 && (
                                        <div className="mt-1 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs ml-auto">
                                            {chat.unreadCount}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>

        <div className="w-2/3 h-full flex flex-col pl-6">
            <Card className="flex-1 flex flex-col">
                 <CardHeader className="border-b">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={selectedUser?.avatarUrl} alt={selectedUser?.name} />
                            <AvatarFallback>{selectedUser?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{selectedUser?.name}</p>
                            <p className="text-sm text-muted-foreground">Online</p>
                        </div>
                    </div>
                 </CardHeader>
                 <CardContent className="flex-1 p-4 overflow-auto">
                    <ScrollArea className="h-full pr-4">
                        <div className="space-y-4">
                        {messages.map(message => (
                            <div key={message.id} className={cn(
                                "flex items-end gap-2",
                                message.sender.id === mockCurrentUser.id ? "justify-end" : "justify-start"
                            )}>
                                {message.sender.id !== mockCurrentUser.id && (
                                     <Avatar className="h-8 w-8">
                                        <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
                                        <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "p-3 rounded-lg max-w-xs md:max-w-md",
                                    message.sender.id === mockCurrentUser.id 
                                        ? "bg-primary text-primary-foreground rounded-br-none" 
                                        : "bg-muted rounded-bl-none"
                                )}>
                                    <p className="text-sm">{message.content}</p>
                                </div>
                                {message.sender.id === mockCurrentUser.id && (
                                     <Avatar className="h-8 w-8">
                                        <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
                                        <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        </div>
                    </ScrollArea>
                 </CardContent>
                 <CardFooter className="p-4 border-t">
                    <div className="w-full flex items-center gap-2">
                        <Input placeholder="Type a message..." className="flex-1"/>
                        <Button>
                            <Send className="h-5 w-5"/>
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                 </CardFooter>
            </Card>
        </div>
    </div>
  );
}
