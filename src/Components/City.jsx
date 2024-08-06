import React from 'react';
import { useGLTF } from '@react-three/drei';

const City = ({ url }) => {
  const { scene } = useGLTF(url); // Use the URL passed as a prop
  return <primitive object={scene} />;
};

export default City;
