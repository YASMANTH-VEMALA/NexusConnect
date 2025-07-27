import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { mockCurrentUser } from '@/lib/mock-data';

export default async function ProfilePage() {
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect(`/profile/${user.id}`);
  } else {
    // Fallback for when user is not logged in via Supabase Auth, e.g. in development
    redirect(`/profile/${mockCurrentUser.id}`);
  }
}
