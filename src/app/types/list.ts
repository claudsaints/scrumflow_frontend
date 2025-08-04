import { Card } from "./card";

export interface List {
  uuid: string;
  id: number;
  title: string;
  position: number;
  create_at: string;
  cardList: Card[];
}
