import React from 'react'
import SocialScene from './SocialScene'
import GraphicScene from './GraphicScene'
import VideoScene from './VideoScene'
import { Canvas } from '@react-three/fiber'

export default function App({ scene, domTarget }) {
  let SceneComponent = SocialScene
  if (scene === 'graphic') SceneComponent = GraphicScene
  if (scene === 'video') SceneComponent = VideoScene

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas dpr={[1, 1.75]} camera={{ fov: 32, position: [0, 0, 12] }} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#ffffff']} />
        <SceneComponent domTarget={domTarget} />
      </Canvas>
    </div>
  )
}
