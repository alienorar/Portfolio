"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ShootingStarProps {
  delay?: number
}

export default function ShootingStar({ delay = 0 }: ShootingStarProps) {
  const [position, setPosition] = useState({
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    endX: Math.random() * 100,
    endY: Math.random() * 100,
  })

  useEffect(() => {
    const interval = setInterval(
      () => {
        setPosition({
          startX: Math.random() * 100,
          startY: Math.random() * 20,
          endX: Math.random() * 100,
          endY: Math.random() * 100 + 50,
        })
      },
      Math.random() * 10000 + 5000,
    ) // Random interval between 5-15 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="absolute w-0.5 h-0.5 bg-white rounded-full pointer-events-none"
      style={{
        left: `${position.startX}%`,
        top: `${position.startY}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
        x: [`${position.startX}%`, `${position.endX}%`],
        y: [`${position.startY}%`, `${position.endY}%`],
        scale: [1, 3, 1],
      }}
      transition={{
        duration: 1,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 20 + 10,
      }}
    >
      <div className="w-12 h-0.5 bg-gradient-to-r from-white via-white to-transparent -translate-x-full blur-[1px]"></div>
    </motion.div>
  )
}
