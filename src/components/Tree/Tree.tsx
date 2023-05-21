import Node from '../Node';

import TreeContext from '@/lib/context/tree-context';
import { forwardRef, useContext } from 'react';

import styles from './Tree.module.scss';

type Props = {
  onMouseDown: () => void;
}

const Tree = forwardRef<HTMLUListElement, Props>((props, ref) => {
  const { tree } = useContext(TreeContext);

  function onMouseDownHandler() {
    props.onMouseDown()
  }

  return (
    <ul
      className={styles['tree']}
      onMouseDown={onMouseDownHandler}
      ref={ref}
    >
      <Node node={tree} />
    </ul>
  );
})


export default Tree;
