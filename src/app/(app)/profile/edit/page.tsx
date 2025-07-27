"use client";

import { ProfileForm } from "@/components/profile/ProfileForm";
import { mockCurrentUser } from "@/lib/mock-data";
import type { User } from "@/lib/types";

export default function EditProfilePage() {
  const user: User = mockCurrentUser;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6 font-headline'>Edit Profile</h1>
      <ProfileForm user={user} />
    </div>
  );
}
