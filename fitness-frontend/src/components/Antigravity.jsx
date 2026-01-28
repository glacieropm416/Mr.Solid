/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const AntigravityInner = ({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#5227FF",
  autoAnimate = true,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10
}) => {
  const meshRef = useRef();
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      t: Math.random() * 100,
      speed: 0.01 + Math.random() / 200,
      mx: (Math.random() - 0.5) * viewport.width,
      my: (Math.random() - 0.5) * viewport.height,
      mz: (Math.random() - 0.5) * 20,
      cx: 0,
      cy: 0,
      cz: 0,
      randomRadiusOffset: (Math.random() - 0.5) * 2
    }));
  }, [count, viewport.width, viewport.height]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { pointer, clock } = state;
    let destX = (pointer.x * viewport.width) / 2;
    let destY = (pointer.y * viewport.height) / 2;

    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
      const t = clock.getElapsedTime();
      destX = Math.sin(t * 0.6) * (viewport.width / 4);
      destY = Math.cos(t * 0.8) * (viewport.height / 4);
    }

    virtualMouse.current.x += (destX - virtualMouse.current.x) * 0.05;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * 0.05;

    particles.forEach((p, i) => {
      p.t += p.speed;
      const dx = p.cx - virtualMouse.current.x;
      const dy = p.cy - virtualMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let tx = p.mx;
      let ty = p.my;
      let tz = p.mz * depthFactor;

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + clock.getElapsedTime() * rotationSpeed;
        const wave =
          Math.sin(p.t * waveSpeed + angle) * waveAmplitude;
        const r =
          ringRadius + wave + p.randomRadiusOffset * (5 / fieldStrength);

        tx = virtualMouse.current.x + Math.cos(angle) * r;
        ty = virtualMouse.current.y + Math.sin(angle) * r;
        tz += Math.sin(p.t) * waveAmplitude;
      }

      p.cx += (tx - p.cx) * lerpSpeed;
      p.cy += (ty - p.cy) * lerpSpeed;
      p.cz += (tz - p.cz) * lerpSpeed;

      dummy.position.set(p.cx, p.cy, p.cz);
      dummy.lookAt(virtualMouse.current.x, virtualMouse.current.y, p.cz);
      dummy.rotateX(Math.PI / 2);

      const scale =
        (0.8 + Math.sin(p.t * pulseSpeed) * 0.2 * particleVariance) *
        particleSize;

      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      {particleShape === "capsule" && (
        <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
      )}
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
};

const Antigravity = (props) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 35 }}
      style={{ pointerEvents: "none" }} // ✅ IMPORTANT
    >
      <AntigravityInner {...props} />
    </Canvas>
  );
};

export default Antigravity;
