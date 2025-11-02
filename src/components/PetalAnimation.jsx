import { useEffect, useRef } from 'react';
import './PetalAnimation.css';

const PetalAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // 캔버스 크기 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 꽃잎 클래스
    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.speed = 1 + Math.random() * 2;
        this.amplitude = 20 + Math.random() * 30;
        this.frequency = 0.01 + Math.random() * 0.02;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.size = 5 + Math.random() * 5;
        this.opacity = 0.3 + Math.random() * 0.4;
        this.offset = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * this.frequency + this.offset) * 0.5;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        // 꽃잎 모양 그리기 (타원형)
        ctx.fillStyle = '#FADADD';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // 꽃잎 객체들 생성
    const petals = Array.from({ length: 20 }, () => new Petal());

    // 애니메이션 루프
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach(petal => {
        petal.update();
        petal.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 클린업
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="petal-canvas" />;
};

export default PetalAnimation;

