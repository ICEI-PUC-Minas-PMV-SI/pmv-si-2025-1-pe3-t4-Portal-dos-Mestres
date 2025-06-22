import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  bio: string;
  followersCount: number;
  groupsJoined: number;
  forumPosts: number;
}

interface Character {
  id: string;
  name: string;
  class: string;
  race: string;
  level: number;
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  backstory: string;
  avatar: string;
  groupId: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface ForumPost {
  id: number;
  title: string;
  author: string;
  avatar: string;
  category: string;
  categoryLabel: string;
  timeAgo: string;
  likes: number;
  dislikes: number;
  replies: number;
  content?: string;
  userVote?: 'like' | 'dislike' | null;
}

interface SessionState {
  groupMessages: { [groupId: string]: Message[] };
  forumPosts: ForumPost[];
  userVotes: { [postId: string]: 'like' | 'dislike' | null };
  characters: { [groupId: string]: Character[] };
}

interface AuthContextType {
  user: User | null;
  sessionState: SessionState;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addGroupMessage: (groupId: string, message: Omit<Message, 'id'>) => void;
  addForumPost: (post: Omit<ForumPost, 'id' | 'timeAgo' | 'likes' | 'dislikes' | 'replies'>) => void;
  voteOnPost: (postId: number, voteType: 'like' | 'dislike') => void;
  saveCharacter: (groupId: string, character: Character) => void;
  getCharacters: (groupId: string) => Character[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionState, setSessionState] = useState<SessionState>({
    groupMessages: {},
    forumPosts: [
      {
        id: 1,
        title: 'Como criar NPCs memoráveis que seus jogadores vão amar (ou odiar)',
        author: 'MestreAntigo',
        avatar: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop',
        category: 'gm-tips',
        categoryLabel: 'Dicas para Mestres',
        timeAgo: '3 horas',
        likes: 31,
        dislikes: 2,
        replies: 12,
        userVote: null
      },
      {
        id: 2,
        title: 'Melhores sistemas para iniciantes no RPG',
        author: 'GuiaIniciante',
        avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100&h=100&fit=crop',
        category: 'systems',
        categoryLabel: 'Sistemas de RPG',
        timeAgo: '5 horas',
        likes: 18,
        dislikes: 1,
        replies: 8,
        userVote: null
      }
    ],
    userVotes: {},
    characters: {}
  });

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('rpg_user');
    const storedSession = localStorage.getItem('rpg_session');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedSession) {
      setSessionState(JSON.parse(storedSession));
    }
  }, []);

  const saveSession = (newSessionState: SessionState) => {
    setSessionState(newSessionState);
    localStorage.setItem('rpg_session', JSON.stringify(newSessionState));
  };

  const login = async (email: string, password: string) => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      email,
      username: email.split('@')[0],
      avatar: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=150&h=150&fit=crop&crop=face',
      bio: 'Aventureiro experiente em busca de novas campanhas épicas!',
      followersCount: 42,
      groupsJoined: 5,
      forumPosts: 23
    };
    
    setUser(mockUser);
    localStorage.setItem('rpg_user', JSON.stringify(mockUser));
  };

  const signup = async (email: string, password: string, username: string) => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      email,
      username,
      avatar: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=150&h=150&fit=crop&crop=face',
      bio: 'Novo aventureiro pronto para explorar mundos fantásticos!',
      followersCount: 0,
      groupsJoined: 0,
      forumPosts: 0
    };
    
    setUser(mockUser);
    localStorage.setItem('rpg_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rpg_user');
    localStorage.removeItem('rpg_session');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('rpg_user', JSON.stringify(updatedUser));
    }
  };

  const addGroupMessage = (groupId: string, message: Omit<Message, 'id'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now()
    };

    const newSessionState = {
      ...sessionState,
      groupMessages: {
        ...sessionState.groupMessages,
        [groupId]: [...(sessionState.groupMessages[groupId] || []), newMessage]
      }
    };

    saveSession(newSessionState);
  };

  const addForumPost = (post: Omit<ForumPost, 'id' | 'timeAgo' | 'likes' | 'dislikes' | 'replies'>) => {
    const newPost: ForumPost = {
      ...post,
      id: Date.now(),
      timeAgo: 'agora',
      likes: 0,
      dislikes: 0,
      replies: 0,
      userVote: null
    };

    const newSessionState = {
      ...sessionState,
      forumPosts: [newPost, ...sessionState.forumPosts]
    };

    saveSession(newSessionState);

    // Update user's forum post count
    if (user) {
      const updatedUser = { ...user, forumPosts: user.forumPosts + 1 };
      setUser(updatedUser);
      localStorage.setItem('rpg_user', JSON.stringify(updatedUser));
    }
  };

  const voteOnPost = (postId: number, voteType: 'like' | 'dislike') => {
    const currentVote = sessionState.userVotes[postId.toString()];
    let newVote: 'like' | 'dislike' | null = voteType;
    
    // If clicking the same vote, remove it
    if (currentVote === voteType) {
      newVote = null;
    }

    const updatedPosts = sessionState.forumPosts.map(post => {
      if (post.id === postId) {
        let newLikes = post.likes;
        let newDislikes = post.dislikes;

        // Remove previous vote
        if (currentVote === 'like') newLikes--;
        if (currentVote === 'dislike') newDislikes--;

        // Add new vote
        if (newVote === 'like') newLikes++;
        if (newVote === 'dislike') newDislikes++;

        return { ...post, likes: newLikes, dislikes: newDislikes, userVote: newVote };
      }
      return post;
    });

    const newSessionState = {
      ...sessionState,
      forumPosts: updatedPosts,
      userVotes: {
        ...sessionState.userVotes,
        [postId.toString()]: newVote
      }
    };

    saveSession(newSessionState);
  };

  const saveCharacter = (groupId: string, character: Character) => {
    const newSessionState = {
      ...sessionState,
      characters: {
        ...sessionState.characters,
        [groupId]: [
          ...(sessionState.characters[groupId] || []).filter(c => c.id !== character.id),
          character
        ]
      }
    };

    saveSession(newSessionState);
  };

  const getCharacters = (groupId: string): Character[] => {
    return sessionState.characters[groupId] || [];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      sessionState,
      login, 
      signup, 
      logout, 
      updateProfile,
      addGroupMessage,
      addForumPost,
      voteOnPost,
      saveCharacter,
      getCharacters
    }}>
      {children}
    </AuthContext.Provider>
  );
};
