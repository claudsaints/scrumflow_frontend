import { Section } from "./section";

export interface Sprint {
  id: number;
  uuid: string;
  section: Pick<Section, 'id' | 'title' | 'description' | 'lists'>;
  title: string;
  start_date: string;
  end_date: string;
  goal: string;
}

export interface CreateSprintDTO {
  title: string;
  start_date: string;
  end_date: string;
  goal: string;
}