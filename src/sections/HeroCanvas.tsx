import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
  phase: number
  speed: number
  type: 'spray' | 'leaf' | 'sand' | 'gold'
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Colors matching the product photos' golden hour aesthetic
    const colors = {
      spray: ['rgba(232, 212, 160, ', 'rgba(201, 169, 110, ', 'rgba(245, 241, 230, '],
      leaf: ['rgba(74, 93, 35, ', 'rgba(100, 120, 50, ', 'rgba(58, 74, 30, '],
      sand: ['rgba(201, 169, 110, ', 'rgba(180, 150, 90, ', 'rgba(220, 195, 140, '],
      gold: ['rgba(201, 162, 39, ', 'rgba(232, 196, 80, ', 'rgba(180, 145, 30, '],
    }

    const createParticle = (): Particle => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const types: Particle['type'][] = ['spray', 'spray', 'spray', 'gold', 'gold', 'leaf', 'sand']
      const type = types[Math.floor(Math.random() * types.length)]
      const colorArr = colors[type]
      const color = colorArr[Math.floor(Math.random() * colorArr.length)]

      return {
        x: Math.random() * w,
        y: h + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.5 - 0.3,
        size: Math.random() * (type === 'spray' ? 3 : type === 'leaf' ? 5 : 2) + 1,
        alpha: Math.random() * 0.6 + 0.2,
        color,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        type,
      }
    }

    // Initialize particles
    const particleCount = Math.min(300, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 4000))
    particlesRef.current = Array.from({ length: particleCount }, createParticle)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }
    }
    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchend', handleTouchEnd)

    let time = 0
    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      time += 1

      ctx.clearRect(0, 0, w, h)

      // Draw sunset gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, h)
      gradient.addColorStop(0, '#5a7a8a')    // Soft sea blue at top
      gradient.addColorStop(0.35, '#8fa8b5') // Lighter blue
      gradient.addColorStop(0.55, '#c9a96e') // Golden sand
      gradient.addColorStop(0.72, '#e8d4a0') // Bright gold
      gradient.addColorStop(0.85, '#d4a574') // Warm orange-sand
      gradient.addColorStop(1, '#c9a96e')    // Deep sand at bottom
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      // Draw sun glow at horizon
      const sunY = h * 0.62
      const sunGradient = ctx.createRadialGradient(w * 0.7, sunY, 0, w * 0.7, sunY, h * 0.4)
      sunGradient.addColorStop(0, 'rgba(232, 196, 120, 0.35)')
      sunGradient.addColorStop(0.3, 'rgba(212, 165, 116, 0.2)')
      sunGradient.addColorStop(0.6, 'rgba(201, 169, 110, 0.08)')
      sunGradient.addColorStop(1, 'rgba(201, 169, 110, 0)')
      ctx.fillStyle = sunGradient
      ctx.fillRect(0, 0, w, h)

      // Draw subtle wave lines at bottom
      ctx.strokeStyle = 'rgba(90, 122, 138, 0.15)'
      ctx.lineWidth = 1
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        const baseY = h * 0.75 + i * 30
        for (let x = 0; x <= w; x += 3) {
          const y = baseY + Math.sin(x * 0.008 + time * 0.015 + i * 0.8) * (8 + i * 4)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          p.vx += (dx / dist) * force * 0.5
          p.vy += (dy / dist) * force * 0.5
        }

        // Sine wave motion
        p.x += p.vx + Math.sin(time * p.speed + p.phase) * 0.4
        p.y += p.vy
        p.alpha -= 0.002

        // Dampen velocity
        p.vx *= 0.99
        p.vy *= 0.995

        // Reset if off screen or faded
        if (p.y < -50 || p.alpha <= 0) {
          const newP = createParticle()
          Object.assign(p, newP)
        }

        // Draw particle
        ctx.beginPath()
        if (p.type === 'leaf') {
          // Draw small leaf shape
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(Math.sin(time * 0.02 + p.phase) * 0.5)
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2)
          ctx.fillStyle = p.color + p.alpha + ')'
          ctx.fill()
          ctx.restore()
        } else if (p.type === 'gold') {
          // Sparkle effect
          const sparkle = Math.sin(time * 0.1 + p.phase) * 0.5 + 0.5
          ctx.arc(p.x, p.y, p.size * (0.5 + sparkle * 0.5), 0, Math.PI * 2)
          ctx.fillStyle = p.color + (p.alpha * (0.5 + sparkle * 0.5)) + ')'
          ctx.fill()
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color + p.alpha + ')'
          ctx.fill()
        }
      })

      // Draw subtle vignette
      const vignette = ctx.createRadialGradient(w * 0.5, h * 0.4, h * 0.3, w * 0.5, h * 0.4, h * 0.9)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(1, 'rgba(40, 30, 15, 0.25)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, w, h)

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
