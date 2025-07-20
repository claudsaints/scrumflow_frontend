
export type User = {
  name: string;
  email: string;
};

export type Member = {
  role: 'ADMIN' | 'MEMBER' | 'OWNER';
  user: User;
  join_at: string;
};

export type Card = {
  title: string;
  description: string | null;
};

export type List = {
  id: number;
  title: string;
  position: number;
  create_at: string;
  cardList: Card[];
};

export type Label = any; // Defina conforme necessário
export type Sprint = any; // Defina conforme necessário

export type Project = {
  id: number;
  title: string;
  description: string;
  create_at: string;
  owner: User;
  members: Member[];
  lists: List[];
  labels: Label[];
  sprints: Sprint[];
};
