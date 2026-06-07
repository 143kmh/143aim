"use client";

import { useEffect, useRef } from 'react';

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    // Подгоняем под размер экрана
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Отслеживаем мышь для параллакса
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Класс частицы (пылинки/звездочки)
    class Particle {
      x: number; y: number; z: number; speedX: number; speedY: number; alpha: number;
      
      constructor() {
        this.x = Math.random() * (canvas!.width + 200) - 100;
        this.y = Math.random() * (canvas!.height + 200) - 100;
        this.z = Math.random() * 2 + 0.5; // Глубина (определяет параллакс)
        this.speedY = this.z * 0.1 + 0.05; // Медленное падение
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // Зацикливание при вылете за экран
        if (this.y > canvas!.height + 100) {
          this.y = -100;
          this.x = Math.random() * (canvas!.width + 200) - 100;
        }
        if (this.x < -100) this.x = canvas!.width + 100;
        if (this.x > canvas!.width + 100) this.x = -100;
      }
      
      draw(ctx: CanvasRenderingContext2D, mx: number, my: number) {
        // Применяем смещение мыши (параллакс) умноженное на глубину (z)
        const drawX = this.x - mx * this.z;
        const drawY = this.y - my * this.z;
        
        ctx.beginPath();
        ctx.arc(drawX, drawY, this.z * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(194, 187, 224, ${this.alpha})`; // Цвет Lavender
        ctx.shadowBlur = this.z * 2;
        ctx.shadowColor = `rgba(194, 187, 224, ${this.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Создаем 80 частиц
    for (let i = 0; i < 80; i++) particles.push(new Particle());

    // Цикл анимации
    const animate = () => {
      // Плавное следование за мышью
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // Очистка кадра
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw(ctx, mouseX, mouseY);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none w-full h-full" />;
}