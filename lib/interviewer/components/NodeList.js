import { entityPrimaryKeyProperty } from '@codaco/shared-consts';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { v4 } from 'uuid';
import { getCSSVariableAsString } from '~/lib/ui/utils/CSSVariables';
import {
  DragSource
} from '../behaviours/DragAndDrop';
import { useDropTarget } from '../behaviours/DragAndDrop/useDropTarget';
import createSorter from '../utils/createSorter';
import Node from './Node';

const EnhancedNode = DragSource(Node);


// TODO: fix drag and drop here, I'm removing unused code for now to remove linting warnings (Mirfayz Karimov)

export const NodeTransition = ({ children, delay, exit = false }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: '3rem' }}
    animate={{ opacity: 1, y: 0, scale: 1, transition: { delay } }}
    exit={{ opacity: 0, scale: 0, transition: { duration: exit ? 0.4 : 0 } }}
  >
    {children}
  </motion.div>
);

const NodeList = ({
  disableDragNew,
  items: initialItems = [],
  label = () => '',
  itemType = 'NODE',
  meta = {},
  hoverColor,
  className,
  stage: { id: stageId },
  externalData,
  sortOrder = [],
  onItemClick = () => undefined,
}) => {
  const [items] = useState(createSorter(sortOrder)(initialItems));
  const [stagger] = useState(true);
  const instanceId = useRef(v4());


  const {
    ref,
    isActive, // is the user dragging something?
    isOver, // is the user dragging something over this target?
    isValid, // is the user dragging something that can be dropped here?
  } = useDropTarget({
    id: instanceId.current,
    accepts: (stuff) => {
      console.log('accepts', stuff)
      return true;
    },
    onDrop: (stuff) => {
      console.log('ondrop', stuff)
    },
  })

  const classNames = cx('node-list', className, {
    'node-list--drag': isOver,
  });
  const hoverBackgroundColor =
    hoverColor || getCSSVariableAsString('--nc-light-background');
  const styles = isOver ? { backgroundColor: hoverBackgroundColor } : {};

  return (
    <motion.div className={classNames} style={styles} layout ref={ref}>
      <AnimatePresence mode="sync">
        {initialItems.map((node, index) => {
          const isDraggable =
            !(externalData && disableDragNew) &&
            !(disableDragNew && node.stageId !== stageId);
          return (
            <NodeTransition
              key={`${instanceId.current}-${node[entityPrimaryKeyProperty]}`}
              delay={stagger ? index * 0.05 : 0}
            >
              <EnhancedNode
                allowDrag={isDraggable}
                label={`${label(node)}`}
                meta={() => ({ ...node, itemType })}
                itemType={itemType}
                onClick={() => onItemClick(node)}
                {...node}
              />
            </NodeTransition>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

NodeList.propTypes = {
  disableDragNew: PropTypes.bool,
  stage: PropTypes.object.isRequired,
  className: PropTypes.string,
  hoverColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  isDragging: PropTypes.bool,
  isOver: PropTypes.bool,
  items: PropTypes.array,
  itemType: PropTypes.string,
  label: PropTypes.func,
  listId: PropTypes.string.isRequired,
  meta: PropTypes.object,
  onDrop: PropTypes.func,
  onItemClick: PropTypes.func,
  sortOrder: PropTypes.array,
};

export default NodeList;
