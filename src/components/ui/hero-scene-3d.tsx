import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* ---------- canvas texture helpers (no external assets needed) ---------- */

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function makeTexture(
  size: number,
  draw: (ctx: CanvasRenderingContext2D, s: number) => void
) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function makeScreenTexture() {
  return makeTexture(512, (ctx, s) => {
    ctx.fillStyle = '#0d0715';
    ctx.fillRect(0, 0, s, s * 0.6);
    // code lines
    const codeColors = ['#c084fc', '#f472b6', '#60a5fa', '#34d399', '#e5e7eb'];
    for (let i = 0; i < 9; i++) {
      const y = 30 + i * 26;
      const indent = (i % 4) * 14 + 20;
      const w = 60 + Math.random() * 130;
      ctx.fillStyle = codeColors[i % codeColors.length];
      ctx.globalAlpha = 0.85;
      roundRect(ctx, indent, y, w, 8, 4);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    // right panel: mini bar chart + donut
    ctx.fillStyle = '#150c22';
    roundRect(ctx, 300, 20, 190, 150, 10);
    ctx.fill();
    const bars = [40, 70, 50, 90, 65];
    bars.forEach((h, i) => {
      ctx.fillStyle = i % 2 ? '#a78bfa' : '#f0abfc';
      ctx.fillRect(315 + i * 32, 150 - h, 20, h);
    });
    ctx.beginPath();
    ctx.arc(230, 260, 55, 0, Math.PI * 2);
    ctx.strokeStyle = '#2a1d40';
    ctx.lineWidth = 18;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(230, 260, 55, -Math.PI / 2, Math.PI * 0.9);
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 18;
    ctx.stroke();
  });
}

function makeMiniScreenTexture() {
  return makeTexture(256, (ctx, s) => {
    ctx.fillStyle = '#0d0715';
    ctx.fillRect(0, 0, s, s);
    const colors = ['#8b5cf6', '#60a5fa', '#f472b6'];
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = '#1a1128';
      roundRect(ctx, 15, 15 + i * 78, s - 30, 62, 8);
      ctx.fill();
      ctx.fillStyle = colors[i];
      roundRect(ctx, 26, 26 + i * 78, 40, 10, 4);
      ctx.fill();
    }
  });
}

function makeKeyboardTexture() {
  return makeTexture(256, (ctx, s) => {
    ctx.fillStyle = '#180f26';
    ctx.fillRect(0, 0, s, s);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 10; col++) {
        ctx.fillStyle = 'rgba(139,92,246,0.35)';
        roundRect(ctx, 8 + col * 24, 10 + row * 30, 18, 20, 4);
        ctx.fill();
      }
    }
  });
}

function makeIconTexture(label: string, bg: string, fg: string) {
  return makeTexture(256, (ctx, s) => {
    roundRect(ctx, 8, 8, s - 16, s - 16, 36);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(139,92,246,0.5)';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = fg;
    ctx.font = "bold 70px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, s / 2, s / 2 + 4);
  });
}

/* ---------------------------- main component ---------------------------- */

export default function HeroScene3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      36,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.3, 8.2);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // lights
    scene.add(new THREE.AmbientLight(0x6b5bb0, 0.55));
    const p1 = new THREE.PointLight(0x8b5cf6, 2.4, 25);
    p1.position.set(4, 5, 4);
    scene.add(p1);
    const p2 = new THREE.PointLight(0x60a5fa, 1.5, 25);
    p2.position.set(-5, 3, -2);
    scene.add(p2);
    const p3 = new THREE.PointLight(0xf472b6, 0.9, 18);
    p3.position.set(0, 1.5, -6);
    scene.add(p3);

    const rig = new THREE.Group();
    rig.rotation.set(0.18, -0.55, 0);
    scene.add(rig);

    // glowing platform ring (signature element)
    const ringGeo = new THREE.RingGeometry(2.6, 2.75, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.62;
    rig.add(ring);

    const floorGeo = new THREE.CircleGeometry(2.55, 64);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x120a1e,
      transparent: true,
      opacity: 0.6,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.615;
    rig.add(floor);

    // desk
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x1a1024,
      metalness: 0.4,
      roughness: 0.6,
    });
    const desk = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.14, 2.2), deskMat);
    desk.position.y = -0.5;
    rig.add(desk);

    // monitor stand
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x2a1f3d,
      metalness: 0.5,
      roughness: 0.4,
    });
    const standBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.32, 0.06, 24),
      standMat
    );
    standBase.position.set(0, -0.4, 0);
    rig.add(standBase);
    const standNeck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.55, 12),
      standMat
    );
    standNeck.position.set(0, -0.1, 0);
    rig.add(standNeck);

    // monitor body + screen
    const monitorBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 1.05, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x140b20, metalness: 0.6, roughness: 0.3 })
    );
    monitorBody.position.set(0, 0.55, -0.06);
    rig.add(monitorBody);

    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.56, 0.92),
      new THREE.MeshBasicMaterial({ map: makeScreenTexture() })
    );
    screen.position.set(0, 0.55, -0.028);
    rig.add(screen);

    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.9, 1.25),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.28 })
    );
    glow.position.set(0, 0.55, -0.08);
    rig.add(glow);

    // keyboard
    const keyboard = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 0.05, 0.4),
      new THREE.MeshStandardMaterial({
        map: makeKeyboardTexture(),
        metalness: 0.3,
        roughness: 0.7,
      })
    );
    keyboard.position.set(-0.2, -0.44, 0.75);
    rig.add(keyboard);

    // laptop
    const laptopBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.04, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x1c1329, metalness: 0.5, roughness: 0.4 })
    );
    laptopBase.position.set(1.25, -0.47, 0.4);
    rig.add(laptopBase);

    const laptopScreenGroup = new THREE.Group();
    laptopScreenGroup.position.set(1.25, -0.45, 0.12);
    laptopScreenGroup.rotation.x = -1.15;
    const laptopScreenBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.55, 0.03),
      new THREE.MeshStandardMaterial({ color: 0x140b20, metalness: 0.5, roughness: 0.4 })
    );
    laptopScreenBody.position.z = 0.3;
    laptopScreenGroup.add(laptopScreenBody);
    const laptopFace = new THREE.Mesh(
      new THREE.PlaneGeometry(0.76, 0.47),
      new THREE.MeshBasicMaterial({ map: makeMiniScreenTexture() })
    );
    laptopFace.position.z = 0.316;
    laptopScreenGroup.add(laptopFace);
    rig.add(laptopScreenGroup);

    // floating tech icon sprites orbiting the monitor
    const icons = [
      { label: 'TS', bg: '#122340', fg: '#60a5fa' },
      { label: 'JS', bg: '#3a2f0d', fg: '#f7df1e' },
      { label: 'AWS', bg: '#2b1f0a', fg: '#ff9900' },
      { label: 'GH', bg: '#1a1a1a', fg: '#e5e7eb' },
      { label: '</>', bg: '#241338', fg: '#c084fc' },
      { label: 'DB', bg: '#0d2a3d', fg: '#34d399' },
    ];
    const radius = 2.3;
    const iconSprites: THREE.Sprite[] = [];
    icons.forEach((ic, i) => {
      const angle = (i / icons.length) * Math.PI * 2;
      const tex = makeIconTexture(ic.label, ic.bg, ic.fg);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(0.55, 0.55, 0.55);
      const baseX = Math.cos(angle) * radius;
      const baseZ = Math.sin(angle) * radius * 0.55 - 0.2;
      const baseY = 0.55 + Math.sin(i * 1.4) * 0.35;
      sprite.position.set(baseX, baseY, baseZ);
      sprite.userData = { baseY, phase: i * 1.3 };
      rig.add(sprite);

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.3,
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        sprite.position.clone(),
        new THREE.Vector3(0, 0.55, -0.06),
      ]);
      const line = new THREE.Line(lineGeo, lineMat);
      rig.add(line);
      sprite.userData.line = line;
      iconSprites.push(sprite);
    });

    // ambient background particles
    const starCount = 140;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 16;
      starPos[i * 3 + 1] = Math.random() * 6;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: 0x9d8fd6,
        size: 0.03,
        transparent: true,
        opacity: 0.55,
      })
    );
    scene.add(stars);

    /* -------------------------- interaction -------------------------- */
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let autoRotate = true;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const AUTO_SPEED = 0.0022;

    const getXY = (e: PointerEvent) => ({ x: e.clientX, y: e.clientY });

    const onDown = (e: PointerEvent) => {
      isDragging = true;
      autoRotate = false;
      if (idleTimer) clearTimeout(idleTimer);
      const { x, y } = getXY(e);
      lastX = x;
      lastY = y;
      renderer.domElement.style.cursor = 'grabbing';
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const { x, y } = getXY(e);
      const dx = x - lastX;
      const dy = y - lastY;
      lastX = x;
      lastY = y;
      rig.rotation.y += dx * 0.006;
      rig.rotation.x = Math.max(-0.4, Math.min(0.5, rig.rotation.x + dy * 0.004));
    };
    const onUp = () => {
      if (!isDragging) return;
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';
      idleTimer = setTimeout(() => {
        autoRotate = true;
      }, 1000);
    };

    const dom = renderer.domElement;
    dom.style.cursor = 'grab';
    dom.style.touchAction = 'none';
    dom.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (autoRotate) rig.rotation.y += AUTO_SPEED;

      iconSprites.forEach((s) => {
        s.position.y = s.userData.baseY + Math.sin(t * 0.8 + s.userData.phase) * 0.1;
        const posAttr = s.userData.line.geometry.attributes.position as THREE.BufferAttribute;
        posAttr.setXYZ(0, s.position.x, s.position.y, s.position.z);
        posAttr.needsUpdate = true;
      });

      ring.material.opacity = 0.35 + Math.sin(t * 1.2) * 0.1;
      stars.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };
    animate();
    setLoaded(true);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (idleTimer) clearTimeout(idleTimer);
      dom.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      if (mount.contains(dom)) mount.removeChild(dom);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[380px] sm:h-[440px]"
      role="img"
      aria-label="Interactive 3D illustration of a developer desk setup — drag to rotate"
      style={{ touchAction: 'none' }}
      data-loaded={loaded}
    />
  );
}
