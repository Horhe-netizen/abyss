import { useEffect, useRef, useState } from 'react';
import useClickOutside from '@/lib/hooks/use-click-outside';
import { Scale } from '@/types';

import styles from './BoardTools.module.scss';
import { ReactComponent as LocationArrowIcon } from '@/assets/location-arrow.svg';
import { ReactComponent as MinusIcon } from '@/assets/minus.svg';
import { ReactComponent as PlusIcon } from '@/assets/plus.svg';

type Props = {
  onMoveToCenter: () => void;
  onZoom: (opt: Scale) => void
};

const scaleOptions = [
  {
    scale: 0.25,
    label: '25%',
  },
  {
    scale: 0.3,
    label: '30%',
  },
  {
    scale: 0.4,
    label: '40%',
  },
  {
    scale: 0.5,
    label: '50%',
  },
  {
    scale: 0.6,
    label: '60%',
  },
  {
    scale: 0.7,
    label: '70%',
  },
  {
    scale: 0.8,
    label: '80%',
  },
  {
    scale: 0.9,
    label: '90%',
  },
  {
    scale: 1,
    label: '100%',
  },
  {
    scale: 1.25,
    label: '125%',
  },
  {
    scale: 1.5,
    label: '150%',
  },
];

function BoardTools(props: Props) {
  const [currentScale, setCurrentScale] = useState({
    scale: 1,
    label: '100%',
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(selectRef, hideDropdown);

  const dropdown = () => {
    if (dropdownVisible) {
      return (
        <ul className={styles['tools__scale-select-dropdown']}>
          {dropdownOptions()}
        </ul>
      );
    }

    return null;
  };

  const dropdownOptions = () => {
    return scaleOptions.map((option) => {
      return (
        <li
          className={styles['tools__dropdown-option']}
          key={option.scale}
          onClick={() => setCurrentScale(option)}
        >
          {option.label}
        </li>
      );
    });
  };

  function zoomIn() {
    const idx = scaleOptions.findIndex((opt) => opt.scale === currentScale.scale);

    if (scaleOptions[idx + 1]) {
      setCurrentScale(scaleOptions[idx + 1]);
    }
  }

  function zoomOut() {
    const idx = scaleOptions.findIndex((opt) => opt.scale === currentScale.scale);

    if (scaleOptions[idx - 1]) {
      setCurrentScale(scaleOptions[idx - 1]);
    }
  }

  function toggleDropdown() {
    setDropdownVisible((prevState) => !prevState);
  }

  function hideDropdown() {
    setDropdownVisible(false);
  }

  useEffect(() => {
    props.onZoom(currentScale);
  }, [currentScale, props]);

  return (
    <div className={styles['tools']}>
      <button className={styles['tools__list-view']}>List view</button>
      <button
        className={styles['tools__move-to-center']}
        onClick={props.onMoveToCenter}
      >
        <LocationArrowIcon className={styles['tools__move-to-center-icon']} />
      </button>
      <div className={styles['tools__scale']}>
        <button className={styles['tools__scale-btn']} onClick={zoomOut}>
          <MinusIcon className={styles['tools__scale-btn-icon']} />
        </button>
        <div
          className={styles['tools__scale-select']}
          ref={selectRef}
          onClick={toggleDropdown}
        >
          <span className={styles['tools__scale-select-value']}>
            {currentScale.label}
          </span>
          {dropdown()}
        </div>
        <button className={styles['tools__scale-btn']} onClick={zoomIn}>
          <PlusIcon className={styles['tools__scale-btn-icon']} />
        </button>
      </div>
    </div>
  );
}

export default BoardTools;
