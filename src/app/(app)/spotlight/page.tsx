'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, X } from 'lucide-react';
import { SpotlightCard } from '@/components/spotlight/SpotlightCard';
import { CreateSpotlightDialog } from '@/components/spotlight/CreateSpotlightDialog';
import { mockSpotlightPosts } from '@/lib/mock-data';
import type { Post } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import * as React from 'react';

export default function SpotlightPage() {
  const [openCreate, setOpenCreate] = useState(false);
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  return (
    <div className="relative h-[calc(100vh-4rem)]">
        <h1 className="text-2xl font-bold font-headline absolute top-4 left-4 z-10 bg-black/50 text-white p-2 rounded-lg">Spotlight</h1>
        
        <Button 
            onClick={() => setOpenCreate(true)}
            className="absolute top-4 right-4 z-10">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Post
        </Button>
        <CreateSpotlightDialog open={openCreate} onOpenChange={setOpenCreate} />

        <div className="h-full w-full flex items-center justify-center bg-black">
          <div className="w-full max-w-sm h-full">
            <Carousel setApi={setApi} className="w-full h-full" orientation="vertical">
              <CarouselContent className="h-full">
                {mockSpotlightPosts.map((post: Post) => (
                  <CarouselItem key={post.id} className="h-full">
                      <SpotlightCard post={post} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
    </div>
  );
}
