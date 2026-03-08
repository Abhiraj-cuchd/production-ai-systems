import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
}

export function TextGenerateEffect({ words, className = "" }: TextGenerateEffectProps) {
  const wordArray = words.split(" ");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={className}>
      {wordArray.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: 0.35,
            delay: i * 0.07,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
