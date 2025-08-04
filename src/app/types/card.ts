

export interface Label {
  id: number;
  name: string;
  color: string;
  cards: string[];
}

export enum CardType {
  FEATURE = 'FEATURE',
  TASK = 'TASK',
  INTEGRATION = 'INTEGRATION',
  CODE_REVIEW = 'CODE_REVIEW',
  SETUP = 'SETUP',
  DOCUMENTATION = 'DOCUMENTATION',
  DESIGN = 'DESIGN',
  BUG = 'BUG',
}

export interface Card {
  id: number;
  uuid: string;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  type: CardType;
  story_point: number;
  labels: [];
}

export interface UpdateCardDto {
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  type: CardType;
  storyPoint: number;
  labels: Label[];
}
