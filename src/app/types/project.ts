import { Label } from "./card";
import { MemberRole, User } from "./user";

export interface ProjectMember {
  role: MemberRole;
  user: User;
  join_at: string;
}


export interface Project {
  id: number;
  uuid: string;
  title: string;
  description: string;
  create_at: string;
  owner: User;
  members: ProjectMember[];
  labels: Label[];
  sections: [
    {
      uuid: string;
      title: string;
      description: string;
    }
  ];
  sprints_ids: number[];
  backgroundImage?: string;
}

type ProjectDTO = {
  id: number;
  uuid: string;
  title: string;
  description: string;
  backgroundImage: string;
  create_at: string;
  owner: {
    name: string;
    email: string;
  };
};




export type { ProjectDTO };
