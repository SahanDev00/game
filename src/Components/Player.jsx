import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import { useBox } from '@react-three/cannon';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import naruto from '../Models/naruto.glb';

const Player = forwardRef((props, ref) => {
  const gltf = useLoader(GLTFLoader, naruto);
  const { scene } = gltf;
  const [boxRef, api] = useBox(() => ({ mass: 1, position: [0, 0, 0], ...props }));
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
    const speed = 10; // Adjust speed as needed
    api.velocity.set(
      (moveLeft ? -speed : (moveRight ? speed : 0)),
      0,
      (moveForward ? -speed : (moveBackward ? speed : 0))
    );
  });

  useImperativeHandle(ref, () => ({
    get position() {
      return boxRef.current.position;
    }
  }));

  return (
    <group ref={boxRef} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
});

export default Player;
