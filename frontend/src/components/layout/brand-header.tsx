"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandHeader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
      className="flex items-center gap-2 px-6 pt-[max(1.25rem,env(safe-area-inset-top))] mt-4 md:mt-6 shrink-0"
    >
      <Image
        src="/assets/logo.png"
        alt="Crafted Sprays Logo"
        width={40}
        height={40}
        className="h-10 w-auto"
        priority
      />
      <span className="heading-serif text-[19px] tracking-[.03em] text-[#f3efe8] font-semibold">
        Crafted Sprays
      </span>
    </motion.div>
  );
}
