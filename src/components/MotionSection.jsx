// src/components/MotionSection.jsx

import React from "react";
import { motion } from "framer-motion";

export default function MotionSection({
  children,
  delay = 0,
  y = 24,
  duration = 0.65,
  once = true,
  amount = 0.18,
  className = "",
}) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once,
        amount,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.section>
  );
}
