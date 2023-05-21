import Tree from '../Tree';
import BoardTools from '../BoardTools';

import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Scale } from '@/types';

import styles from './Board.module.scss';

function Board() {
  const [viewportScale, setViewportScale] = useState<Scale>({
    scale: 1,
    label: '100%',
  });
  const treeRef = useRef<HTMLUListElement | null>(null);
  const headerRef = useRef<HTMLHeadElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const headerHeight = useRef(0);

  const dragStart = { x: 0, y: 0 };
  const rect = { top: 0, left: 0 };
  let isDragged = false;

  function moveTreeToCenter(withTransition = false) {
    if (!treeRef.current || !viewportRef.current) {
      return;
    }

    const top =
      viewportRef.current.offsetHeight / 2 - treeRef.current.offsetHeight / 2;
    const left =
      viewportRef.current.offsetWidth / 2 - treeRef.current.offsetWidth / 2;

    if (withTransition) {
      treeRef.current.style.transition = '0.2s ease-in-out';
    } else {
      treeRef.current.style.transition = 'none'
    }

    treeRef.current.style.top = `${top}px`;
    treeRef.current.style.left = `${left}px`;
  }

  function onTreeMouseDownHandler() {
    isDragged = true;
  }

  function onBoardMouseDownHandler(
    evt: SyntheticEvent<HTMLDivElement, MouseEvent>
  ) {
    if (!treeRef.current) {
      return;
    }

    dragStart.x = evt.nativeEvent.clientX;
    dragStart.y = evt.nativeEvent.clientY - headerHeight.current;

    treeRef.current.style.transition = 'none';

    rect.top = parseInt(treeRef.current.style.top || '0px');
    rect.left = parseInt(treeRef.current.style.left || '0px');
  }

  function onMouseUpHandler() {
    isDragged = false;
  }

  function onMouseLeaveHandler() {
    isDragged = false;
  }

  function onMouseMoveHandler(evt: SyntheticEvent<HTMLDivElement, MouseEvent>) {
    if (!isDragged || !treeRef.current || !rect) {
      return;
    }

    const deltaX = (evt.nativeEvent.clientX - dragStart.x) / viewportScale.scale;
    const deltaY = (evt.nativeEvent.clientY - dragStart.y - headerHeight.current) / viewportScale.scale;

    treeRef.current.style.top = `${rect.top + deltaY}px`;
    treeRef.current.style.left = `${rect.left + deltaX}px`;
  }

  function onZoomHandler(opt: Scale) {
    setViewportScale(opt)
    moveTreeToCenter(true);
  }

  function scaleStyles() {
    return {
      transform: `scale(${viewportScale.scale})`,
    };
  }

  useEffect(() => {
    moveTreeToCenter();

    if (headerRef.current) {
      headerHeight.current = headerRef.current.offsetHeight;
    }
  }, []);

  return (
    <div className={styles['board']}>
      <header className={styles['board__header']} ref={headerRef}>
        <h1 className={styles['board__title']}>Services</h1>
        <BoardTools
          onMoveToCenter={() => moveTreeToCenter(true)}
          onZoom={onZoomHandler}
        />
      </header>
      <div
        className={styles['board__viewport']}
        onMouseMove={onMouseMoveHandler}
        onMouseLeave={onMouseLeaveHandler}
        onMouseDown={onBoardMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        ref={viewportRef}
      >
        <div className={styles['board__viewport-inner']} style={scaleStyles()}>
          <Tree ref={treeRef} onMouseDown={onTreeMouseDownHandler} />
        </div>
      </div>
    </div>
  );
}

export default Board;
