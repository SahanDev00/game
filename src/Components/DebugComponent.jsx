import React, { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import naruto from '../Models/naruto.glb';

const DebugComponent = () => {
  const gltf = useLoader(GLTFLoader, naruto);
  const { nodes, animations } = gltf;

  useEffect(() => {
    console.log('Nodes:', nodes);
    console.log('Animations:', animations);
  }, [nodes, animations]);

  return null;
};

export default DebugComponent;
