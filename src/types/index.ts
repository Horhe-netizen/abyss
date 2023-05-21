export type TNode = {
  value: string;
  id: string;
  main: boolean;
  children?: TNode[];
};

export type Scale = {
  scale: number;
  label: string;
};

export enum TNodeInit {
  value = 'New Node'
}