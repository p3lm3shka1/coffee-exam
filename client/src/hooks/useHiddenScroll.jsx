import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export const useHiddenScroll = ({ threshold = 150, delta = 2 } = {}) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = current - previous;

    if (Math.abs(diff) < delta) return;

    if (current < threshold) {
      setHidden(false);
      return;
    }

    if (diff > 0) setHidden(true);
    if (diff < 0) setHidden(false);
  });

  return hidden;
};

export default useHiddenScroll;
