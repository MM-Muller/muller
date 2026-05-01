'use client'

import { useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const BRUSH_RADIUS = 70
const DECAY_MS = 700
const STEP_PX = 12   // was 5 — fewer points while blur still covers the gaps
const BLUR_PX = 14   // applied once to the composite, not per-stamp

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}
const NAV_FADE = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}
const NAV_LINK =
  'font-sans text-[10.5px] font-normal uppercase tracking-[0.16em] whitespace-nowrap ' +
  'text-[#1A1A1A]/65 transition-opacity duration-300 hover:opacity-40'

interface TrailPoint { x: number; y: number; t: number; angle: number }

export default function MaskReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvas1Ref = useRef<HTMLCanvasElement>(null)
  const canvas2Ref = useRef<HTMLCanvasElement>(null)
  const face1Ref = useRef<HTMLImageElement>(null)
  const face2Ref = useRef<HTMLImageElement>(null)
  const maskRef = useRef<HTMLCanvasElement | null>(null)
  const circleCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const trailRef = useRef<TrailPoint[]>([])
  const prevRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef<number>(0)
  const lastAngleRef = useRef<number>(0)

  const render = useCallback(() => {
    const c1 = canvas1Ref.current
    const c2 = canvas2Ref.current
    const f1 = face1Ref.current
    const f2 = face2Ref.current
    const con = containerRef.current
    const msk = maskRef.current
    const cir = circleCanvasRef.current
    if (!c1 || !c2 || !f1 || !f2 || !con || !msk || !cir) return

    const ctx1 = c1.getContext('2d')
    const ctx2 = c2.getContext('2d')
    const ctxM = msk.getContext('2d')
    const ctxC = cir.getContext('2d')
    if (!ctx1 || !ctx2 || !ctxM || !ctxC) return

    const now = performance.now()
    const w = con.offsetWidth
    const h = con.offsetHeight

    for (const c of [c1, c2, msk, cir]) {
      if (c.width !== w || c.height !== h) { c.width = w; c.height = h }
    }

    trailRef.current = trailRef.current.filter(p => now - p.t < DECAY_MS)
    const trail = trailRef.current
    const hasTrail = trail.length > 0

    // ── Step 1: draw plain ellipses to the circle canvas (zero blur, zero trig) ──
    // Using setTransform instead of save/translate/rotate/scale/restore
    // eliminates push/pop stack overhead per circle.
    ctxC.clearRect(0, 0, w, h)
    if (hasTrail) {
      ctxC.fillStyle = 'black'
      for (const p of trail) {
        const age = (now - p.t) / DECAY_MS
        ctxC.globalAlpha = 1 - age
        const cos = Math.cos(p.angle)
        const sin = Math.sin(p.angle)
        // setTransform encodes translate(px,py)·rotate(θ)·scale(2,1) in one call
        ctxC.setTransform(2 * cos, 2 * sin, -sin, cos, p.x, p.y)
        ctxC.beginPath()
        ctxC.arc(0, 0, BRUSH_RADIUS, 0, Math.PI * 2)
        ctxC.fill()
      }
      ctxC.setTransform(1, 0, 0, 1, 0, 0)
      ctxC.globalAlpha = 1
    }

    // ── Step 2: blur the composite ONCE into the mask canvas ─────────────────────
    // Previously blur ran once per stamp (N × blur cost). Now it's a single pass.
    ctxM.clearRect(0, 0, w, h)
    if (hasTrail) {
      ctxM.filter = `blur(${BLUR_PX}px)`
      ctxM.drawImage(cir, 0, 0)
      ctxM.filter = 'none'
    }

    // ── Step 3: composite with face images ───────────────────────────────────────
    ctx1.clearRect(0, 0, w, h)
    ctx1.drawImage(f1, 0, 0, w, h)
    if (hasTrail) {
      ctx1.globalCompositeOperation = 'destination-out'
      ctx1.drawImage(msk, 0, 0)
      ctx1.globalCompositeOperation = 'source-over'
    }

    ctx2.clearRect(0, 0, w, h)
    if (hasTrail) {
      ctx2.drawImage(msk, 0, 0)
      ctx2.globalCompositeOperation = 'source-in'
      ctx2.drawImage(f2, 0, 0, w, h)
      ctx2.globalCompositeOperation = 'source-over'
    }

    rafRef.current = requestAnimationFrame(render)
  }, [])

  useEffect(() => {
    maskRef.current = document.createElement('canvas')
    circleCanvasRef.current = document.createElement('canvas')
    const f1 = face1Ref.current
    const f2 = face2Ref.current
    if (!f1 || !f2) return

    let ready = 0
    const onLoad = () => { if (++ready === 2) rafRef.current = requestAnimationFrame(render) }

    if (f1.complete && f1.naturalWidth > 0) onLoad()
    else f1.addEventListener('load', onLoad, { once: true })
    if (f2.complete && f2.naturalWidth > 0) onLoad()
    else f2.addEventListener('load', onLoad, { once: true })

    return () => cancelAnimationFrame(rafRef.current)
  }, [render])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const now = performance.now()
    const prev = prevRef.current

    if (prev) {
      const dx = x - prev.x
      const dy = y - prev.y
      const angle = Math.atan2(dy, dx)
      lastAngleRef.current = angle
      const steps = Math.ceil(Math.hypot(dx, dy) / STEP_PX)
      for (let i = 1; i <= steps; i++) {
        const u = i / steps
        trailRef.current.push({ x: prev.x + dx * u, y: prev.y + dy * u, t: now, angle })
      }
    } else {
      trailRef.current.push({ x, y, t: now, angle: lastAngleRef.current })
    }

    prevRef.current = { x, y }
  }, [])

  const onMouseLeave = useCallback(() => { prevRef.current = null }, [])

  return (
    <section
      className="relative flex min-h-svh items-end justify-center"
      style={{ backgroundColor: '#FbFbFb' }}
      aria-label="Interactive mask reveal"
    >

      {/* ── Nav ──────────────────────────────────────────────────────────────── */}
      <motion.header
        className="absolute inset-x-0 top-0 z-10 flex items-start justify-between"
        style={{ padding: '1.5vw 2vw' }}
        variants={NAV_FADE}
        initial="hidden"
        animate="visible"
        aria-label="Main header"
      >
        <nav aria-label="Left navigation">
          <Link href="/works" className={NAV_LINK}>Work</Link>
        </nav>
        <nav className="flex gap-10" aria-label="Right navigation">
          <Link href="/about" className={NAV_LINK}>About</Link>
          <Link href="/#contact" className={NAV_LINK}>Contact</Link>
        </nav>
      </motion.header>

      {/* ── Image container ──────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative select-none"
        style={{ cursor: 'crosshair' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <img src="/face1.png" alt="" aria-hidden="true" draggable={false} className="block h-[92svh] w-auto invisible" />
        <img ref={face1Ref} src="/face1.png" alt="Matheus Muller" draggable={false} className="hidden" />
        <img ref={face2Ref} src="/face2.png" alt="" aria-hidden="true" draggable={false} className="hidden" />
        <canvas ref={canvas1Ref} className="absolute inset-0 h-full w-full" />
        <canvas ref={canvas2Ref} className="absolute inset-0 h-full w-full" />
      </div>

      {/* ── Bottom left ───────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-8 z-10 max-w-[360px]"
        variants={FADE_UP}
        initial="hidden"
        animate="visible"
        custom={0.6}
      >
        <p className="mb-3 text-[10px] uppercase tracking-[0.22em] font-normal text-[#1A1A1A]/55">
          Introducing Muller &amp; Co. Engineering
        </p>
        <p className="text-[13px] font-light leading-relaxed tracking-wide text-[#1A1A1A]/60">
          Matheus, Software Engineer &amp; Automation Architect. A celebration of
          intelligent design, systemic automation, and high-performance
          software engineering.
        </p>
      </motion.div>

      {/* ── Bottom right ─────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-6 right-8 z-10 text-right leading-none"
        variants={FADE_UP}
        initial="hidden"
        animate="visible"
        custom={0.85}
      >
        <p
          className="font-display font-light tracking-[0.14em] text-[#1A1A1A]/50"
          style={{ fontSize: '1.55rem' }}
        >
          Matheus
        </p>
        <p
          className="font-display font-semibold tracking-[-0.02em] text-[#1A1A1A] uppercase"
          style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1 }}
        >
          Müller
        </p>
      </motion.div>

    </section>
  )
}
