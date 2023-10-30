"use client";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components";
import { motion } from "framer-motion";

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
    if (typeof onClose === "function") {
      onClose();
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-dark/80 ">
      <motion.div
        initial={{ bottom: -120 }}
        animate={{ bottom: 0 }}
        transition={{ duration: 0.3 }}
        className={twMerge(
          "relative bg-white dark:bg-black-rus w-full max-w-md max-h-full top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4",
          containerClass
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
        <div className={twMerge("relative", className)}>{children}</div>
      </motion.div>
    </div>
  );
};

export default Modal;
