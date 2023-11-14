'use client';
import { twMerge } from 'tailwind-merge';
import { Icon } from '@/components';
import { motion } from 'framer-motion';

type TModal = {
  className?: string;
  children: React.ReactNode;
  containerClass?: string;
  onClose: () => void;
  title?: string | React.ReactNode;
  withCloseButton?: boolean;
};

const Modal = ({
  className,
  children,
  containerClass,
  onClose,
  title,
  withCloseButton = true,
}: TModal) => {
  const onCloseHandler = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-full max-h-full w-full overflow-y-auto overflow-x-hidden bg-dark/80 p-4 md:inset-0 ">
      <motion.div
        initial={{ bottom: -120 }}
        animate={{ bottom: 0 }}
        transition={{ duration: 0.3 }}
        className={twMerge(
          'relative left-1/2 top-1/2 max-h-full w-full max-w-md -translate-x-2/4 -translate-y-2/4 bg-white dark:bg-black-rus',
          containerClass,
        )}
      >
        {withCloseButton && (
          <p className="flex justify-between">
            {title}
            <span onClick={onCloseHandler} className="cursor-pointer">
              <Icon name="close" width="20" height="20" />
            </span>
          </p>
        )}
        {/* Modal container */}
        <div className={twMerge('relative', className)}>{children}</div>
      </motion.div>
    </div>
  );
};

export default Modal;
