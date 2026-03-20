"use client";

import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    loadSlim(window.tsParticles).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10"
      options={{
  fullScreen: { enable: false },

  particles: {
    number: { value: 40 },

    size: { value: 2 },

    move: {
      enable: true,
      speed: 0.8,   // ↑ increased slightly
      direction: "none",
      random: false,
      straight: false,
      outModes: { default: "out" }
    },

    opacity: {
      value: 0.4
    },

    links: {
      enable: true,
      color: "#22d3ee",
      opacity: 0.25,
      distance: 120
    }
  },

  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab"
      }
    },
    modes: {
      grab: {
        distance: 140,
        links: { opacity: 0.4 }
      }
    }
  }
}}
    />
  );
}