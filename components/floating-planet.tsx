"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface FloatingPlanetProps {
  size: number
  color: string
  position: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  hasRings?: boolean
  hasMoons?: boolean
  moonCount?: number
}

export default function FloatingPlanet({
  size,
  color,
  position,
  hasRings = false,
  hasMoons = false,
  moonCount = 1,
}: FloatingPlanetProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Generate moons if enabled
  const moons = []
  if (hasMoons) {
    for (let i = 0; i < moonCount; i++) {
      const angle = (i / moonCount) * Math.PI * 2
      const distance = size * 0.8
      moons.push({
        size: size * 0.2,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        orbitSpeed: 0.5 + Math.random() * 0.5,
        orbitOffset: Math.random() * Math.PI * 2,
      })
    }
  }

  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        ...position,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
      transition={{ duration: 1.5 }}
    >
      {/* Planet body */}
      <motion.div
        className={`w-full h-full rounded-full ${color} relative overflow-hidden`}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {/* Surface details */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute w-[30%] h-[20%] bg-white/10 rounded-full blur-md"
            style={{ top: "20%", left: "10%" }}
          ></div>
          <div
            className="absolute w-[40%] h-[15%] bg-white/10 rounded-full blur-md"
            style={{ top: "60%", left: "50%" }}
          ></div>
          <div
            className="absolute w-[25%] h-[25%] bg-black/20 rounded-full blur-sm"
            style={{ top: "30%", left: "60%" }}
          ></div>
        </div>
      </motion.div>

      {/* Rings if enabled */}
      {hasRings && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[30%] rounded-full border-4 border-violet-500/30 -rotate-12"></div>
      )}

      {/* Moons if enabled */}
      {hasMoons &&
        moons.map((moon, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-gray-300"
            style={{
              width: moon.size,
              height: moon.size,
              top: "50%",
              left: "50%",
              marginLeft: -moon.size / 2,
              marginTop: -moon.size / 2,
            }}
            animate={{
              x: [moon.x, -moon.x, moon.x],
              y: [moon.y, -moon.y, moon.y],
            }}
            transition={{
              duration: 10 / moon.orbitSpeed,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: moon.orbitOffset,
            }}
          />
        ))}

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full blur-md bg-violet-500/20 -z-10 scale-110"></div>
    </motion.div>
  )
}
