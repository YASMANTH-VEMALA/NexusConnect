import { redirect } from 'next/navigation';
import { mockCurrentUser } from '@/lib/mock-data';

export default function ProfilePage() {
  // Redirect to the current user's dynamic profile page
  redirect(`/profile/${mockCurrentUser.id}`);
}
