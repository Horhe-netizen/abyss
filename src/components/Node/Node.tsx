import NodeButtons from '../NodeButtons';

import TreeContext from '@/lib/context/tree-context';
import { useContext, useEffect, useState } from 'react';
import { TNode, TNodeInit } from '@/types';

import styles from './Node.module.scss';

type Props = {
  node: TNode;
};

function Node(props: Props) {
  const { editNode } = useContext(TreeContext);
  const [value, setValue] = useState(props.node.value);
  const [isEdit, setIsEdit] = useState(true);

  const children = () => {
    if (props.node.children?.length) {
      return (
        <ul className={styles['node__children']}>
          {props.node.children.map((child) => {
            return <Node node={child} key={child.id} />;
          })}
        </ul>
      );
    }

    return null;
  };

  const nodeContent = () => {
    if (isEdit) {
      return (
        <input
          type="test"
          className={styles['node__content-input']}
          value={value}
          readOnly={!isEdit}
          onChange={(evt) => setValue(evt.target.value)}
        />
      );
    }

    return <span className={styles['node__content-value']}>{value}</span>;
  };

  function onSaveHandler() {
    setIsEdit(false);
    editNode(props.node, value);
  }

  function onUnsaveHandler() {
    setValue(TNodeInit.value);
    setIsEdit(false);
  }

  function onEditHandler() {
    setIsEdit(true);
  }

  useEffect(() => {
    if (props.node.main) {
      editNode(props.node, value);
    }
  }, [value]);

  return (
    <li
      className={`${styles['node']} ${props.node.main && styles['node--main']}`}
    >
      <div
        className={`${styles['node__content']} ${
          isEdit && styles['node__content--edit']
        }`}
      >
        {nodeContent()}
        <NodeButtons
          isEdit={isEdit}
          node={props.node}
          onSave={onSaveHandler}
          onUnsave={onUnsaveHandler}
          onEdit={onEditHandler}
        />
      </div>
      {children()}
    </li>
  );
}

export default Node;
