import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import getAbsoluteBoundingRect from '../../utils/getAbsoluteBoundingRect';
import { actionCreators as actions } from './reducer';
import store from './store';


const dropTarget = (WrappedComponent) => {
  const DropTarget = ({ id, onDrop, onDrag, onDragEnd, accepts, meta, ...props }) => {
    const componentRef = useRef(null);
    const nodeRef = useRef(null);

    const removeTarget = () => {
      store.dispatch(actions.removeTarget(id));
    };

    const updateTarget = () => {
      if (!nodeRef.current) {
        return;
      }

      const boundingClientRect = getAbsoluteBoundingRect(nodeRef.current);

      store.dispatch(
        actions.upsertTarget({
          id,
          onDrop,
          onDrag,
          onDragEnd,
          accepts,
          meta: meta && meta(),
          width: boundingClientRect.width,
          height: boundingClientRect.height,
          y: boundingClientRect.top,
          x: boundingClientRect.left,
        }),
      );
    };

    const update = () => {
      updateTarget();
    };

    useEffect(() => {
      if (componentRef.current) {
        nodeRef.current = componentRef.current;
        update();
      }
      return () => {
        removeTarget();
      };
    }, []);

    return <WrappedComponent ref={componentRef} {...props} />;
  };

  DropTarget.propTypes = {
    id: PropTypes.string.isRequired,
    onDrop: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    accepts: PropTypes.func,
    meta: PropTypes.func,
  };

  return DropTarget;
};

export default dropTarget;
