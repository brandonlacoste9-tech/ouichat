export interface User {
  id: string;
  username: string;
  avatar: string;
  status: "online" | "offline";
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: User;
  timestamp: Date;
  type: "text" | "voice" | "image";
  audioUrl?: string;
  duration?: number;
  isBot?: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}
