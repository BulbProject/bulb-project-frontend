import React from 'react';

import { motion } from 'framer-motion';

export const FadeIn: React.FC = ({ children }) => {
  return (
    <motion.div
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
