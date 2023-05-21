import { TNode } from '@/types';

function traverseTree(node: TNode, callback: (node: TNode) => void) {
  callback(node);

  node.children?.forEach((child) => {
    traverseTree(child, callback);
  });
}

export default traverseTree;
