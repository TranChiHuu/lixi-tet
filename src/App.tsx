import * as Slider from '@radix-ui/react-slider';
import { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Wheel } from './components/Wheel';
import { DENOMINATIONS } from './utils/money';

function App() {
  const [range, setRange] = useState([10000, 500000]);
  const minAmount = range[0];
  const maxAmount = range[1];
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const validItems = useMemo(() => {
    const items = new Set(DENOMINATIONS.filter(d => d >= minAmount && d <= maxAmount));
    if (maxAmount >= 300000) {
      if (300000 >= minAmount && 300000 <= maxAmount) items.add(300000);
      if (400000 >= minAmount && 400000 <= maxAmount) items.add(400000);
    }
    if (maxAmount > 500000) {
      for (let val = 1000000; val <= maxAmount; val += 500000) {
        if (val >= minAmount) items.add(val);
      }
    }
    if (maxAmount >= minAmount) items.add(maxAmount);
    if (minAmount > 0) items.add(minAmount);

    return Array.from(items)
      .filter(d => d >= minAmount && d <= maxAmount)
      .sort((a, b) => a - b);
  }, [minAmount, maxAmount]);

  const handleSpin = () => {
    if (validItems.length === 0) return;
    setIsSpinning(true);
    setResult(null);
    setShowPopup(false);
  };

  const onSpinEnd = (amount: number) => {
    setIsSpinning(false);
    setResult(amount);
    setShowPopup(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D91E18', '#F4D03F', '#FFFFFF']
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-red-900 via-red-800 to-red-950 text-white overflow-hidden relative font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 relative z-10 flex flex-col max-h-full">
        <header className="text-center mb-6">
          <div className="inline-block p-1 px-3 bg-yellow-500/20 rounded-full text-yellow-300 text-[10px] uppercase tracking-widest font-bold mb-2 border border-yellow-500/30">
            Tết Nguyên Đán 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 drop-shadow-sm uppercase tracking-tighter leading-none">
            Lì Xì May Mắn
            <br /> Nhân Phẩm Đầu Năm
          </h1>
        </header>

        <div className="mb-8 px-2">
          <div className="flex justify-between items-end mb-4 gap-4">
            <div className="text-left flex-1">
              <span className="block text-[10px] uppercase text-white/40 font-bold tracking-widest mb-1">Thấp nhất</span>
              <div className="relative">
                <input
                  type="number"
                  value={minAmount}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), maxAmount);
                    setRange([val, maxAmount]);
                  }}
                  className="bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-lg font-black text-white w-full focus:ring-1 focus:ring-yellow-400 outline-none transition-all"
                />
              </div>
            </div>
            <div className="text-right flex-1">
              <span className="block text-[10px] uppercase text-white/40 font-bold tracking-widest mb-1">Cao nhất</span>
              <div className="relative">
                <input
                  type="number"
                  value={maxAmount}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), minAmount);
                    setRange([minAmount, val]);
                  }}
                  className="bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-lg font-black text-yellow-400 w-full text-right focus:ring-1 focus:ring-yellow-400 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {maxAmount <= 2000000 && (
            <>
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={range}
                onValueChange={setRange}
                max={2000000}
                min={1000}
                step={1000}
              >
                <Slider.Track className="bg-black/40 relative grow rounded-full h-[6px] overflow-hidden">
                  <Slider.Range className="absolute bg-gradient-to-r from-yellow-500 to-yellow-300 h-full shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white border-4 border-red-600 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform focus:outline-none focus: ring-2 focus:ring-yellow-400 cursor-grab active:cursor-grabbing"
                  aria-label="Min amount"
                />
                <Slider.Thumb
                  className="block w-5 h-5 bg-yellow-400 border-4 border-red-600 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-grab active:cursor-grabbing"
                  aria-label="Max amount"
                />
              </Slider.Root>

              <div className="flex justify-between mt-4 text-[9px] text-white/30 uppercase font-bold tracking-tighter px-1">
                <span>1K</span>
                <span>500K</span>
                <span>1M</span>
                <span>1.5M</span>
                <span>2M</span>
              </div>
            </>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center min-h-0 mb-6">
          {validItems.length > 0 ? (
            <div className="scale-[0.65] md:scale-[0.75] origin-center">
              <Wheel items={validItems} onSpinEnd={onSpinEnd} isSpinning={isSpinning} />
            </div>
          ) : (
            <div className="text-center text-red-300 font-bold py-10 bg-black/30 rounded-3xl border border-white/5 backdrop-blur-sm">
              Khoảng tiền không hợp lệ!
            </div>
          )}
        </div>

        <button
          onClick={handleSpin}
          disabled={isSpinning || validItems.length === 0}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-red-900 font-bold text-xl py-4 rounded-full shadow-lg transform transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 mb-4"
        >
          {isSpinning ? 'Đang quay...' : 'QUAY NGAY!'}
        </button>
      </div>

      {/* Result Popup */}
      <AnimatePresence>
        {showPopup && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.5, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-gradient-to-b from-red-600 to-red-800 rounded-[2.5rem] p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(220,38,38,0.5)] border-4 border-yellow-400 relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200"></div>
              
              <div className="mb-4">
                <span className="text-6xl text-yellow-300">🧧</span>
              </div>
              
              <h2 className="text-2xl font-black text-white uppercase italic tracking-widest mb-2">Chúc Mừng!</h2>
              <p className="text-yellow-100/70 text-sm mb-6 uppercase font-bold tracking-tighter">Bạn đã nhận được lộc lì xì:</p>
              
              <div className="bg-black/20 rounded-2xl py-6 mb-8 border border-white/10">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 drop-shadow-lg">
                  {result.toLocaleString('vi-VN')}
                  <span className="text-xl ml-1">VNĐ</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowPopup(false)}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-red-900 font-black py-4 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest"
              >
                Nhận Lộc
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <footer className="absolute bottom-4 text-white/20 text-[10px] text-center w-full z-0 font-light px-4">
        © 2026 - Michael Tran - Mang lại may mắn cho mọi nhà
      </footer>
    </div>
  );
}

export default App;
