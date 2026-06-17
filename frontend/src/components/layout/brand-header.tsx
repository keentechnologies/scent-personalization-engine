"use client";

import { motion } from "framer-motion";

export default function BrandHeader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
      className="flex items-center gap-2.5 px-6 pt-[max(1rem,env(safe-area-inset-top))] mt-4 md:mt-6 shrink-0"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-obsidian">
        <span className="font-serif text-[13px] font-semibold text-sand">C</span>
      </span>
      <span className="font-serif text-[17px] font-semibold tracking-tight text-obsidian">
        Crafted Sprays
      </span>
    </motion.div>
  );
}
