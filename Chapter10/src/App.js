import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Panorama from './components/Panorama';
import Controls from './components/Controls';
import Helicopter from './components/Helicopter';
import './App.css';

export default function App() {
  return (
    <div id='Canvas-container'>
      <Canvas>
        <Controls />
        <Suspense fallback={null}>
          <Panorama />
          <Helicopter />
        </Suspense>

        <ambientLight intensity={0.5} />

        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
      </Canvas>
    </div>
  );
}
