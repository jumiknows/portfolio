import { useEffect, useRef } from 'react'

type Point3 = [number, number, number]

const TAU = Math.PI * 2

function rotatePoint([x, y, z]: Point3, yaw: number, pitch: number): Point3 {
  const cosYaw = Math.cos(yaw)
  const sinYaw = Math.sin(yaw)
  const yawX = x * cosYaw - z * sinYaw
  const yawZ = x * sinYaw + z * cosYaw
  const cosPitch = Math.cos(pitch)
  const sinPitch = Math.sin(pitch)

  return [yawX, y * cosPitch - yawZ * sinPitch, y * sinPitch + yawZ * cosPitch]
}

function spherePoint(latitude: number, longitude: number): Point3 {
  const lat = latitude * Math.PI / 180
  const lon = longitude * Math.PI / 180
  return [Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)]
}

function MissionSystems() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const stars = Array.from({ length: 92 }, (_, index) => {
      const seed = (index * 9301 + 49297) % 233280
      const next = (seed * 9301 + 49297) % 233280
      const last = (next * 9301 + 49297) % 233280
      return { x: seed / 233280, y: next / 233280, size: 0.45 + (last / 233280) * 1.15 }
    })

    let width = 0
    let height = 0
    let frame = 0
    let visible = true

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75)
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      draw(performance.now())
    }

    const project = (point: Point3, radius: number) => {
      const depth = 5.2 - point[2]
      const perspective = 4.3 / depth
      return {
        x: width * 0.54 + point[0] * radius * perspective,
        y: height * 0.48 - point[1] * radius * perspective,
        z: point[2],
        scale: perspective,
      }
    }

    const drawPath = (points: Point3[], radius: number, color: string, baseAlpha: number, lineWidth = 1) => {
      for (let index = 1; index < points.length; index += 1) {
        const from = project(points[index - 1], radius)
        const to = project(points[index], radius)
        const depthAlpha = Math.max(0.18, Math.min(1, ((from.z + to.z) / 2 + 1.35) / 2.7))
        context.beginPath()
        context.moveTo(from.x, from.y)
        context.lineTo(to.x, to.y)
        context.strokeStyle = color
        context.globalAlpha = baseAlpha * depthAlpha
        context.lineWidth = lineWidth
        context.stroke()
      }
      context.globalAlpha = 1
    }

    const draw = (time: number) => {
      if (!width || !height) return
      const seconds = time / 1000
      pointer.x += (pointer.targetX - pointer.x) * 0.045
      pointer.y += (pointer.targetY - pointer.y) * 0.045

      context.clearRect(0, 0, width, height)

      for (const star of stars) {
        const shimmer = 0.35 + Math.sin(seconds * 0.7 + star.x * 11) * 0.18
        context.fillStyle = `rgba(165, 221, 231, ${shimmer})`
        context.fillRect(star.x * width, star.y * height, star.size, star.size)
      }

      const radius = Math.min(width, height) * 0.245
      const yaw = seconds * 0.075 + pointer.x * 0.42
      const pitch = -0.22 + pointer.y * 0.24
      const centreX = width * 0.54
      const centreY = height * 0.48
      const halo = context.createRadialGradient(centreX, centreY, radius * 0.12, centreX, centreY, radius * 1.38)
      halo.addColorStop(0, 'rgba(31, 126, 148, 0.22)')
      halo.addColorStop(0.66, 'rgba(17, 74, 91, 0.1)')
      halo.addColorStop(1, 'rgba(5, 12, 17, 0)')
      context.fillStyle = halo
      context.beginPath()
      context.arc(centreX, centreY, radius * 1.38, 0, TAU)
      context.fill()

      context.fillStyle = 'rgba(7, 23, 31, 0.76)'
      context.beginPath()
      context.arc(centreX, centreY, radius * 0.83, 0, TAU)
      context.fill()

      const gridColor = 'rgb(93, 216, 232)'
      for (let latitude = -75; latitude <= 75; latitude += 15) {
        const points: Point3[] = []
        for (let longitude = 0; longitude <= 360; longitude += 5) {
          points.push(rotatePoint(spherePoint(latitude, longitude), yaw, pitch))
        }
        drawPath(points, radius, gridColor, latitude === 0 ? 0.5 : 0.24, latitude === 0 ? 1.2 : 0.7)
      }

      for (let longitude = 0; longitude < 360; longitude += 20) {
        const points: Point3[] = []
        for (let latitude = -90; latitude <= 90; latitude += 4) {
          points.push(rotatePoint(spherePoint(latitude, longitude), yaw, pitch))
        }
        drawPath(points, radius, gridColor, 0.22, 0.7)
      }

      const orbitPoints: Point3[] = []
      for (let step = 0; step <= 160; step += 1) {
        const angle = step / 160 * TAU
        const point: Point3 = [Math.cos(angle) * 1.58, Math.sin(angle) * 0.42, Math.sin(angle) * 1.18]
        orbitPoints.push(rotatePoint(point, pointer.x * 0.18 - 0.18, 0.42 + pointer.y * 0.12))
      }
      drawPath(orbitPoints, radius, 'rgb(255, 155, 84)', 0.58, 1)

      const satelliteAngle = seconds * 0.24 + 0.8
      const satellitePoint = rotatePoint([
        Math.cos(satelliteAngle) * 1.58,
        Math.sin(satelliteAngle) * 0.42,
        Math.sin(satelliteAngle) * 1.18,
      ], pointer.x * 0.18 - 0.18, 0.42 + pointer.y * 0.12)
      const satellite = project(satellitePoint, radius)

      const groundPoint = rotatePoint(spherePoint(49.2827, -123.1207), yaw, pitch)
      const ground = project(groundPoint, radius)
      context.beginPath()
      context.moveTo(ground.x, ground.y)
      context.lineTo(satellite.x, satellite.y)
      context.setLineDash([4, 6])
      context.strokeStyle = 'rgba(102, 224, 174, 0.72)'
      context.lineWidth = 1
      context.stroke()
      context.setLineDash([])

      const pulseProgress = (seconds * 0.48) % 1
      const pulseX = ground.x + (satellite.x - ground.x) * pulseProgress
      const pulseY = ground.y + (satellite.y - ground.y) * pulseProgress
      const pulseGlow = context.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 13)
      pulseGlow.addColorStop(0, 'rgba(102, 224, 174, 1)')
      pulseGlow.addColorStop(1, 'rgba(102, 224, 174, 0)')
      context.fillStyle = pulseGlow
      context.beginPath()
      context.arc(pulseX, pulseY, 13, 0, TAU)
      context.fill()

      context.save()
      context.translate(satellite.x, satellite.y)
      context.strokeStyle = '#e9f6f8'
      context.fillStyle = '#071319'
      context.lineWidth = 1.2
      context.shadowColor = 'rgba(93, 216, 232, 0.75)'
      context.shadowBlur = 13
      context.fillRect(-7, -6, 14, 12)
      context.strokeRect(-7, -6, 14, 12)
      context.fillRect(-27, -4, 15, 8)
      context.strokeRect(-27, -4, 15, 8)
      context.fillRect(12, -4, 15, 8)
      context.strokeRect(12, -4, 15, 8)
      context.beginPath()
      context.moveTo(-12, 0)
      context.lineTo(-7, 0)
      context.moveTo(7, 0)
      context.lineTo(12, 0)
      context.stroke()
      context.restore()

      context.strokeStyle = '#66e0ae'
      context.fillStyle = '#071319'
      context.lineWidth = 1
      context.beginPath()
      context.arc(ground.x, ground.y, 4, 0, TAU)
      context.fill()
      context.stroke()
      context.beginPath()
      context.moveTo(ground.x - 7, ground.y)
      context.lineTo(ground.x + 7, ground.y)
      context.moveTo(ground.x, ground.y - 7)
      context.lineTo(ground.x, ground.y + 7)
      context.stroke()

      context.font = '10px "IBM Plex Mono", monospace'
      context.fillStyle = 'rgba(222, 239, 243, 0.82)'
      context.fillText('FLIGHT NODE', satellite.x + 17, satellite.y - 14)
      context.fillStyle = 'rgba(102, 224, 174, 0.78)'
      context.fillText('GROUND / VANCOUVER', ground.x + 11, ground.y + 20)
    }

    const tick = (time: number) => {
      if (visible) draw(time)
      frame = window.requestAnimationFrame(tick)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      pointer.targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      pointer.targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
      if (motionQuery.matches) draw(performance.now())
    }

    const handlePointerLeave = () => {
      pointer.targetX = 0
      pointer.targetY = 0
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', handlePointerLeave)
    resize()
    if (!motionQuery.matches) frame = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <section className="mission-visual" aria-labelledby="mission-visual-title">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Animated systems model showing a flight node communicating with a Vancouver ground station"
      />
      <div className="mission-topline">
        <div><i aria-hidden="true" /><span id="mission-visual-title">Mission systems model</span></div>
        <small>SIMULATED VIEW / POINTER INPUT</small>
      </div>
      <div className="mission-axis axis-x" aria-hidden="true">X / 114.8</div>
      <div className="mission-axis axis-y" aria-hidden="true">Y / 49.2</div>
      <div className="mission-reticle" aria-hidden="true"><i /><i /></div>
      <div className="mission-hud">
        <div><span>FLIGHT NODE</span><b>ALEASAT / HAB</b></div>
        <div><span>SENSOR BUS</span><b>10+ CHANNELS</b></div>
        <div><span>DATA PATH</span><b>COMMAND + TELEMETRY</b></div>
        <div><span>LINK STATE</span><b className="status-nominal">NOMINAL</b></div>
      </div>
      <p className="mission-caption">A lightweight browser-rendered model of the kind of system I like working on: software, hardware, and the link between them.</p>
    </section>
  )
}

export default MissionSystems
