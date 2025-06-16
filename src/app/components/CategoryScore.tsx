"use client";

import { motion } from "motion/react";
import Link from "next/link";

export const CategoryScore = ({
  pageSpeedLink,
  score,
}: {
  pageSpeedLink: string;
  score: number;
}) => {
  const getColors = (score: number) => {
    if (score === 0) {
      return {
        background: "#fef2f2",
        color: "#991b1b",
        ring: "#ef4444",
      };
    }
    if (score === 100) {
      return {
        background: "#f0fdf4",
        color: "#166534",
        ring: "#16a34a",
      };
    }
    if (score >= 90) {
      return {
        background: "#f0fdf4",
        color: "#166534",
        ring: "#4ade80",
      };
    }
    if (score >= 50) {
      return {
        background: "#fefce8",
        color: "#854d0e",
        ring: "#eab308",
      };
    }
    {
      return {
        background: "#fef2f2",
        color: "#991b1b",
        ring: "#ef4444",
      };
    }
  };

  const { background, color, ring } = getColors(score);

  return (
    <>
      <Link
        className="flex justify-center items-center"
        href={pageSpeedLink}
        target="_blank"
      >
        <svg className="w-full h-full">
          <motion.circle
            cx="50%"
            cy="50%"
            r="38"
            fill={background}
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.5,
            }}
            viewport={{ once: true }}
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="40"
            fill="none"
            stroke={ring}
            strokeWidth="5"
            pathLength="100"
            initial={{
              strokeDasharray: `0 100`,
            }}
            whileInView={{
              strokeDasharray: `${score} 100`,
            }}
            transition={{
              visualDuration: 0.75,
              bounce: 0.25,
              type: "spring",
            }}
            viewport={{ once: true }}
          />
          <motion.text
            x="50%"
            y="51%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={color}
            fontWeight="bold"
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
              scale: [1, 1.2, 1],
            }}
            transition={{
              delay: 0.25,
              duration: 0.5,
            }}
            viewport={{ once: true }}
          >
            {Math.round(score) || "N/A"}
            {score > 0 && <tspan className="text-xs">%</tspan>}
          </motion.text>
        </svg>
      </Link>
    </>
  );
};
