import { ProfileForm } from "@/components/profile/ProfileForm";
import { mockCurrentUser } from "@/lib/mock-data";

export default function EditProfilePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 font-headline">Edit Profile</h1>
      <ProfileForm user={mockCurrentUser} />
    </div>
  );
}
