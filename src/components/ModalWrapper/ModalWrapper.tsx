import React, { FC, HTMLAttributes, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './ModalWrapper.css';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { createFocusTrap } from 'focus-trap';

interface ModalWrapperProps extends HTMLAttributes<HTMLElement> {
  alignX?: 'start' | 'center' | 'end';
  alignY?: 'start' | 'center' | 'end';
  onClose: VoidFunction;
  shown: boolean;
}
export const MODAL_LABEL_ID = 'modal-label-id';
export const MODAL_DESCRIPTION_ID = 'modal-description-id';

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  alignX = 'center',
  alignY = 'center',
  className,
  onClose,
  shown,
  ...restProps
}: ModalWrapperProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const trap = createFocusTrap(ref.current as HTMLDivElement, {
      allowOutsideClick: true,
    });
    const documentKeydownListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (shown) {
      trap.activate();
      document.addEventListener('keydown', documentKeydownListener);
    }

    return () => {
      trap.deactivate();
      document.removeEventListener(
        'keydown',
        documentKeydownListener
      );
    };
  }, [shown]);

  return createPortal(
    <CSSTransition
      in={shown}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={300}
      classNames="modal-wrapper-animation"
    >
      <div
        className={classNames(
          'modal-wrapper',
          `modal-wrapper--alignY-${alignY}`,
          `modal-wrapper--alignX-${alignX}`,
          className
        )}
        onClick={onClose}
        {...restProps}
        role="dialog"
        aria-labelledby={MODAL_LABEL_ID}
        aria-describedby={MODAL_DESCRIPTION_ID}
      >
        <div
          ref={ref}
          className="modal-wrapper__children"
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('overlay') as HTMLElement
  );
};
