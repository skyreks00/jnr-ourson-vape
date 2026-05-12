import { motion } from 'framer-motion';

export const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-electric-blue to-cotton-pink text-white font-semibold px-8 py-4 rounded-full hover:scale-105 glow-blue transition-all duration-300',
    secondary: 'glass glass-hover text-soft-gray font-semibold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300',
    outline: 'border-2 border-electric-blue text-electric-blue font-semibold px-8 py-4 rounded-full hover:bg-electric-blue hover:text-dark-charcoal transition-all duration-300',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const GlassCard = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`glass ${hover ? 'glass-hover' : ''} rounded-3xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const SectionTitle = ({ children, className = '' }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${className}`}
    >
      {children}
    </motion.h2>
  );
};

export const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};
