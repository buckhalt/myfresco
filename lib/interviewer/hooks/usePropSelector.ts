import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * Converts legacy react-redux selectors that take a props argument
 * into ones that can be used with useSelector.
 *
 * Usage:
 *
 * const oldSelector = (state, props) => {};
 *
 * const results = usePropSelector(oldSelector, props);
 *
 * or for factory style selectors:
 *
 * const makeOldSelector = (config) => (state, props) => {};
 *
 * const results = usePropSelector(makeOldSelector, props, true);
 */
const usePropSelector = (
  selector: (state: unknown, props: Record<string, unknown>) => unknown,
  props: Record<string, unknown>,
  equalityFn: (a: unknown, b: unknown) => boolean = Object.is,
) => {
  const memoizedSelector = useMemo(() => {
    return selector;
  }, [selector]);

  const selectorWithProps = useCallback(
    (state: unknown) => memoizedSelector(state, props),
    [props, memoizedSelector],
  );

  const state = useSelector(selectorWithProps, equalityFn);

  return state;
};

export default usePropSelector;