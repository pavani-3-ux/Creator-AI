export interface CreatorAccount {
  name: string;
  email: string;
  avatar: string;
  role: string;
  tier: "Free" | "Pro" | "Enterprise";
  apiTokensUsed: number;
  apiTokensLimit: number;
}

export interface SavedProject {
  id: string;
  title: string;
  type: "caption" | "script" | "viral-ideas" | "thumbnail" | "translate" | "chat" | "image" | "voice";
  topic?: string;
  platform: "YouTube" | "Instagram" | "TikTok" | "Blog" | "Twitter" | "LinkedIn" | "All";
  content: string;
  imageUrl?: string;
  voiceUrl?: string;
  timestamp: string;
  isSaved?: boolean;
}

export interface PlannerPost {
  id: string;
  title: string;
  type: "caption" | "video" | "image" | "carousel";
  platform: "YouTube" | "Instagram" | "TikTok" | "Blog" | "Twitter" | "LinkedIn";
  scheduledDate: string; // ISO date format YYYY-MM-DD
  scheduledTime: string; // HH:MM
  status: "draft" | "scheduled" | "published";
  topic?: string;
}

export interface MetricCardValue {
  label: string;
  value: string;
  increase: string;
  isUp: boolean;
  history: number[];
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: "text" | "video" | "image" | "audio" | "translation";
  icon: string;
  platformSupport: Array<"YouTube" | "Instagram" | "TikTok" | "Twitter" | "LinkedIn" | "Blog">;
  hotkey?: string;
}
