'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as React from 'react';

interface CreateSpotlightDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateSpotlightDialog({ open, onOpenChange }: CreateSpotlightDialogProps) {
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
        title: "Spotlight Posted!",
        description: "Your video is now live for everyone to see.",
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Spotlight Post</DialogTitle>
          <DialogDescription>
            Upload a short video and share it with the community.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="w-full aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground">
                <UploadCloud className="h-10 w-10 mb-2"/>
                <p className="text-sm">Click or drag to upload video</p>
            </div>
          <Textarea
            placeholder="Add a caption..."
            className="resize-none"
            rows={3}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
