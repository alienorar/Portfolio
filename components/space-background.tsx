"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useThree } from "@/hooks/useThree"

export default function SpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const threeLib = useThree()

  // Create stars
  useEffect(() => {
    if (!canvasRef.current || !threeLib) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Star properties
    const stars: { x: number; y: number; radius: number; opacity: number; speed: number }[] = []
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 1000) // Adjust density

    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.05,
      })
    }

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Twinkle effect
        star.opacity = Math.sin(Date.now() * star.speed) * 0.4 + 0.6

        // Subtle movement
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [threeLib])

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)" }}
      />

      {/* Planets */}
      <Planet
        size={120}
        position={{ top: "15%", right: "10%" }}
        color="bg-gradient-to-br from-violet-800 to-indigo-900"
        delay={0}
        rings={true}
      />

      <Planet
        size={80}
        position={{ bottom: "20%", left: "5%" }}
        color="bg-gradient-to-br from-indigo-700 to-blue-900"
        delay={0.3}
      />

      <Planet
        size={40}
        position={{ top: "30%", left: "15%" }}
        color="bg-gradient-to-br from-violet-600 to-fuchsia-900"
        delay={0.6}
      />

      {/* Distant galaxy */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-2xl"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(79,70,229,0.2) 50%, transparent 70%)",
          top: "60%",
          right: "20%",
          transform: "rotate(-15deg) scale(2)",
        }}
      />

      {/* Nebula effect */}
      <div
        className="absolute w-full h-full opacity-10"
        style={{
          background:
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+CiAgICA8ZmVCbGVuZCBtb2RlPSJzY3JlZW4iLz4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjQiLz4KPC9zdmc+')",
          backgroundSize: "cover",
          mixBlendMode: "screen",
        }}
      />
    </div>
  )
}

interface PlanetProps {
  size: number
  position: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  color: string
  delay: number
  rings?: boolean
}

function Planet({ size, position, color, delay, rings = false }: PlanetProps) {
  return (
    <motion.div
      className="absolute rounded-full shadow-lg"
      style={{
        width: size,
        height: size,
        ...position,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay }}
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

      {/* Rings (if enabled) */}
      {rings && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[30%] rounded-full border-4 border-violet-500/30 -rotate-12"></div>
      )}

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full blur-md bg-violet-500/20 -z-10 scale-110"></div>
    </motion.div>
  )
}
