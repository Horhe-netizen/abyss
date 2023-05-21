import traverseTree from './traverse-tree';
import type { TNode } from '@/types';

function getNewTree(tree: TNode, callback: (node: TNode) => void) {
  const result = {...tree};

  traverseTree(result, callback);

  return result;
}

export default getNewTree;
