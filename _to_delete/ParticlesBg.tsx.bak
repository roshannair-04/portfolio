"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false }, // IMPORTANT: keeps it inside section
        background: { color: "transparent" }, // don't override your UI
        fpsLimit: 60,

        particles: {
          number: { value: 60 },
          color: { value: "#22d3ee" },

          links: {
            enable: true,
            distance: 150,
            color: "#22d3ee",
            opacity: 0.2,
            width: 1,
          },

          move: {
            enable: true,
            speed: 1,
            outModes: { default: "bounce" },
          },

          opacity: { value: 0.5 },
          size: { value: 2 },
        },

        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 150,
              links: { opacity: 0.4 },
            },
          },
        },
      }}
    />
  );
}