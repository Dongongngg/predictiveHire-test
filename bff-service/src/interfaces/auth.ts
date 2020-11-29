export interface LoginInput {
  username: string;
  password: string;
}

export interface UserProfile {
  _id: string;
  username: string;
  name: string;
  companyId: string;
  roles: string[];
  token: string;
}

export interface AuthRes {
  success: boolean;
  data: UserProfile | string;
}
