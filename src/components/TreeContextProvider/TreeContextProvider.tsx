import TreeContext from '@/lib/context/tree-context';
import getNewTree from '@/lib/helpers/get-new-tree';
import createNode from '@/lib/helpers/create-node';
import { TNode, TNodeInit } from '@/types';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
};

function TreeContextProvider(props: Props) {
  const [tree, setTree] = useState(createNode({ value: 'Master Node', main: true }));

  function addNode(parent: TNode) {
    setTree(
      getNewTree(tree, (node) => {
        if (node.id === parent.id) {
          node.children = [...(node.children || [])];
          node.children.push(
            createNode({
              value: TNodeInit.value,
            })
          );
        }
      })
    );
  }

  function deleteNode(target: TNode) {
    setTree(
      getNewTree(tree, (node) => {
        node.children?.forEach((child, idx) => {
          if(child.id === target.id) {
            node.children?.splice(idx, 1);
          }
        })
      })
    );
  }

  function editNode(target: TNode, newValue: string) {
    setTree(
      getNewTree(tree, (node) => {
        if (target.id === node.id) {
          node.value = newValue
        }
      })
    );
  }

  return (
    <TreeContext.Provider value={{ tree, addNode, deleteNode, editNode }}>
      {props.children}
    </TreeContext.Provider>
  );
}

export default TreeContextProvider;
