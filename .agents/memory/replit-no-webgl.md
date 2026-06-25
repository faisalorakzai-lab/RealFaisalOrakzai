---
name: Replit No WebGL
description: WebGL context creation always fails in the Replit sandbox — use Canvas 2D for any 3D/orb effects.
---

Three.js `new THREE.WebGLRenderer()` throws "Error creating WebGL context" in every Replit sandbox environment because there is no GPU or hardware graphics acceleration available.

**Why:** The Replit container is CPU-only with no display driver. WebGL requires a GPU context which cannot be created.

**How to apply:** Any time a Three.js or WebGL-based 3D effect is requested, implement it using HTML5 Canvas 2D API instead. Canvas 2D is CPU-rendered and works in all environments. For a rotating globe/orb effect, use trigonometric projection of lat/lon wireframe lines, ring arcs, and particle dots — visually identical to Three.js at this scale.

The BlockchainOrb component in `artifacts/faisal-os/src/components/three/BlockchainOrb.tsx` demonstrates the pattern: pure Canvas 2D with mouse-follow rotation, wireframe sphere, rings, and floating particles.
