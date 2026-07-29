import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Html, ContactShadows } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Shared animation state controlled by GSAP
export const animState = {
  camX: 0, camY: 12, camZ: 2,
  camRotX: -Math.PI / 2.2, camRotY: 0, camRotZ: 0,
  dofFocus: 12,
  keyRotY: 0
}

function Objects() {
  const keyRef = useRef()

  useFrame(() => {
    if (keyRef.current) {
      keyRef.current.rotation.y = animState.keyRotY
    }
  })

  return (
    <group>
      {/* Matte Black Desk */}
      <mesh receiveShadow position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* MacBook Pro Placeholder */}
      <group position={[0, 0, 0]}>
        {/* Base */}
        <mesh position={[0, 0.05, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.1, 2.2]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Lid / Screen */}
        <group position={[0, 0.1, -0.6]} rotation={[-0.3, 0, 0]}>
          <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.2, 2.0, 0.05]} />
            <meshStandardMaterial color="#111" roughness={0.5} metalness={0.9} />
          </mesh>
          <Html transform wrapperClass="htmlScreen" distanceFactor={1.5} position={[0, 1.0, 0.026]} rotation={[0, 0, 0]}>
            <div style={{ width: '1024px', height: '640px', background: '#fff', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', fontFamily: 'sans-serif' }}>
                <b style={{fontSize: '24px'}}>Rentav Filo</b>
                <span>Ana Sayfa | Filomuz | İletişim</span>
              </div>
              <div style={{ padding: '60px 40px', textAlign: 'center', fontFamily: 'sans-serif', background: '#f5f5f5', height: '100%' }}>
                <h1 style={{ fontSize: '48px', margin: '0 0 20px' }}>Premium Araç Filosu</h1>
                <p style={{ fontSize: '24px', color: '#666' }}>Güvenilir, Konforlu, 7/24 Hizmet</p>
                <button style={{ padding: '15px 30px', background: '#e32212', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '20px', marginTop: '20px' }}>Hemen Kirala</button>
              </div>
            </div>
          </Html>
        </group>
      </group>

      {/* Smartphone */}
      <group position={[2.5, 0.05, 1.5]} rotation={[0, -0.2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.05, 1.6]} />
          <meshStandardMaterial color="#222" roughness={0.3} metalness={0.9} />
        </mesh>
        <Html transform wrapperClass="htmlScreen" distanceFactor={1.5} position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <div style={{ width: '375px', height: '750px', background: '#fff', borderRadius: '24px', padding: '20px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
            <h3 style={{ textAlign: 'center', marginTop: '10px' }}>Hızlı Rezervasyon</h3>
            <div style={{ background: '#f0f0f0', height: '150px', borderRadius: '12px', marginTop: '20px' }}></div>
            <h4 style={{ marginTop: '20px' }}>Premium Sınıf</h4>
            <button style={{ width: '100%', padding: '15px', background: '#111', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '18px', marginTop: '10px' }}>Seç</button>
          </div>
        </Html>
      </group>

      {/* Business Card */}
      <group position={[-2, 0.01, 1.2]} rotation={[0, 0.3, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.01, 0.5]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>
        <Html transform distanceFactor={1.5} position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <div style={{ width: '350px', height: '200px', background: '#111', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
            <b style={{ letterSpacing: '2px', fontSize: '24px' }}>RENTAV FİLO</b>
            <span style={{ fontSize: '12px', color: '#aaa', marginTop: '10px' }}>OTO KİRALAMA A.Ş.</span>
          </div>
        </Html>
      </group>

      {/* Rental Agreement Paper */}
      <group position={[-3, 0.01, -0.5]} rotation={[0, -0.1, 0]}>
        <mesh castShadow receiveShadow>
          <planeGeometry args={[2.1, 2.97]} />
          <meshStandardMaterial color="#fff" roughness={1} />
        </mesh>
      </group>

      {/* Metal Pen */}
      <group position={[-2.2, 0.02, -1.0]} rotation={[0, 0.6, 0]}>
        <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 16]} />
          <meshStandardMaterial color="#ccc" roughness={0.2} metalness={1} />
        </mesh>
      </group>

      {/* Color Palette Card */}
      <group position={[2.2, 0.01, -0.8]} rotation={[0, -0.4, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.01, 0.5]} />
          <meshStandardMaterial color="#eee" />
        </mesh>
        <mesh position={[-0.5, 0.006, 0]}>
          <planeGeometry args={[0.4, 0.4]} />
          <meshStandardMaterial color="#e32212" />
        </mesh>
        <mesh position={[0, 0.006, 0]}>
          <planeGeometry args={[0.4, 0.4]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh position={[0.5, 0.006, 0]}>
          <planeGeometry args={[0.4, 0.4]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
      </group>

      {/* Luxury Car Key */}
      <group position={[1.5, 0.05, 2.5]} rotation={[0, 0.5, 0]} ref={keyRef}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.08, 0.6]} />
          <meshStandardMaterial color="#050505" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.041, -0.15]}>
          <boxGeometry args={[0.2, 0.01, 0.2]} />
          <meshStandardMaterial color="#silver" roughness={0.2} metalness={1} />
        </mesh>
      </group>

      {/* RFID Card */}
      <group position={[1.0, 0.01, 2.8]} rotation={[0, 0.1, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.54, 0.02, 0.86]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
        </mesh>
      </group>
    </group>
  )
}

function CameraRig({ dofRef }) {
  useFrame((state) => {
    // Apply animated state to camera
    state.camera.position.set(animState.camX, animState.camY, animState.camZ)
    state.camera.rotation.set(animState.camRotX, animState.camRotY, animState.camRotZ)
    
    // Slight parallax based on mouse
    const mouseX = (state.mouse.x * Math.PI) / 50
    const mouseY = (state.mouse.y * Math.PI) / 50
    state.camera.rotation.y += mouseX
    state.camera.rotation.x -= mouseY
    
    // Update DOF
    if (dofRef.current) {
      dofRef.current.focusDistance = animState.dofFocus
    }
  })
  return null
}

export default function Scene() {
  const dofRef = useRef()

  useEffect(() => {
    // Get the external container for scrolling
    const scrollEl = document.querySelector('.r3f-scroll-container') || document.body

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollEl,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    })

    // Scroll 0-20: initial wait, 20-35: Move to Laptop
    tl.to(animState, {
      camX: 0, camY: 2, camZ: 2.5,
      camRotX: -0.2,
      dofFocus: 3, // Focus on laptop
      ease: 'power2.inOut',
      duration: 1.5
    }, 0.2)

    // Scroll 35-50: Move to Phone
    tl.to(animState, {
      camX: 2.5, camY: 1.5, camZ: 3.0,
      camRotX: -0.8, camRotY: 0,
      dofFocus: 1.5, // Focus on phone
      ease: 'power2.inOut',
      duration: 1.5
    }, 1.7)

    // Scroll 50-70: Move to Key
    tl.to(animState, {
      camX: 1.5, camY: 1.0, camZ: 3.2,
      camRotX: -1.0, camRotY: 0,
      keyRotY: Math.PI / 4, // Subtle rotation of key
      dofFocus: 0.8, // Focus on key
      ease: 'power2.inOut',
      duration: 2.0
    }, 3.2)

    // Scroll 70-85: Return up
    tl.to(animState, {
      camX: 0, camY: 12, camZ: 2,
      camRotX: -Math.PI / 2.2, camRotY: 0,
      keyRotY: 0,
      dofFocus: 12,
      ease: 'power2.inOut',
      duration: 1.5
    }, 5.2)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <Canvas shadows camera={{ fov: 35, position: [0, 12, 2] }} >
      <color attach="background" args={['#050505']} />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 15, 5]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-bias={-0.0001} />
      <Environment preset="city" />

      <Objects />

      <EffectComposer>
        <DepthOfField 
          ref={dofRef} 
          focusDistance={12} 
          focalLength={0.02} 
          bokehScale={5} 
          height={480} 
        />
      </EffectComposer>

      <CameraRig dofRef={dofRef} />
    </Canvas>
  )
}
