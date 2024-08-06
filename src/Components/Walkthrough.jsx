import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import City from './City';
import city from '../Models/scene.glb'; // Import the GLB model
import Player from './Player';
import Camera from './Camera';
import { OrbitControls } from '@react-three/drei';

const Walkthrough = () => {
  alert("Use W, A, S, D to PLAY.")
  const cameraRef = useRef();
  const playerRef = useRef();

  useEffect(() => {
    if (cameraRef.current && playerRef.current) {
      // Set player position in front of the camera
      const cameraPosition = cameraRef.current.position;
      playerRef.current.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z + 5); // 5 units in front
    }
  }, []);

  return (
    <div className="h-screen w-full">
      <Canvas>
        <ambientLight intensity={4} />
        <pointLight position={[10, 10, 10]} />
        <Physics gravity={[0, 0, 0]}>
          <Camera ref={cameraRef} />
          <Player ref={playerRef} />
          <City url={city} />
        </Physics>
        <OrbitControls/>
      </Canvas>
    </div>
  );
};

export default Walkthrough;
