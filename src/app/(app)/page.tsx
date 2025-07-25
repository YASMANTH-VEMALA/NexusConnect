import Image from 'next/image';
import Link from 'next/link';
import { CreatePost } from '@/components/posts/CreatePost';
import { PostCard } from '@/components/posts/PostCard';
import { Separator } from '@/components/ui/separator';
import { mockPosts, mockCurrentUser, mockUsers } from '@/lib/mock-data';
import type { User as UserType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

function getSuggestedUsers(currentUser: UserType) {
    const otherUsers = mockUsers.filter(u => u.id !== currentUser.id);

    return otherUsers.map(user => {
        const matchedSkills = user.skills.filter(skill => currentUser.skills.includes(skill));
        return { ...user, matchedSkillsCount: matchedSkills.length };
    })
    .filter(user => user.matchedSkillsCount > 0)
    .sort((a, b) => b.matchedSkillsCount - a.matchedSkillsCount);
}

function getTrendingSkills() {
    const skillCounts: Record<string, number> = {};
    const totalUsersWithSkills = mockUsers.filter(u => u.skills.length > 0).length;

    mockUsers.forEach(user => {
        user.skills.forEach(skill => {
            skillCounts[skill] = (skillCounts[skill] || 0) + 1;
        });
    });

    return Object.entries(skillCounts)
        .map(([skill, count]) => ({
            name: skill,
            percentage: Math.round((count / totalUsersWithSkills) * 100),
        }))
        .sort((a, b) => b.percentage - a.percentage);
}

export default function HomePage() {
  const suggestedUsers = getSuggestedUsers(mockCurrentUser);
  const trendingSkills = getTrendingSkills();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8 items-start">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold font-headline">Home Feed</h1>
        <CreatePost />
        <Separator/>
        <div className="space-y-6">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className="space-y-6 sticky top-8">
         {/* My Profile Card */}
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="relative h-28 w-full">
                    <Image
                        src={mockCurrentUser.bannerUrl}
                        alt={`${mockCurrentUser.name}'s banner`}
                        fill
                        className="object-cover"
                        data-ai-hint="abstract background"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4 flex flex-col items-center text-center relative">
                <Avatar className="h-24 w-24 border-4 border-card -mt-16 mb-2">
                    <AvatarImage src={mockCurrentUser.avatarUrl} alt={mockCurrentUser.name} data-ai-hint="profile portrait" />
                    <AvatarFallback>{mockCurrentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">{mockCurrentUser.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{mockCurrentUser.college}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                    {mockCurrentUser.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                    {mockCurrentUser.interests.slice(0, 2).map((interest) => (
                        <Badge key={interest} variant="secondary">{interest}</Badge>
                    ))}
                </div>
                <Button className="w-full mt-4" asChild>
                    <Link href="/profile">View My Profile</Link>
                </Button>
            </CardContent>
        </Card>

        {/* Suggested People Card */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    <span>Suggested People</span>
                </CardTitle>
                <CardDescription>
                    Creators with skills that match your interests.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {suggestedUsers.slice(0, 3).map(user => (
                    <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile portrait" />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <Link href={`/profile/${user.id}`} className="font-semibold hover:underline">{user.name}</Link>
                                <p className="text-sm text-muted-foreground">{user.college}</p>
                                <p className="text-xs text-primary font-medium mt-1">{user.matchedSkillsCount} skill{user.matchedSkillsCount > 1 ? 's' : ''} matched</p>
                            </div>
                        </div>
                         <Button size="sm" asChild>
                            <Link href={`/profile/${user.id}`}>View</Link>
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>

        {/* Trending Skills Card */}
        <Card>
            <CardHeader>
                <CardTitle>Trending Skills</CardTitle>
                    <CardDescription>
                    Most popular skills in the community.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {trendingSkills.slice(0, 3).map(skill => (
                    <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium">{skill.name}</p>
                            <p className="text-sm text-muted-foreground">{skill.percentage}%</p>
                        </div>
                        <Progress value={skill.percentage} />
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
