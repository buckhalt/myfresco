import getInterface from './Interfaces';
import StageErrorBoundary from '../components/StageErrorBoundary';
import { motion } from 'framer-motion';
import type { directions } from '../hooks/useNavigationHelpers';

type StageProps = {
  stage: {
    id: string;
    type: string;
  };
  registerBeforeNext: (fn: (direction: directions) => Promise<boolean>) => void;
};

const Stage = (props: StageProps) => {
  const { stage, registerBeforeNext } = props;
  const CurrentInterface = getInterface(stage.type) as unknown as JSX.Element;

  return (
    <motion.div
      className="flex-grow-1 basis-full"
      key={stage.id}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        type: 'spring',
        damping: 20,
      }}
    >
      <StageErrorBoundary>
        {CurrentInterface && (
          // @ts-expect-error I can't work out how to correctly type this...
          <CurrentInterface
            registerBeforeNext={registerBeforeNext}
            stage={stage}
          />
        )}
      </StageErrorBoundary>
    </motion.div>
  );
};

export default Stage;