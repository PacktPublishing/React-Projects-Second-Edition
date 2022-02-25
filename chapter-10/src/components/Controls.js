import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Controls() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    controls.minDistance = 2;
    controls.maxDistance = 20;
    controls.enableZoom = true;
    controls.enablePan = true;
    
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
}
