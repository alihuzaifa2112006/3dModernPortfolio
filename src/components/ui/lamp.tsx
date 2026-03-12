import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-end overflow-hidden bg-[#0a0a0a]",
        className
      )}
      style={{ minHeight: "260px" }}
    >
      {/* Lamp lights - positioned at top */}
      <div className="absolute inset-x-0 top-0 flex h-full scale-y-100 items-start justify-center">
        {/* Left cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "12rem" }}
          whileInView={{ opacity: 1, width: "26rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            top: "2.5rem",
          }}
          className="absolute right-1/2 h-44 overflow-visible w-[26rem] bg-gradient-conic from-[#c5f82a] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 bg-[#0a0a0a] h-24 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-32 h-full left-0 bg-[#0a0a0a] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "12rem" }}
          whileInView={{ opacity: 1, width: "26rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            top: "2.5rem",
          }}
          className="absolute left-1/2 h-44 w-[26rem] bg-gradient-conic from-transparent via-transparent to-[#c5f82a] text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-32 h-full right-0 bg-[#0a0a0a] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-[#0a0a0a] h-24 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Glow blur */}
        <div className="absolute top-0 inset-x-0 h-32 w-full bg-[#0a0a0a] blur-2xl" style={{ top: "10rem" }} />

        {/* Green glow orb */}
        <div className="absolute top-0 z-30 h-28 w-[22rem] rounded-full bg-[#c5f82a] opacity-15 blur-3xl" style={{ top: "4rem", left: "50%", transform: "translateX(-50%)" }} />
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "14rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute z-20 h-28 rounded-full bg-[#c5f82a] blur-2xl opacity-25"
          style={{ top: "1rem", left: "50%", transform: "translateX(-50%)" }}
        />
        {/* Bright line at top */}
        <motion.div
          initial={{ width: "12rem" }}
          whileInView={{ width: "26rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute z-40 h-0.5 bg-[#c5f82a]"
          style={{ top: "2.5rem", left: "50%", transform: "translateX(-50%)" }}
        />
      </div>

      {/* Content sits at the bottom, in the glow zone */}
      <div className="relative z-50 flex w-full flex-col items-center pb-10 pt-32 px-5">
        {children}
      </div>
    </div>
  );
};
