import type { TNode } from '@/types';

type Options = {
  value: string;
  main?: boolean;
  children?: TNode[];
};

function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function createNode(options: Options): TNode {
  const { main, value, children } = options; 

  return {
    value,
    main: !!main,
    id: generateId(),
    children: children || [],
  }
}

export default createNode;
