import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { formatMoney } from '../utils/money';

interface WheelProps {
  items: number[];
  onSpinEnd: (result: number) => void;
  isSpinning: boolean;
}

export const Wheel: React.FC<WheelProps> = ({ items, onSpinEnd, isSpinning }) => {
  const controls = useAnimation();
  const rotation = React.useRef(0);

  useEffect(() => {
    if (isSpinning) {
      const spin = async () => {
        // Determine random winning index
        const winningIndex = Math.floor(Math.random() * items.length);
        const segmentAngle = 360 / items.length;
        
        const minSpins = 5;
        const baseRotation = 360 * minSpins;
        
        const targetAngle = 360 - ((winningIndex ) * segmentAngle) - (segmentAngle / 2); 
        // Added randomness to land not exactly in center but within limit
        const randomOffset = (Math.random() - 0.5) * (segmentAngle * 0.8);

        const currentRotation = rotation.current;
        const totalRotation = currentRotation + baseRotation + (targetAngle - (currentRotation % 360)) + randomOffset;
        
        // We also need to normalize totalRotation so it's always increasing to spin one way
        const finalRotation = totalRotation + (360 * 2); // Add extra spins to ensure forward motion

        await controls.start({
          rotate: finalRotation,
          transition: {
            duration: 5,
            ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for ease-out
            type: "tween"
          }
        });

        rotation.current = finalRotation;
        onSpinEnd(items[winningIndex]);
      };
      spin();
    }
  }, [isSpinning, items, controls, onSpinEnd]);

  const colors = ['#D91E18', '#F1A9A0', '#F4D03F', '#E67E22', '#9B59B6', '#3498DB', '#2ECC71', '#1ABC9C'];

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-yellow-300 drop-shadow-lg"></div>

      <motion.div
        className="w-full h-full rounded-full border-4 border-yellow-400 overflow-hidden shadow-2xl relative bg-white"
        animate={controls}
        initial={{ rotate: 0 }}
        style={{
          boxShadow: '0 0 20px rgba(244, 208, 63, 0.5)'
        }}
      >
        {/* SVG Implementation for perfect slices */}
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {items.map((item, index) => {
            const angle = 360 / items.length;
            const startAngle = index * angle;
            const endAngle = (index + 1) * angle;

            // Convert polar to cartesian
            // x = r * cos(a), y = r * sin(a)
            // Center is 50, 50. Radius 50.
            const x1 = 50 + 50 * Math.cos(Math.PI * startAngle / 180);
            const y1 = 50 + 50 * Math.sin(Math.PI * startAngle / 180);
            const x2 = 50 + 50 * Math.cos(Math.PI * endAngle / 180);
            const y2 = 50 + 50 * Math.sin(Math.PI * endAngle / 180);

            const pathData = items.length === 1 
              ? `M 50 50 L ${x1} ${y1} A 50 50 0 1 1 ${x1} ${y1} Z` // Full circle logic fails with arc, but for 1 item we might just render circle
              : `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

            return (
              <g key={index}>
                <path
                  d={items.length === 1 ? "M 50 50 m -50, 0 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0" : pathData}
                  fill={colors[index % colors.length]}
                  stroke="#FFF"
                  strokeWidth="0.5"
                />
                <text
                  x="50"
                  y="50"
                  fill="white"
                  stroke="rgba(0,0,0,0.8)"
                  strokeWidth="0.6"
                  paint-order="stroke"
                  fontSize="7"
                  fontWeight="900"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  transform={`rotate(${startAngle + angle / 2}, 50, 50) translate(30, 0)`}
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                >
                  {formatMoney(item)}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>
      
      {/* Center knob */}
      <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-full shadow-inner border-2 border-white z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
      </div>
    </div>
  );
};
