import { useEffect, useRef, useState } from "react";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function extractNumber(value) {
  if (typeof value === "number") return value;

  if (typeof value !== "string") return null;

  const cleaned = value.replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", ".");
  const parsed = Number(cleaned);

  return Number.isFinite(parsed) ? parsed : null;
}

export default function AnimatedCounter({
  value,
  duration = 1200
}) {
  const numericValue = extractNumber(value);
  const [display, setDisplay] = useState(
    numericValue !== null ? 0 : value
  );
  const started = useRef(false);

  useEffect(() => {
    if (numericValue === null || started.current) return;

    started.current = true;
    const start = performance.now();

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(numericValue * eased);

      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setDisplay(numericValue);
      }
    }

    requestAnimationFrame(frame);
  }, [numericValue, duration]);

  if (numericValue === null) {
    return <>{value}</>;
  }

  return <>{display.toLocaleString("es-ES")}</>;
}
