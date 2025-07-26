'use client';

import type { Post } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageCircle, Share2, Music4, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface SpotlightCardProps {
  post: Post;
}

export function SpotlightCard({ post }: SpotlightCardProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="h-full w-full relative rounded-lg overflow-hidden snap-start" onClick={() => setIsPlaying(!isPlaying)}>
      {post.videoUrl && (
         <video 
            src={post.videoUrl} 
            className="h-full w-full object-cover" 
            autoPlay 
            loop 
            muted 
            playsInline
        >
             <source src={post.videoUrl} type="video/mp4" />
        </video>
      )}
      {!isPlaying && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <PlayCircle className="h-20 w-20 text-white/70" />
          </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-end">
            <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 border-2 border-white">
                        <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Link href={`/profile/${post.author.id}`} className="font-semibold text-white hover:underline">{post.author.name}</Link>
                </div>
                <p className="text-white text-sm">{post.content}</p>
                 <div className="flex items-center gap-2 text-white">
                    <Music4 className="h-4 w-4" />
                    <p className="text-sm">Original Audio - {post.author.name}</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-3 text-white">
                <Button variant="ghost" size="icon" className="h-12 w-12 flex-col gap-1 text-white hover:bg-white/20 hover:text-white">
                    <ThumbsUp className="h-7 w-7"/>
                    <span className="text-xs">{post.likes}</span>
                </Button>
                 <Button variant="ghost" size="icon" className="h-12 w-12 flex-col gap-1 text-white hover:bg-white/20 hover:text-white">
                    <MessageCircle className="h-7 w-7"/>
                    <span className="text-xs">{post.comments}</span>
                </Button>
                 <Button variant="ghost" size="icon" className="h-12 w-12 flex-col gap-1 text-white hover:bg-white/20 hover:text-white">
                    <Share2 className="h-7 w-7"/>
                    <span className="text-xs">Share</span>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
