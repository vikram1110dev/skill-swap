export interface Skill {
  id: number;
  name: string;
  category: string;
}

export interface UserSkill {
  id: number;
  skill: Skill;
  skillType: 'OFFERED' | 'REQUESTED';
  proficiencyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT' | null;
}

export interface UserProfile {
  id: number;
  fullName: string;
  username: string;
  email: string;
  bio: string | null;
  country: string | null;
  city: string | null;
  languages: string[];
  rating: number;
  completedExchanges: number;
  skills: UserSkill[];
}

export interface ExchangeRequest {
  id: number;
  senderId: number;
  senderName: string;
  senderEmail?: string;
  receiverId: number;
  receiverName: string;
  receiverEmail?: string;
  offeredSkill: Skill;
  requestedSkill: Skill;
  message: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'COMPLETED';
  createdAt: string;
}

export interface Match {
  user: UserProfile;
  matchingOfferedSkill?: Skill;
  matchingRequestedSkill?: Skill;
  isTwoWayMatch: boolean;
}
