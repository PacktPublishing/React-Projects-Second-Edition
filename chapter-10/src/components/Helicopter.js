import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useSpring, animated } from '@react-spring/three';

export default function Helicopter() {
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
      <primitive object={gltf.scene} />
    </animated.group>
  );
}
