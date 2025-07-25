import type { User, Post, Notification, Chat, Message } from './types';

export const mockCurrentUser: User = {
  id: 'user-1',
  name: 'Alex Doe',
  avatarUrl: 'https://placehold.co/100x100',
  bannerUrl: 'https://placehold.co/800x200',
  college: 'State University',
  classYear: '2025',
  bio: 'Aspiring product manager and design enthusiast. Love to build and create.',
  skills: ['Product Management', 'UI/UX Design', 'React', 'Photography'],
  interests: ['Indie Music', 'Bouldering', 'Startups', 'Coffee'],
  followers: 1204,
  following: 342,
  xp: 1550,
};

export const mockUsers: User[] = [
  mockCurrentUser,
  {
    id: 'user-2',
    name: 'Brenda Smith',
    avatarUrl: 'https://placehold.co/100x100',
    bannerUrl: 'https://placehold.co/800x200',
    college: 'State University',
    classYear: '2024',
    bio: 'Software engineer focused on backend systems. I enjoy hiking on weekends.',
    skills: ['Node.js', 'Python', 'System Design', 'Databases'],
    interests: ['Hiking', 'Sci-Fi Books', 'Cooking', 'Open Source'],
    followers: 856,
    following: 129,
    xp: 980,
  },
  {
    id: 'user-3',
    name: 'Carlos Green',
    avatarUrl: 'https://placehold.co/100x100',
    bannerUrl: 'https://placehold.co/800x200',
    college: 'Innovation Institute',
    classYear: '2026',
    bio: 'Film student and aspiring director. Let\'s create something beautiful.',
    skills: ['Videography', 'Video Editing', 'Storytelling', 'Directing'],
    interests: ['Cinema', 'Art History', 'Skateboarding', 'Travel'],
    followers: 2345,
    following: 501,
    xp: 2100,
  },
];

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    author: {
      id: 'user-2',
      name: 'Brenda Smith',
      avatarUrl: 'https://placehold.co/100x100',
    },
    content: 'Just deployed a new microservice for our project! It\'s always a great feeling to see code go live. #backend #coding',
    createdAt: '2h ago',
    likes: 58,
    comments: 12,
  },
  {
    id: 'post-2',
    author: {
      id: 'user-3',
      name: 'Carlos Green',
      avatarUrl: 'https://placehold.co/100x100',
    },
    content: 'Exploring some new color grading techniques for my upcoming short film. The mood is everything!',
    imageUrl: 'https://placehold.co/600x400',
    createdAt: '5h ago',
    likes: 124,
    comments: 23,
  },
  {
    id: 'post-3',
    author: {
      id: 'user-1',
      name: 'Alex Doe',
      avatarUrl: 'https://placehold.co/100x100',
    },
    content: 'Had a great session brainstorming new features for our app. User feedback is pure gold. Feeling energized and excited for what\'s next! 🚀',
    createdAt: '1d ago',
    likes: 99,
    comments: 18,
  },
];

export const mockNotifications: Notification[] = [
    {
        id: 'notif-1',
        user: mockUsers[1],
        type: 'collab_request',
        content: 'sent you a collaboration request.',
        createdAt: '15m ago',
        read: false,
        link: `/profile/${mockUsers[1].id}`
    },
    {
        id: 'notif-2',
        user: mockUsers[2],
        type: 'like',
        content: 'liked your post.',
        createdAt: '1h ago',
        read: false,
        link: '#'
    },
    {
        id: 'notif-3',
        user: mockUsers[1],
        type: 'comment',
        content: 'commented on your post: "This is awesome!"',
        createdAt: '3h ago',
        read: true,
        link: '#'
    },
    {
        id: 'notif-4',
        user: mockUsers[2],
        type: 'new_post',
        content: 'published a new post.',
        createdAt: 'yesterday',
        read: true,
        link: '#'
    }
];

export const mockChats: Chat[] = [
    {
        id: 'chat-1',
        user: mockUsers[1],
        lastMessage: 'Sure, I can help with that!',
        lastMessageAt: '10m',
        unreadCount: 2,
    },
    {
        id: 'chat-2',
        user: mockUsers[2],
        lastMessage: 'Project update is looking good.',
        lastMessageAt: '1h',
        unreadCount: 0,
    }
];

export const mockMessages: (Message & { userId: string })[] = [
    {
        id: 'msg-1',
        userId: 'user-2',
        sender: mockUsers[1],
        content: 'Hey Alex! Got your collaboration request. I\'d love to hear more about your project.',
        createdAt: '10m ago',
        read: true,
    },
    {
        id: 'msg-2',
        userId: 'user-1',
        sender: mockCurrentUser,
        content: 'Awesome! I\'m working on a new mobile app concept and I think your backend skills would be a perfect fit.',
        createdAt: '8m ago',
        read: false,
    },
    {
        id: 'msg-3',
        userId: 'user-2',
        sender: mockUsers[1],
        content: 'Sounds intriguing! Send me the details.',
        createdAt: '7m ago',
        read: false,
    }
];