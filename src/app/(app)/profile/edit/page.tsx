"use client";
import { useEffect, useState } from "react";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { supabase } from "@/lib/supabase";
import type { User } from "@/lib/types";

export default function EditProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setUser(profile);
      }
    };
    fetchUser();
  }, []);

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
