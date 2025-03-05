"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BentoCardProps } from "@/types";

export const BentoCard = ({ children, className }: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-lg border border-teal-500 bg-white shadow-lg hover:shadow-teal-500/20 transition-shadow",
        className
      )}
    >
      {children}
    </motion.div>
  );
}; 