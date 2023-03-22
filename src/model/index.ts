export type IModule =
  | 'weekly'
  | 'rewrite'
  | 'abstract'
  | 'email'
  | 'english_write'
  | 'marketing_write';

export interface IChat {
  reverse?: boolean;
  text: string | React.ReactNode;
  time: string;
}
