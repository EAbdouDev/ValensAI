import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Wave: React.FC<{ color: string; duration: number; delay: number }> = ({
  color,
  duration,
  delay,
}) => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      initial={{
        d: "M0,128L40,144C80,160,160,192,240,181.3C320,171,400,117,480,101.3C560,85,640,107,720,138.7C800,171,880,213,960,208C1040,203,1120,149,1200,117.3C1280,85,1360,75,1400,69.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z",
      }}
      animate={{ y: [0, -20, 0] }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <svg
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          fill={color}
          d="M0,128L40,144C80,160,160,192,240,181.3C320,171,400,117,480,101.3C560,85,640,107,720,138.7C800,171,880,213,960,208C1040,203,1120,149,1200,117.3C1280,85,1360,75,1400,69.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </svg>
    </motion.div>
  );
};

export default Wave;
