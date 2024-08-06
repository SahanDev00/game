import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Camera = forwardRef((props, ref) => {
  const cameraRef = useRef();
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 's':
          setMoveForward(true);
          break;
        case 'w':
          setMoveBackward(true);
          break;
        case 'd':
          setMoveLeft(true);
          break;
        case 'a':
          setMoveRight(true);
          break;
      default:
        // Handle unexpected key presses if necessary
        break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case 's':
          setMoveForward(false);
          break;
        case 'w':
          setMoveBackward(false);
          break;
        case 'd':
          setMoveLeft(false);
          break;
        case 'a':
          setMoveRight(false);
          break;
        default:
            // Handle unexpected key presses if necessary
        break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const speed = 0.1; // Adjust speed as needed
    const camera = cameraRef.current;

    if (camera) {
      let moveX = 0;
      let moveZ = 0;

      if (moveForward) moveZ -= speed;
      if (moveBackward) moveZ += speed;
      if (moveLeft) moveX -= speed;
      if (moveRight) moveX += speed;

      camera.position.x += moveX;
      camera.position.z += moveZ;
    }
  });

  return (
    <PerspectiveCamera
      ref={(node) => {
        cameraRef.current = node;
        if (ref) ref.current = node;
      }}
      position={[0, 6, -10]} // Initial position
      makeDefault
    />
  );
});

export default Camera;
