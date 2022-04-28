import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Box({ rotate = false }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (rotate) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      scale={2}
      ref={mesh}
      onPointerOver={(e) => setHovered(true)}
      onPointerOut={(e) => setHovered(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'purple' : 'blue'} />
    </mesh>
  );
}
