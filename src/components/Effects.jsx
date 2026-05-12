import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SmokeParticle = ({ delay, color, startX, startY }) => {
  return (
    <motion.div
      className={`absolute w-32 h-32 rounded-full blur-3xl ${
        color === 'blue' ? 'bg-electric-blue' : 'bg-cotton-pink'
      } opacity-20`}
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
      }}
      animate={{
        y: [-20, -100, -180],
        x: [0, 30, -20],
        scale: [1, 1.5, 2],
        opacity: [0.3, 0.5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: delay,
        ease: 'easeInOut',
      }}
    />
  );
};

export const AnimatedBackground = () => {
  const particles = [];
  
  for (let i = 0; i < 10; i++) {
    particles.push({
      id: i,
      delay: i * 1.5,
      color: i % 2 === 0 ? 'blue' : 'pink',
      startX: Math.random() * 100,
      startY: 50 + Math.random() * 50,
    });
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-charcoal via-dark-charcoal/50 to-dark-charcoal" />
      
      {/* Smoke particles */}
      {particles.map((particle) => (
        <SmokeParticle
          key={particle.id}
          delay={particle.delay}
          color={particle.color}
          startX={particle.startX}
          startY={particle.startY}
        />
      ))}
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue opacity-10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cotton-pink opacity-10 blur-[120px] rounded-full" />
    </div>
  );
};

export const FloatingElement = ({ children, delay = 0 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: delay,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};
