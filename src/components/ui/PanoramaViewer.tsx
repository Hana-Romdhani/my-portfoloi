import { useRef, useEffect } from "react";

interface PanoramaViewerProps {
  src: string;
  alt?: string;
  size?: number; // px, default 256
}

export default function PanoramaViewer({ src, alt = "", size = 256 }: PanoramaViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ yaw: 0, pitch: 0, dragging: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const S = 512;
    canvas.width = S; canvas.height = S;
    const st = stateRef.current;
    let raf: number;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    const render = () => {
      if (!img.complete || img.naturalWidth === 0) return;
      const offW = img.naturalWidth, offH = img.naturalHeight;
      const fov = Math.PI / 2.5;
      const imgData = ctx.createImageData(S, S);
      const tmp = document.createElement("canvas");
      tmp.width = offW; tmp.height = offH;
      const tc = tmp.getContext("2d")!;
      tc.drawImage(img, 0, 0);
      const src2 = tc.getImageData(0, 0, offW, offH).data;
      const half = S / 2;

      for (let py = 0; py < S; py++) {
        for (let px = 0; px < S; px++) {
          const nx = (px - half) / half, ny = (py - half) / half;
          if (nx * nx + ny * ny > 1) continue;
          let lon = ((st.yaw + nx * fov) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
          let lat = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, st.pitch + ny * fov));
          const sx = Math.floor((lon / (2 * Math.PI)) * offW) % offW;
          const sy = Math.floor(((lat + Math.PI / 2) / Math.PI) * offH) % offH;
          const si = (sy * offW + sx) * 4, di = (py * S + px) * 4;
          imgData.data[di] = src2[si]; imgData.data[di+1] = src2[si+1];
          imgData.data[di+2] = src2[si+2]; imgData.data[di+3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    };

    img.onload = render;

    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(render); };

    const onMouseDown = (e: MouseEvent) => { st.dragging = true; st.lastX = e.clientX; st.lastY = e.clientY; };
    const onMouseUp = () => { st.dragging = false; };
    const onMouseMove = (e: MouseEvent) => {
      if (!st.dragging) return;
      st.yaw -= (e.clientX - st.lastX) * 0.008;
      st.pitch = Math.max(-Math.PI/3, Math.min(Math.PI/3, st.pitch + (e.clientY - st.lastY) * 0.008));
      st.lastX = e.clientX; st.lastY = e.clientY;
      schedule();
    };
    const onTouchStart = (e: TouchEvent) => { st.dragging = true; st.lastX = e.touches[0].clientX; st.lastY = e.touches[0].clientY; };
    const onTouchEnd = () => { st.dragging = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (!st.dragging) return;
      st.yaw -= (e.touches[0].clientX - st.lastX) * 0.008;
      st.pitch = Math.max(-Math.PI/3, Math.min(Math.PI/3, st.pitch + (e.touches[0].clientY - st.lastY) * 0.008));
      st.lastX = e.touches[0].clientX; st.lastY = e.touches[0].clientY;
      schedule();
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [src]);

  return (
    <div
      className="relative rounded-full overflow-hidden border-4 border-primary/30 shadow-lg cursor-grab active:cursor-grabbing"
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        aria-label={alt}
        className="w-full h-full rounded-full"
      />
    </div>
  );
}