import { Float, Line, RoundedBox, Sparkles } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import * as THREE from 'three'
import type { ChapterId } from '../data'

type Props = {
  chapter: ChapterId
  clean: boolean
  reducedMotion: boolean
}

const COLORS: Record<ChapterId, string> = {
  index: '#77638a',
  work: '#37755b',
  lab: '#b35b4c',
  space: '#536a94',
  people: '#bd7543',
}

function ParallaxGroup({ children, reducedMotion }: { children: ReactNode; reducedMotion: boolean }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!ref.current || reducedMotion) return
    const targetX = state.pointer.y * 0.08
    const targetY = state.pointer.x * 0.1
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, targetX, 4, delta)
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, targetY, 4, delta)
  })

  return <group ref={ref}>{children}</group>
}

function Satellite({ scale = 1 }: { scale?: number }) {
  return (
    <group scale={scale}>
      <RoundedBox args={[0.72, 0.44, 0.42]} radius={0.06} smoothness={3}>
        <meshStandardMaterial color="#c3b992" metalness={0.35} roughness={0.52} />
      </RoundedBox>
      <mesh position={[-0.78, 0, 0]}>
        <boxGeometry args={[0.75, 0.42, 0.05]} />
        <meshStandardMaterial color="#4f648c" metalness={0.24} roughness={0.5} />
      </mesh>
      <mesh position={[0.78, 0, 0]}>
        <boxGeometry args={[0.75, 0.42, 0.05]} />
        <meshStandardMaterial color="#4f648c" metalness={0.24} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.38, 10]} />
        <meshStandardMaterial color="#353733" />
      </mesh>
    </group>
  )
}

function OrbitScene({ reducedMotion }: { reducedMotion: boolean }) {
  const orbit = useMemo(() => {
    const points: [number, number, number][] = []
    for (let i = 0; i <= 90; i += 1) {
      const t = (i / 90) * Math.PI * 2
      points.push([Math.cos(t) * 2.35, Math.sin(t) * 1.35, Math.sin(t * 2) * 0.08])
    }
    return points
  }, [])

  return (
    <ParallaxGroup reducedMotion={reducedMotion}>
      <Line points={orbit} color="#8f8778" lineWidth={1.1} transparent opacity={0.62} />
      <Line points={orbit.map(([x, y, z]) => [x * 0.73, y * 0.73, z] as [number, number, number])} color="#b8ad9a" lineWidth={0.8} transparent opacity={0.5} />
      <mesh>
        <torusGeometry args={[0.78, 0.012, 8, 90]} />
        <meshStandardMaterial color="#9d9586" transparent opacity={0.38} />
      </mesh>
      <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={0.16} floatIntensity={0.22}>
        <group position={[1.45, 0.95, 0.22]} rotation={[0.1, -0.2, 0.12]}>
          <Satellite scale={0.72} />
        </group>
      </Float>
      {[
        [-1.75, -0.16, 0.1],
        [0.02, 1.08, 0.1],
        [1.82, 0.08, 0.1],
        [0.2, -1.08, 0.1],
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial color={index === 2 ? '#536a94' : '#f2ecdd'} metalness={0.08} roughness={0.7} />
        </mesh>
      ))}
    </ParallaxGroup>
  )
}

function InfraScene({ reducedMotion }: { reducedMotion: boolean }) {
  const pulse = useRef<THREE.Mesh>(null)
  const nodes = useMemo(() => {
    return Array.from({ length: 8 }, (_, index) => {
      const col = index % 4
      const row = Math.floor(index / 4)
      return [-1.8 + col * 1.2, 0.65 - row * 1.35, 0] as [number, number, number]
    })
  }, [])

  useFrame((state) => {
    if (!pulse.current || reducedMotion) return
    const t = (Math.sin(state.clock.elapsedTime * 1.8) + 1) / 2
    pulse.current.position.x = THREE.MathUtils.lerp(-1.8, 1.8, t)
  })

  return (
    <ParallaxGroup reducedMotion={reducedMotion}>
      {nodes.map((position, index) => (
        <group key={index} position={position}>
          <RoundedBox args={[0.72, 0.5, 0.34]} radius={0.06} smoothness={2}>
            <meshStandardMaterial color={index === 6 ? '#d69d62' : '#ede8db'} metalness={0.06} roughness={0.68} />
          </RoundedBox>
          <mesh position={[0, 0.05, 0.18]}>
            <boxGeometry args={[0.42, 0.035, 0.012]} />
            <meshStandardMaterial color="#766d5f" />
          </mesh>
        </group>
      ))}
      {nodes.slice(0, 4).map((start, index) => {
        const end = nodes[index + 4]
        return <Line key={index} points={[start, end]} color="#8aa28f" lineWidth={1} transparent opacity={0.55} />
      })}
      <Line points={[[-1.8, 0, 0.1], [1.8, 0, 0.1]]} color="#37755b" lineWidth={1.5} transparent opacity={0.52} />
      <mesh ref={pulse} position={[-1.8, 0, 0.18]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#37755b" emissive="#37755b" emissiveIntensity={0.55} />
      </mesh>
    </ParallaxGroup>
  )
}

function DataScene({ clean, reducedMotion }: { clean: boolean; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const items = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const col = i % 7
      const row = Math.floor(i / 7)
      const noisy: [number, number, number] = [
        -1.8 + col * 0.6 + Math.sin(i * 1.7) * 0.18,
        0.95 - row * 0.62 + Math.cos(i * 1.1) * 0.16,
        Math.sin(i) * 0.22,
      ]
      const tidy: [number, number, number] = [-1.8 + col * 0.6, 0.95 - row * 0.62, 0]
      return { noisy, tidy, keep: i % 5 !== 0 && i % 9 !== 0 }
    })
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.children.forEach((child, i) => {
      const target = clean ? items[i].tidy : items[i].noisy
      child.position.x = THREE.MathUtils.damp(child.position.x, target[0], reducedMotion ? 100 : 6, delta)
      child.position.y = THREE.MathUtils.damp(child.position.y, target[1], reducedMotion ? 100 : 6, delta)
      child.position.z = THREE.MathUtils.damp(child.position.z, target[2], reducedMotion ? 100 : 6, delta)
      child.scale.setScalar(THREE.MathUtils.damp(child.scale.x, clean && !items[i].keep ? 0.05 : 1, reducedMotion ? 100 : 7, delta))
    })
  })

  return (
    <ParallaxGroup reducedMotion={reducedMotion}>
      <group ref={group}>
        {items.map((item, index) => (
          <mesh key={index} position={item.noisy}>
            <boxGeometry args={[0.42, 0.085, 0.06]} />
            <meshStandardMaterial color={item.keep ? '#6f675e' : '#b35b4c'} transparent opacity={item.keep ? 0.7 : 0.45} />
          </mesh>
        ))}
      </group>
    </ParallaxGroup>
  )
}

function SpaceScene({ reducedMotion }: { reducedMotion: boolean }) {
  const sat = useRef<THREE.Group>(null)
  const orbit = useMemo(() => {
    const points: [number, number, number][] = []
    for (let i = 0; i <= 120; i += 1) {
      const t = (i / 120) * Math.PI * 2
      points.push([Math.cos(t) * 2.35, Math.sin(t) * 1.22, Math.sin(t) * 0.15])
    }
    return points
  }, [])

  useFrame((state) => {
    if (!sat.current || reducedMotion) return
    const t = state.clock.elapsedTime * 0.32
    sat.current.position.set(Math.cos(t) * 2.35, Math.sin(t) * 1.22, Math.sin(t) * 0.15)
    sat.current.rotation.z = t + Math.PI / 2
  })

  return (
    <ParallaxGroup reducedMotion={reducedMotion}>
      <mesh rotation={[0.18, 0.1, 0]}>
        <sphereGeometry args={[0.95, 48, 48]} />
        <meshStandardMaterial color="#697991" metalness={0.08} roughness={0.82} />
      </mesh>
      <mesh rotation={[0.18, 0.1, 0]} scale={1.01}>
        <sphereGeometry args={[0.955, 24, 24]} />
        <meshBasicMaterial color="#b9c3d0" wireframe transparent opacity={0.16} />
      </mesh>
      <Line points={orbit} color="#d5c8a8" lineWidth={1.15} transparent opacity={0.72} />
      <group ref={sat} position={[2.35, 0, 0]}>
        <Satellite scale={0.62} />
      </group>
      <Sparkles count={reducedMotion ? 26 : 56} scale={[5.2, 3.4, 2]} size={1.3} speed={reducedMotion ? 0 : 0.24} color="#ffffff" opacity={0.42} />
    </ParallaxGroup>
  )
}

function PeopleScene({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useMemo(() => {
    return Array.from({ length: 34 }, (_, i) => {
      const angle = i * 2.399963229728653
      const radius = 0.35 + Math.sqrt(i / 34) * 2.1
      return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.62, Math.sin(i * 1.31) * 0.18] as [number, number, number]
    })
  }, [])

  return (
    <ParallaxGroup reducedMotion={reducedMotion}>
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[i % 8 === 0 ? 0.11 : 0.055, 12, 12]} />
          <meshStandardMaterial color={i % 8 === 0 ? '#bd7543' : '#8c8173'} transparent opacity={0.76} />
        </mesh>
      ))}
      {points.slice(0, 16).map((point, i) => (
        <Line key={i} points={[point, points[(i * 7 + 9) % points.length]]} color="#b7aa98" lineWidth={0.55} transparent opacity={0.28} />
      ))}
      <Float speed={reducedMotion ? 0 : 1} rotationIntensity={0.08} floatIntensity={0.12}>
        <RoundedBox args={[1.25, 0.72, 0.08]} radius={0.08} smoothness={2} position={[0.4, 0.02, 0.38]} rotation={[0, 0, -0.08]}>
          <meshStandardMaterial color="#f0d882" roughness={0.78} />
        </RoundedBox>
      </Float>
    </ParallaxGroup>
  )
}

function SceneContent({ chapter, clean, reducedMotion }: Props) {
  if (chapter === 'index') return <OrbitScene reducedMotion={reducedMotion} />
  if (chapter === 'work') return <InfraScene reducedMotion={reducedMotion} />
  if (chapter === 'lab') return <DataScene clean={clean} reducedMotion={reducedMotion} />
  if (chapter === 'space') return <SpaceScene reducedMotion={reducedMotion} />
  return <PeopleScene reducedMotion={reducedMotion} />
}

export default function AmbientScene(props: Props) {
  return (
    <div className={`scene-canvas scene-${props.chapter}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.2], fov: 42, near: 0.1, far: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.55} />
        <directionalLight position={[4, 5, 6]} intensity={2.2} color="#fff3d8" />
        <directionalLight position={[-4, -2, 4]} intensity={1.1} color={COLORS[props.chapter]} />
        <SceneContent {...props} />
      </Canvas>
    </div>
  )
}
