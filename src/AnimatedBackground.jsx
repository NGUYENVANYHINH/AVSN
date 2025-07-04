import { motion } from "framer-motion";

const circles = [
  { size: 120, color: "#FFD6E0", top: "10%", left: "15%", delay: 0 },
  { size: 90, color: "#B5EAD7", top: "60%", left: "20%", delay: 0.5 },
  { size: 140, color: "#FFDAC1", top: "30%", left: "70%", delay: 1 },
  { size: 80, color: "#C7CEEA", top: "75%", left: "60%", delay: 1.5 },
  { size: 100, color: "#E2F0CB", top: "50%", left: "80%", delay: 2 },
  { size: 70, color: "#FFD6E0", top: "5%", left: "5%", delay: 1.2 },
  { size: 60, color: "#B5EAD7", top: "80%", left: "10%", delay: 1.7 },
  { size: 110, color: "#FFDAC1", top: "15%", left: "60%", delay: 2.2 },
  { size: 90, color: "#C7CEEA", top: "60%", left: "75%", delay: 2.5 },
  { size: 60, color: "#E2F0CB", top: "85%", left: "80%", delay: 2.8 },
];

const animals = [
  { type: "bear", top: "8%", left: "6%", size: 60, delay: 0.5 }, // top-left
  { type: "rabbit", top: "30%", left: "7%", size: 55, delay: 1.2 }, // mid-left
  { type: "bear", bottom: "10%", left: "10%", size: 70, delay: 1.7 }, // bottom-left
  { type: "bear", bottom: "10%", right: "12%", size: 90, delay: 0 },
  { type: "bear", top: "12%", right: "10%", size: 60, delay: 1 },
  { type: "bear", top: "20%", right: "18%", size: 70, delay: 2 },
  { type: "bear", bottom: "18%", left: "20%", size: 80, delay: 1.5 },
  { type: "rabbit", top: "8%", right: "8%", size: 60, delay: 0.8 },
  { type: "rabbit", bottom: "8%", right: "8%", size: 65, delay: 1.2 },
  { type: "rabbit", top: "25%", left: "80%", size: 55, delay: 1.5 },
  { type: "rabbit", bottom: "25%", right: "18%", size: 60, delay: 1.7 },
  { type: "rabbit", top: "70%", left: "60%", size: 50, delay: 2 },
];

function BearSVG({ size = 90 }) {
  return (
    <svg viewBox="0 0 90 90" width={size} height={size} fill="none">
      <ellipse cx="45" cy="55" rx="28" ry="25" fill="#F9D29D"/>
      <ellipse cx="25" cy="30" rx="10" ry="12" fill="#F9D29D"/>
      <ellipse cx="65" cy="30" rx="10" ry="12" fill="#F9D29D"/>
      <ellipse cx="45" cy="60" rx="18" ry="15" fill="#fff"/>
      <ellipse cx="35" cy="55" rx="3" ry="4" fill="#7D5A4E"/>
      <ellipse cx="55" cy="55" rx="3" ry="4" fill="#7D5A4E"/>
      <ellipse cx="45" cy="68" rx="5" ry="3" fill="#7D5A4E"/>
      <ellipse cx="25" cy="22" rx="4" ry="4.5" fill="#E2B07A"/>
      <ellipse cx="65" cy="22" rx="4" ry="4.5" fill="#E2B07A"/>
    </svg>
  );
}

function RabbitSVG({ size = 70 }) {
  return (
    <svg viewBox="0 0 90 90" width={size} height={size} fill="none">
      {/* Tai */}
      <ellipse cx="30" cy="20" rx="7" ry="18" fill="#fff" stroke="#E2B07A" strokeWidth="2"/>
      <ellipse cx="60" cy="20" rx="7" ry="18" fill="#fff" stroke="#E2B07A" strokeWidth="2"/>
      {/* Đầu */}
      <ellipse cx="45" cy="50" rx="25" ry="22" fill="#fff" stroke="#E2B07A" strokeWidth="2"/>
      {/* Mặt */}
      <ellipse cx="37" cy="55" rx="3" ry="4" fill="#7D5A4E"/>
      <ellipse cx="53" cy="55" rx="3" ry="4" fill="#7D5A4E"/>
      <ellipse cx="45" cy="65" rx="5" ry="3" fill="#E2B07A"/>
      {/* Mũi */}
      <ellipse cx="45" cy="60" rx="2" ry="1.5" fill="#E2B07A"/>
    </svg>
  );
}

export default function AnimatedBackground() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      overflow: "hidden",
      pointerEvents: "none"
    }}>
      {/* Circles */}
      {circles.map((c, i) => (
        <motion.div
          key={"circle-"+i}
          style={{
            position: "absolute",
            width: c.size,
            height: c.size,
            borderRadius: "50%",
            background: c.color,
            top: c.top,
            left: c.left,
            opacity: 0.5,
            filter: "blur(2px)"
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: c.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      {/* Animals */}
      {animals.map((a, i) => (
        <motion.div
          key={a.type + "-" + i}
          style={{
            position: "absolute",
            ...((a.top !== undefined) ? { top: a.top } : { bottom: a.bottom }),
            ...((a.left !== undefined) ? { left: a.left } : { right: a.right }),
            width: a.size,
            height: a.size,
            zIndex: 1,
            transform: a.type === "rabbit" ? "translate(-50%, 0)" : undefined
          }}
          animate={{ y: [0, -10, 0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: a.delay }}
        >
          {a.type === "bear" ? <BearSVG size={a.size} /> : <RabbitSVG size={a.size} />}
        </motion.div>
      ))}
    </div>
  );
} 