"use client";

import { motion } from "framer-motion";

export default function QuizTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
