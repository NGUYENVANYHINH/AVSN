import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function GiftBox({ onOpen }) {
  const controls = useAnimation();
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    controls.start({
      scale: 1,
      opacity: 1,
      transition: {
        scale: { type: "spring", duration: 1.2, bounce: 0.4 },
        opacity: { duration: 1.2 }
      }
    });
    // Lắc lư bằng state để truyền rotate vào <g>
    let i = 0;
    const keyframes = [0, -5, 5, -3, 3, 0];
    const interval = setInterval(() => {
      setRotate(keyframes[i % keyframes.length]);
      i++;
    }, 200);
    return () => clearInterval(interval);
  }, [controls]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        zIndex: 10,
        width: "min(40vw, 110px)",
        height: "min(45vw, 130px)",
        transform: "translate(-50%, -50%)",
        cursor: onOpen ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={controls}
      onClick={onOpen}
    >
      <svg width="100%" height="100%" viewBox="0 0 110 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
        <g transform={`translate(-35, -40) rotate(${rotate}, 55, 65)`}>
          {/* Thân hộp */}
          <rect x="15" y="50" width="80" height="60" rx="14" fill="#FFD6E0" stroke="#E75480" strokeWidth="4" />
          {/* Nắp hộp */}
          <rect x="10" y="35" width="90" height="25" rx="10" fill="#FFB6C1" stroke="#E75480" strokeWidth="4" />
          {/* Ruy băng dọc */}
          <rect x="52" y="35" width="8" height="75" rx="4" fill="#E75480"/>
          {/* Ruy băng ngang */}
          <rect x="20" y="60" width="70" height="10" rx="5" fill="#E75480"/>
          {/* Nơ */}
          <ellipse cx="56" cy="35" rx="13" ry="8" fill="#FFD6E0" stroke="#E75480" strokeWidth="3"/>
          <ellipse cx="40" cy="30" rx="7" ry="4" fill="#FFD6E0" stroke="#E75480" strokeWidth="2"/>
          <ellipse cx="72" cy="30" rx="7" ry="4" fill="#FFD6E0" stroke="#E75480" strokeWidth="2"/>
        </g>
      </svg>
    </motion.div>
  );
} 