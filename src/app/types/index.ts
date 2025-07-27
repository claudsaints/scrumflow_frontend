

export interface User {
  name: string;
  email: string;
}

export enum MemberRole {
  OWNER = "OWNER",
  MEMBER = "MEMBER",
}

export interface ProjectMember {
  role: MemberRole;
  user: User;
  join_at: string;
}

export interface Label {
  id: number;
  name: string;
  color: string;
  cards: string[];
}

export enum CardType {
  FEATURE = "FEATURE",
  TASK = "TASK",
  INTEGRATION = "INTEGRATION",
  CODE_REVIEW = "CODE_REVIEW",
  SETUP = "SETUP",
  DOCUMENTATION = "DOCUMENTATION",
  DESIGN = "DESIGN",
  BUG = "BUG",
}

export interface Card {
  id: number;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  type: CardType;
  story_point: number;
  labels: Label[];
}

export interface List {
  id: number;
  title: string;
  position: number;
  create_at: string;
  cardList: Card[];
}

export interface Section {
  id: number;
  title: string;
  description: string;
  lists: List[];
}

export interface Sprint {
  id: number;
  section: Pick<Section, "id" | "title" | "description" | "lists">;
  title: string;
  start_date: string;
  end_date: string;
  goal: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  create_at: string;
  owner: User;
  members: ProjectMember[];
  labels: Label[];
  sections_ids: number[];
  sprints_ids: number[];
  background_image_url?: string;
}

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
  ProjectDTO
}
