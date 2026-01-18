import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface HyperspeedProps {
  className?: string;
}

const Hyperspeed = ({ className = '' }: HyperspeedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 1;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Stars/Lines geometry
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    // PRYME colors - Green (#2aac64) and Gold (#ffd600)
    const primaryColor = new THREE.Color(0x2aac64);
    const accentColor = new THREE.Color(0xffd600);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = Math.random() * -20;

      // Mix of green, gold, and white stars
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.4) {
        color = primaryColor;
      } else if (colorChoice < 0.6) {
        color = accentColor;
      } else {
        color = whiteColor;
      }
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for elongated stars (speed lines)
    const starsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speed: { value: 1.0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vZ;
        uniform float time;
        uniform float speed;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Move stars toward camera
          pos.z = mod(pos.z + time * speed * 2.0, 20.0) - 20.0;
          vZ = pos.z;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vZ;
        
        void main() {
          // Create elongated star effect
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          // Stretch effect based on depth
          float stretch = 1.0 + (-vZ / 20.0) * 2.0;
          vec2 stretchedCoord = vec2(center.x, center.y * stretch);
          float stretchedDist = length(stretchedCoord);
          
          float alpha = 1.0 - smoothstep(0.0, 0.5, stretchedDist);
          alpha *= 0.8;
          
          // Add glow
          float glow = exp(-dist * 3.0) * 0.5;
          
          gl_FragColor = vec4(vColor, alpha + glow);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Speed lines geometry
    const linesCount = 100;
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(linesCount * 6); // 2 vertices per line
    const lineColors = new Float32Array(linesCount * 6);

    for (let i = 0; i < linesCount; i++) {
      const i6 = i * 6;
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 8;
      const z = Math.random() * -15;
      
      linePositions[i6] = x;
      linePositions[i6 + 1] = y;
      linePositions[i6 + 2] = z;
      linePositions[i6 + 3] = x;
      linePositions[i6 + 4] = y;
      linePositions[i6 + 5] = z - 1.5;

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.5) {
        color = primaryColor;
      } else if (colorChoice < 0.7) {
        color = accentColor;
      } else {
        color = whiteColor;
      }
      
      for (let j = 0; j < 6; j++) {
        lineColors[i6 + j] = j < 3 ? [color.r, color.g, color.b][j % 3] : [color.r, color.g, color.b][j % 3];
      }
    }

    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.016;
      starsMaterial.uniforms.time.value = time;

      // Update line positions
      const positions = linesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < linesCount; i++) {
        const i6 = i * 6;
        positions[i6 + 2] += 0.15;
        positions[i6 + 5] += 0.15;
        
        if (positions[i6 + 2] > 1) {
          const x = (Math.random() - 0.5) * 8;
          const y = (Math.random() - 0.5) * 8;
          const z = -15;
          positions[i6] = x;
          positions[i6 + 1] = y;
          positions[i6 + 2] = z;
          positions[i6 + 3] = x;
          positions[i6 + 4] = y;
          positions[i6 + 5] = z - 1.5;
        }
      }
      linesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d1f35 50%, #0a1628 100%)' }}
    />
  );
};

export default Hyperspeed;
