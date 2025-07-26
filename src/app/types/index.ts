
 type User = {
  name: string;
  email: string;
};

 type Member = {
  role: 'ADMIN' | 'MEMBER' | 'OWNER';
  user: User;
  join_at: string;
};

 type Card = {
  title: string;
  description: string | null;
};

 type List = {
  id: number;
  title: string;
  position: number;
  create_at: string;
  cardList: Card[];
};

 type Label = any; 
 type Sprint = any; 

 type Project = {
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

type ProjectDTO  = {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
  create_at: string;
  owner: {
      name: string;
      email: string;
  }
}



export type {
  User,
  Member,
  Project,
  List,
  Label,
  Card,
  ProjectDTO
}
