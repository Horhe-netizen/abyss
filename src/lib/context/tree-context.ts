import { TNode } from '@/types';
import { createContext } from 'react';

type TTreeContext = {
  tree: TNode;
  addNode: (parent: TNode) => void;
  deleteNode: (target: TNode) => void;
  editNode: (target: TNode, newValue: string) => void;
};

const treeContext = createContext<TTreeContext>({} as TTreeContext);

export default treeContext;
