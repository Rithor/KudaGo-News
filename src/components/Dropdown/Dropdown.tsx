import React, {
  FC,
  HTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import './Dropdown.css';
import classNames from 'classnames';
import throttle from 'lodash.throttle';
import { CSSTransition } from 'react-transition-group';
import { createFocusTrap } from 'focus-trap';

interface DropdownProps extends HTMLAttributes<HTMLElement> {
  targetRef: RefObject<HTMLElement>;
  shown: boolean;
  onShownChange: (shown: boolean) => void;
}

const calcCoords = (targetElement: HTMLElement) => {
  const rect = targetElement.getBoundingClientRect();
  return {
    top: window.scrollY + rect.bottom + 12,
    right: window.innerWidth - rect.right - window.scrollX,
  };
};

export const Droprown: FC<DropdownProps> = ({
  targetRef,
  shown,
  onShownChange,
  children,
  style,
  className,
  ...restProps
}: DropdownProps) => {
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const trap = createFocusTrap(ref.current as HTMLDivElement, {
      allowOutsideClick: true,
    });
    setCoords(calcCoords(targetRef.current as HTMLElement));
    const windowResizeListener = throttle(() => {
      setCoords(calcCoords(targetRef.current as HTMLElement));
    }, 100);
    if (shown) {
      trap.activate();
      document.addEventListener('click', documentClickListener);
      window.addEventListener('resize', windowResizeListener);
    }
    return () => {
      trap.deactivate();
      document.removeEventListener('click', documentClickListener);
      window.removeEventListener('resize', windowResizeListener);
    };
  }, [shown]);

  const documentClickListener = () => {
    onShownChange(false);
  };
  return createPortal(
    <CSSTransition
      in={shown}
      timeout={300}
      mountOnEnter={true}
      unmountOnExit={true}
      classNames="dropdown-animation"
    >
      <div
        ref={ref}
        {...restProps}
        className={classNames('dropdown', className)}
        style={{ ...style, ...coords }}
      >
        {children}
      </div>
    </CSSTransition>,
    document.getElementById('overlay') as HTMLElement
  );
};
