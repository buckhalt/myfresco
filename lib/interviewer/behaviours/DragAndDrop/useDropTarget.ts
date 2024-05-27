import { useEffect, useRef } from 'react';
import { actionCreators } from './reducer';
import store from './store';

export const useDropTarget = ({
  id,
  onDrop,
  onDrag,
  onDragEnd,
  accepts,
}: {
  id: string;
  onDrop: (item: unknown) => void;
  onDrag?: (item: unknown) => void;
  onDragEnd?: (item: unknown) => void;
  accepts: (item: unknown) => boolean;
}) => {
  const componentRef = useRef<HTMLElement>(null);

  const updateTarget = () => {
    if (!componentRef.current) {
      return;
    }

    const boundingClientRect = componentRef.current.getBoundingClientRect();

    store.dispatch(
      actionCreators.upsertTarget({
        id,
        onDrop,
        onDrag,
        onDragEnd,
        accepts,
        width: boundingClientRect.width,
        height: boundingClientRect.height,
        y: boundingClientRect.top,
        x: boundingClientRect.left,
      }),
    );
  };

  useEffect(() => {
    updateTarget();

    return () => {
      store.dispatch(actionCreators.removeTarget(id));
    };
  }, []);

  const isActive = !!store.getState().source;

  const isOver = store
    .getState()
    .targets.some((target) => target.id === id && target.isOver);

  // To calculate is valid, call the accepts function with the source item
  // and memoize the result
  const isValid = accepts(store.getState().source);

  return {
    ref: componentRef,
    isActive,
    isOver,
    isValid,
  };
};
