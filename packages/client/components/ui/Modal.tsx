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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 right-0 top-0 z-50 flex h-full max-h-full w-full items-center justify-center overflow-x-hidden bg-dark/80 p-4 md:inset-0"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className={twMerge(
          'max-h-full w-full max-w-md  bg-white p-4 md:px-4 dark:bg-black-rus',
          containerClass,
        )}
      >
        {withCloseButton && (
          <p className="flex items-center justify-between">
            {title}
            <span onClick={onCloseHandler} className="ml-auto cursor-pointer">
              <Icon name="close" width="20" height="20" />
            </span>
          </p>
        )}
        <div className={twMerge('relative', className)}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
