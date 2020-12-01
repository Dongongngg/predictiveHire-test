export interface Vacancy {
  _id: string;
  title: string;
  description: string;
  expiredAt: string;
}
export interface VacancyInput {
  title: string;
  description: string;
  expiredAt: string;
}

export interface RestRes {
  success: boolean;
  data: Vacancy | string | Vacancy[];
}

export interface AuthInfo {
  loggedIn: boolean;
  role: string[];
}
