
import { motion } from 'framer-motion';

export function FloatingElements() {
  // Define shapes and positions
  const elements = [
    { 
      size: 60, 
      position: { top: '10%', left: '5%' }, 
      color: 'from-blue-400/20 to-indigo-500/20',
      delay: 0,
      duration: 8,
      rotation: 5
    },
    { 
      size: 80, 
      position: { top: '30%', right: '8%' }, 
      color: 'from-indigo-400/20 to-purple-500/20',
      delay: 1,
      duration: 10,
      rotation: -8
    },
    { 
      size: 40, 
      position: { bottom: '20%', left: '15%' }, 
      color: 'from-purple-400/20 to-fuchsia-500/20',
      delay: 2,
      duration: 9,
      rotation: 12
    },
    { 
      size: 100, 
      position: { bottom: '30%', right: '15%' }, 
      color: 'from-blue-400/20 to-cyan-500/20',
      delay: 0.5,
      duration: 12,
      rotation: -10
    },
    { 
      size: 50, 
      position: { top: '50%', left: '20%' }, 
      color: 'from-indigo-400/20 to-blue-500/20',
      delay: 1.5,
      duration: 11,
      rotation: 15
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
      {elements.map((el, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-3xl bg-gradient-to-br ${el.color}`}
          style={{ 
            width: el.size, 
            height: el.size, 
            ...el.position,
          }}
          animate={{ 
            y: [0, -20, 0], 
            rotate: [0, el.rotation, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: el.duration, 
            delay: el.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
