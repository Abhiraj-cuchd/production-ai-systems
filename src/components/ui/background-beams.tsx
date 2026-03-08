import { useEffect, useRef } from "react";

export function BackgroundBeams({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let beams: Beam[] = [];

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }

    type Beam = {
      x: number;
      y: number;
      angle: number;
      length: number;
      speed: number;
      opacity: number;
      width: number;
      life: number;
      maxLife: number;
    };

    function createBeam(): Beam {
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      const w = canvas!.width, h = canvas!.height;
      if (side === 0) { x = Math.random() * w; y = -20; }
      else if (side === 1) { x = w + 20; y = Math.random() * h; }
      else if (side === 2) { x = Math.random() * w; y = h + 20; }
      else { x = -20; y = Math.random() * h; }
      const cx = w / 2, cy = h / 2;
      const angle = Math.atan2(cy - y, cx - x) + (Math.random() - 0.5) * 0.8;
      const maxLife = 120 + Math.random() * 180;
      return {
        x, y, angle,
        length: 200 + Math.random() * 300,
        speed: 0.8 + Math.random() * 1.2,
        opacity: 0,
        width: 0.5 + Math.random() * 1.5,
        life: 0,
        maxLife,
      };
    }

    function drawBeam(b: Beam) {
      const progress = b.life / b.maxLife;
      const fadeIn = Math.min(progress * 5, 1);
      const fadeOut = Math.min((1 - progress) * 5, 1);
      const alpha = fadeIn * fadeOut * b.opacity * 0.6;
      if (alpha <= 0) return;

      const endX = b.x + Math.cos(b.angle) * b.length;
      const endY = b.y + Math.sin(b.angle) * b.length;

      const grad = ctx!.createLinearGradient(b.x, b.y, endX, endY);
      grad.addColorStop(0, `rgba(124, 58, 237, 0)`);
      grad.addColorStop(0.3, `rgba(124, 58, 237, ${alpha})`);
      grad.addColorStop(0.7, `rgba(139, 92, 246, ${alpha * 0.7})`);
      grad.addColorStop(1, `rgba(124, 58, 237, 0)`);

      ctx!.beginPath();
      ctx!.moveTo(b.x, b.y);
      ctx!.lineTo(endX, endY);
      ctx!.strokeStyle = grad;
      ctx!.lineWidth = b.width;
      ctx!.stroke();
    }

    function init() {
      resize();
      beams = Array.from({ length: 12 }, () => {
        const b = createBeam();
        b.life = Math.random() * b.maxLife;
        b.opacity = 0.3 + Math.random() * 0.4;
        return b;
      });
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      beams.forEach((b, i) => {
        b.life++;
        b.x += Math.cos(b.angle) * b.speed;
        b.y += Math.sin(b.angle) * b.speed;
        if (b.opacity < 0.5) b.opacity += 0.01;
        drawBeam(b);
        if (b.life >= b.maxLife) {
          beams[i] = createBeam();
          beams[i].opacity = 0;
        }
      });

      animFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrameId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
