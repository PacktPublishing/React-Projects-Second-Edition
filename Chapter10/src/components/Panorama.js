import { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import Box from './Box';

const backgrounds = [
  {
    id: 1,
    url: '/mountain.jpeg',
  },
  {
    id: 2,
    url: '/beach.jpeg',
  },
];

export default function Panorama() {
  const [activeBackground, setActiveBackground] = useState(1);
  const { url } = backgrounds.find(({ id }) => id === activeBackground);
  const background = useLoader(THREE.TextureLoader, url);

  return (
    <group>
      <mesh>
        <sphereBufferGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={background} side={THREE.BackSide} />
      </mesh>

      <group
        onClick={(e) => {
          e.stopPropagation();
          setActiveBackground(activeBackground === 1 ? 2 : 1);
        }}
      >
        <Box />
      </group>
    </group>
  );
}
