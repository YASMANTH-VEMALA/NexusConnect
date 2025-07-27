"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/types";

interface UserProfileClientProps {
  user: User;
  currentUserId: string;
}

export function UserProfileClient({ user, currentUserId }: UserProfileClientProps) {
  const isCurrentUser = user.id === currentUserId;

  return (
    <div className='flex gap-2 mt-4 md:mt-0'>
      {isCurrentUser ? (
        <Button asChild>
          <Link href='/profile/edit'>Edit Profile</Link>
        </Button>
      ) : (
        <>
          <Button>Follow</Button>
          <Button variant='outline'>Request Collab</Button>
        </>
      )}
    </div>
  );
}
