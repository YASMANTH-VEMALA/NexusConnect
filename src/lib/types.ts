export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  bannerUrl: string;
  college: string;
  classYear: string;
  bio: string;
  skills: string[];
  interests: string[];
  followers: number;
  following: number;
  xp: number;
};

export type Post = {
  id: string;
  author: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
  comments: number;
};
