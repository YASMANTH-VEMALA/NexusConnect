import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PostCard } from "@/components/posts/PostCard";
import { supabase } from "@/lib/supabase";
import type { User } from "@/lib/types";
import { mockPosts } from "@/lib/mock-data";
import { UserProfileClient } from "@/components/profile/UserProfileClient";

async function getUser(id: string) {
  const { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !user) {
    notFound();
  }
  return user;
}

async function getCurrentUserId() {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id;
}


export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);
  const currentUserId = await getCurrentUserId();
  const userPosts = mockPosts.filter((p) => p.author.id === user.id);

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <Card className='overflow-hidden'>
        <div className='relative h-48 w-full bg-muted'>
          {user.banner_url && (
            <Image
              src={user.banner_url}
              alt={`${user.name}'s banner`}
              fill
              className='object-cover'
            />
          )}
        </div>
        <div className='p-6'>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='relative -mt-24 w-32 h-32 md:-mt-20 md:w-36 md:h-36 shrink-0'>
              <Avatar className='w-full h-full border-4 border-card'>
                {user.avatar_url && (
                  <AvatarImage src={user.avatar_url} alt={user.name} />
                )}
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className='w-full'>
              <div className='flex flex-col md:flex-row justify-between items-start'>
                <div>
                  <h1 className='text-2xl font-bold font-headline'>
                    {user.name}
                  </h1>
                  <p className='text-muted-foreground'>
                    {user.college} &bull; Class of {user.class_year}
                  </p>
                </div>
                 <UserProfileClient user={user} currentUserId={currentUserId} />
              </div>
              <p className='mt-4 text-sm'>{user.bio}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-1 space-y-6'>
          <Card>
            <CardContent className='p-6'>
              <h2 className='text-lg font-bold font-headline mb-4'>Skills</h2>
              <div className='flex flex-wrap gap-2'>
                {user.skills.map((skill) => (
                  <Badge key={skill} variant='secondary'>
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-6'>
              <h2 className='text-lg font-bold font-headline mb-4'>
                Interests
              </h2>
              <div className='flex flex-wrap gap-2'>
                {user.interests.map((interest) => (
                  <Badge key={interest} variant='secondary'>
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='md:col-span-2 space-y-6'>
          <h2 className='text-lg font-bold font-headline'>Posts</h2>
          {userPosts.length > 0 ? (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <Card>
              <CardContent className='p-6 text-center text-muted-foreground'>
                No posts yet.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
