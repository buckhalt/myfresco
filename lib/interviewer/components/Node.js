import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { getEntityAttributes } from '~/lib/interviewer/ducks/modules/network';
import UINode from '~/lib/ui/components/Node';
import {
  getNodeColor, labelLogic,
} from '../selectors/network';
import { getProtocolCodebook } from '../selectors/protocol';

/**
  * Renders a Node.
  */

const Node = forwardRef((props, ref) => {
  const { type } = props;

  const color = useSelector(getNodeColor(type));
  const codebook = useSelector(getProtocolCodebook);
  const label = labelLogic(codebook.node[type], getEntityAttributes(props));

  return (
    <UINode
      ref={ref}
      color={color}
      {...props}
      label={label}
    />
  );
});

Node.displayName = 'Node';

export default Node;

