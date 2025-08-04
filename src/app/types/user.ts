export interface User {
  name: string;
  email: string;
}

export enum MemberRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}
