import TreeContext from '@/lib/context/tree-context';
import { useContext } from 'react';
import { TNode } from '@/types';

import { ReactComponent as PenIcon } from '@/assets/pen.svg';
import { ReactComponent as PlusIcon } from '@/assets/plus.svg';
import { ReactComponent as CrossIcon } from '@/assets/cross.svg';
import { ReactComponent as CheckIcon } from '@/assets/check.svg';
import styles from './NodeButtons.module.scss';

type Props = {
  node: TNode;
  isEdit: boolean;
  onSave: () => void;
  onUnsave: () => void;
  onEdit: () => void;
};

function NodeButtons(props: Props) {
  const { addNode, deleteNode } = useContext(TreeContext);

  const content = () => {
    if (props.node.main) {
      return plusButton();
    }

    if (props.isEdit) {
      return editButtons();
    }

    return defaultButtons();
  };

  const editButtons = () => {
    return (
      <>
        <button
          className={`${styles['buttons__node-btn']} ${styles['buttons__node-btn--undo']}`}
          onClick={props.onUnsave}
        >
          <CrossIcon className={styles['buttons__node-btn-icon']} />
        </button>
        <button
          className={`${styles['buttons__node-btn']} ${styles['buttons__node-btn--confirm']}`}
          onClick={props.onSave}
        >
          <CheckIcon className={styles['buttons__node-btn-icon']} />
        </button>
      </>
    );
  };

  const defaultButtons = () => {
    return (
      <>
        {plusButton()}
        <button className={styles['buttons__node-btn']} onClick={props.onEdit}>
          <PenIcon className={styles['buttons__node-btn-icon']} />
        </button>
        <button
          className={`${styles['buttons__node-btn']} ${styles['buttons__node-btn--delete']}`}
          onClick={() => deleteNode(props.node)}
        >
          <CrossIcon className={styles['buttons__node-btn-icon']} />
        </button>
      </>
    );
  };

  const plusButton = () => {
    return (
      <button
        className={styles['buttons__node-btn']}
        onClick={() => addNode(props.node)}
      >
        <PlusIcon className={styles['buttons__node-btn-icon']} />
      </button>
    );
  };

  return <div className={styles['buttons']}>{content()}</div>;
}

export default NodeButtons;
