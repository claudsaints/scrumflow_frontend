import { List } from "./list";



export interface Section {
  id: number;
  uuid: string;
  title: string;
  description: string;
  lists: List[];
}

export interface SimpleSection {
  uuid: string;
  title: string;
  description: string;
}
