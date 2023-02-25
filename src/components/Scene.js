import { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import iron from '../assets/textures/iron.jpg'
import wood from '../assets/textures/wood.jpg'
import { useWindowSize } from '../hooks';

function Scene({ color, shape, texture }) {
  const cubeRef = useRef(null);
  const size = useWindowSize();

  const scene = new THREE.Scene();
  const [camera, setCamera] = useState(new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000));
  const [renderer, setRenderer] = useState(new THREE.WebGLRenderer({ alpha: true }));
  const material = new THREE.MeshStandardMaterial({ color });
  const geometry = new THREE.BoxGeometry();
  const [cube, setCube] = useState(new THREE.Mesh(geometry, material));

  const directionalLight1 = new THREE.DirectionalLight(0xffffff);
  directionalLight1.position.y = 0;
  directionalLight1.position.z = 1;
  const directionalLight2 = new THREE.AmbientLight(0xffffff, 0.2);

  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    cube.rotation.z += 0.005;
    renderer.render(scene, camera);
  }

  useEffect(() => {
    renderer.setSize(size.width, size.height);
    cubeRef.current.appendChild(renderer.domElement);
    scene.add(directionalLight1);
    scene.add(directionalLight2);
    scene.add(cube);
    camera.position.z = 5;

    animate();
  }, []);

  useEffect(() => {
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
  }, [size]);

  useEffect(() => {
    cube.material.color.setStyle(color);
  }, [color]);

  useEffect(() => {
    let geometry;
    switch (shape) {
      case'cube':
        geometry = new THREE.BoxGeometry();
        break;
      case 'sphere':
        geometry = new THREE.CircleGeometry(1, 32);
        break;
      case 'triangle':
        geometry = new THREE.TetrahedronGeometry();
        break;
    }
    cube.geometry = geometry;
  }, [shape]);

  useEffect(() => {
    let material;
    switch (texture) {
      case'iron':
        material = new THREE.MeshBasicMaterial({
          map: new THREE.ImageUtils.loadTexture(iron),
          color,
        });
        break;
      case 'wood':
        material = new THREE.MeshBasicMaterial({
          map: new THREE.ImageUtils.loadTexture(wood),
          color,
        });
        break;
      default:
        material = new THREE.MeshStandardMaterial({ color });
        break;
    }
    cube.material = material;
  }, [texture]);

  return (
    <div ref={cubeRef}>
    </div>
  )
}

export default Scene
