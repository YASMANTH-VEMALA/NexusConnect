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

export type Notification = {
  id: string;
  user: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  type: 'like' | 'comment' | 'new_post' | 'collab_request' | 'collab_accepted';
  content: string;
  createdAt: string;
  read: boolean;
  link: string;
};

export type Message = {
    id: string;
    sender: Pick<User, 'id' | 'name' | 'avatarUrl'>;
    content: string;
    createdAt: string;
    read: boolean;
};

export type Chat = {
    id: string;
    user: Pick<User, 'id' | 'name' | 'avatarUrl'>;
    lastMessage: string;
    lastMessageAt: string;
    unreadCount: number;
};