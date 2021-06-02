import * as THREE from 'three';
import React, { Suspense, useRef } from 'react';
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  useLoader,
} from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import './index.css';

import {
  Environment,
  // OrbitControls,
} from "@react-three/drei";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = () => {
  const gltf = useLoader(GLTFLoader, './Ingenuity_v3.glb');
  return (
    <group position={[0, 0, 1]}>
      <primitive
        object={gltf.scene}
        // scale={0.04}

      />
    </group>
  );
};

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

function Mountain() {
  const texture = useLoader(THREE.TextureLoader, './mountain.jpeg');
  return (
    <mesh>
      <sphereBufferGeometry attach='geometry' />
      <meshBasicMaterial
        attach='material'
        map={texture}
        side={THREE.BackSide}
      />
    </mesh>
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
        <Environment preset="sunset" background />
        {/* <Mountain /> */}
        <Model />
      </Suspense>
    </Canvas>
  );
}
