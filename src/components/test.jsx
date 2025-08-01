"use client";
import dynamic from 'next/dynamic';

const Particles = dynamic(() => import('@tsparticles/react').then(mod => mod.Particles), {
  ssr: false,
  loadableGenerated: {
    modules: ['@tsparticles/react'],
  },
});
import { loadFull } from "@tsparticles/engine";
import { particlesConfig } from './particles-config';

export default function Test() {
  const particlesInit = async (engine) => {
    console.log("Particles engine initialization started...");
    try {
      await loadFull(engine);
      console.log("Particles engine loaded successfully");
    } catch (error) {
      console.error("Particles engine initialization error:", error);
    }
  };

  const particlesLoaded = async (container) => {
    if (container) {
      console.log("Particles container loaded successfully:", container);
    } else {
      console.error("Particles container failed to load");
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'transparent' }}>
      <Particles
        id="particles-test"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesConfig}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}