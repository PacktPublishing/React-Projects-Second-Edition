import * as THREE from 'three';
import React, { Suspense, useState, useRef } from 'react';
import {
  Canvas,
  useThree,
  useLoader,
  extend,
  useFrame,
} from '@react-three/fiber';
import './index.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useSpring, animated } from 'react-spring/three';

const scenes = [
  {
    name: 'outside',
    color: 'lightpink',
    position: [10, 0, -15],
    url: '/mountain.jpeg',
    link: 1,
  },
  {
    name: 'inside',
    color: 'lightblue',
    position: [15, 0, 0],
    url: '/beach.jpeg',
    link: 0,
  },
  // ...
];

const Model = () => {
  const gltf = useLoader(GLTFLoader, './Ingenuity_v3.glb');

  const props = useSpring({
    loop: true,
    to: [
      { position: [2, 2, 3] },
      { position: [2, 2, 6] },
      { position: [2, 2, 9] },
      { position: [2, 4, 9] },
      { position: [2, 6, 9] },
    ],
    from: { position: [2, 2, 1] },
  });

  return (
    <animated.group {...props}>
      <primitive
        object={gltf.scene}
        // scale={0.04}
      />
    </animated.group>
  );
};

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={hovered ? 1.5 : 1}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'red' : 'blue'} />
    </mesh>
  );
}

function Dome({ name, position, texture, onClick }) {
  return (
    <group>
      <mesh>
        <sphereBufferGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <group
        name='Wheels'
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Box position={position} />

        {/* <mesh position={position}>
          <sphereGeometry args={[1.25, 32, 32]} />
          <meshBasicMaterial color='white' />
        </mesh> */}
      </group>
    </group>
  );
}

extend({ OrbitControls });

function Controls(props) {
  const { camera, gl } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return (
    <orbitControls
      ref={ref}
      target={[0, 0, 0]}
      {...props}
      args={[camera, gl.domElement]}
    />
  );
}

function Portals() {
  const [activeScene, setActiveScene] = useState(0);
  const { link, ...props } = scenes[activeScene];
  const maps = useLoader(
    THREE.TextureLoader,
    scenes.map((entry) => entry.url),
  );
  return (
    <Dome
      onClick={() => setActiveScene(link)}
      {...props}
      texture={maps[activeScene]}
    />
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <Controls
        enableZoom={false}
        enablePan={false}
        // autoRotate
        // rotateSpeed={-0.5}
      />
      <Suspense fallback={null}>
        <Portals />
        <Model />
      </Suspense>
    </Canvas>
  );
}
