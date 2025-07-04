import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { motion, AnimatePresence } from "framer-motion";
import GiftBox from "./GiftBox";
import AnimatedBackground from "./AnimatedBackground";
import React from 'react';

function BirthdayCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border-4 border-pink-300 relative overflow-hidden"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-3xl font-extrabold text-pink-500 mb-4 drop-shadow-lg"
        >
          🎉 Chúc mừng sinh nhật! 🎂
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="text-lg text-gray-700 mb-6"
        >
          Chúc bạn một tuổi mới thật nhiều niềm vui, sức khỏe và thành công! Mong mọi điều tốt đẹp nhất sẽ đến với bạn trong năm nay! 🥳
        </motion.p>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="flex justify-center gap-2"
        >
          <span className="text-2xl">🎈</span>
          <span className="text-2xl">🎁</span>
          <span className="text-2xl">🎊</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function App() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showAnimals, setShowAnimals] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [count, setCount] = useState(3);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  // Khi mở app, cho động vật xuất hiện trước
  React.useEffect(() => {
    setTimeout(() => setShowAnimals(true), 300); // delay nhỏ cho mượt
    setTimeout(() => setShowText(true), 2000); // sau 2s cho chữ xuất hiện
    setTimeout(() => setShowButton(true), 2000 + 60 * ("Happy birthdayÁi Vi".length + 2)); // sau khi chữ xong thì nút xuất hiện
  }, []);

  // Đếm ngược khi bấm nút
  React.useEffect(() => {
    if (isCountingDown && count > 0) {
      const timer = setTimeout(() => setCount(c => c - 1), 1200); // chậm lại
      return () => clearTimeout(timer);
    }
    if (isCountingDown && count === 0) {
      setTimeout(() => setIsGiftOpened(true), 700); // chuyển cảnh mượt
    }
  }, [isCountingDown, count]);

  // Tách từng ký tự cho hiệu ứng
  const title1 = "Happy birthday";
  const title2 = "Ái Vi";

  // Nếu đã mở quà thì render video toàn màn hình với hiệu ứng xuất hiện mượt mà
  if (isGiftOpened && !isVideoEnded) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="video"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <video
            src="/SN.mp4"
            autoPlay
            controls
            onEnded={() => setIsVideoEnded(true)}
            style={{ width: '100vw', height: '100vh', objectFit: 'contain', background: '#000' }}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  // Sau khi video kết thúc, hiện dòng chữ chúc mừng với hiệu ứng từng ký tự
  if (isGiftOpened && isVideoEnded) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'transparent',
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <AnimatedBackground />
        </div>
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              fontSize: 'clamp(1.8rem, 7vw, 3.2rem)',
              color: '#e75480',
              fontWeight: 700,
              fontFamily: 'Pacifico, cursive',
              textAlign: 'center',
              textShadow: '0 4px 24px #fff, 0 0 0 4px #ffd6e0',
              letterSpacing: 2,
              userSelect: 'none',
              zIndex: 2,
              maxWidth: '95vw',
              wordBreak: 'break-word',
            }}
          >
            <span>
              {title1.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.4, type: 'spring' }}
                  style={{ display: 'inline-block' }}
                >
                  {char === " " ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
            <br />
            <span style={{
              display: 'inline-block',
              fontSize: 'clamp(2.2rem, 9vw, 3.8rem)',
              color: '#4fc3f7',
              marginTop: 'clamp(10px, 3vw, 20px)',
              textShadow: `0 2px 8px #fff,
                2px 2px 0 #b5e0ff,
                -2px -2px 0 #ffb6c1,
                2px -2px 0 #ffe4b5,
                -2px 2px 0 #ffd6e0`,
            }}>
              {title2.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + title1.length * 0.06 + i * 0.06, duration: 0.4, type: 'spring' }}
                  style={{ display: 'inline-block' }}
                >
                  {char === " " ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          </motion.div>
        </div>
      </div>
    );
  }

  // Nếu đang đếm ngược thì overlay số
  if (isCountingDown) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(255,255,255,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
            style={{
              fontSize: 'clamp(3rem, 15vw, 8rem)',
              color: '#e75480',
              fontFamily: 'Pacifico, cursive',
              textShadow: '0 4px 24px #ffd6e0, 0 0 0 4px #b5e0ff44',
              fontWeight: 700,
              marginBottom: 0,
              letterSpacing: 2,
              userSelect: 'none',
            }}
          >
            {count > 0 ? count : '🎉'}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Động vật xuất hiện fade-in */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showAnimals ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          style={{ width: '100%', height: '100%' }}
        >
          <AnimatedBackground />
        </motion.div>
      </div>
      <motion.h1
        initial={false}
        animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          fontSize: 'clamp(1.8rem, 7vw, 3.2rem)',
          color: '#e75480',
          fontWeight: 700,
          textShadow: `0 2px 8px #fff,
            2px 2px 0 #ffb6c1,
            -2px -2px 0 #b5e0ff,
            2px -2px 0 #ffe4b5,
            -2px 2px 0 #ffd6e0`,
          letterSpacing: 2,
          fontFamily: 'Pacifico, cursive',
          textAlign: 'center',
          whiteSpace: 'pre-line',
          margin: 0,
          padding: 0,
          marginTop: 'clamp(40px, 18vw, 240px)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Chữ xuất hiện từng ký tự */}
        <span>
          {title1.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 2 + i * 0.06, duration: 0.4, type: 'spring' }}
              style={{ display: 'inline-block' }}
            >
              {char === " " ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
        <br />
        <span style={{
          display: 'inline-block',
          fontSize: 'clamp(2.2rem, 9vw, 3.8rem)',
          color: '#4fc3f7',
          marginTop: 'clamp(10px, 3vw, 20px)',
          textShadow: `0 2px 8px #fff,
            2px 2px 0 #b5e0ff,
            -2px -2px 0 #ffb6c1,
            2px -2px 0 #ffe4b5,
            -2px 2px 0 #ffd6e0`,
        }}>
          {title2.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 2 + title1.length * 0.06 + i * 0.06, duration: 0.4, type: 'spring' }}
              style={{ display: 'inline-block' }}
            >
              {char === " " ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
        <br />
        {/* Nút xuất hiện cuối cùng */}
        {showButton && !isGiftOpened ? (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.09,
              rotate: [-3, 3, -3],
              boxShadow: '0 0 24px 8px #ffb6c1, 0 0 48px 16px #b5e0ff',
              filter: 'brightness(1.15) drop-shadow(0 0 8px #fff)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{
              marginTop: 'clamp(12px, 3vw, 24px)',
              padding: 'clamp(8px, 2vw, 12px) clamp(18px, 6vw, 28px)',
              background: 'linear-gradient(90deg, #ffb6d5 0%, #b5e0ff 100%)',
              color: '#fff',
              fontFamily: 'Pacifico, cursive',
              fontSize: 'clamp(1.1rem, 5vw, 1.5rem)',
              border: '4px solid #fff',
              borderRadius: '40px',
              boxShadow: '0 4px 24px #ffd6e0, 0 0 0 4px #b5e0ff44',
              cursor: 'pointer',
              outline: 'none',
              position: 'relative',
              zIndex: 20,
              letterSpacing: 1,
              textShadow: '0 2px 8px #ffb6c1, 0 0 8px #fff',
              transition: 'all 0.18s cubic-bezier(.4,2,.6,1)',
            }}
            onClick={() => {
              setIsCountingDown(true);
              setCount(3);
            }}
          >
            <span style={{ fontSize: '1.3em', marginRight: 8 }}>🎁</span> Mở quà đi nè
          </motion.button>
        ) : null}
      </motion.h1>
    </div>
  );
}

export default App
