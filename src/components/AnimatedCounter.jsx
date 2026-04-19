import { useEffect, useMemo, useRef, useState } from "react";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function extractNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return null;

  const cleaned = value
    .replace(/[^\d.,-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const parsed = Number(cleaned);

  return Number.isFinite(parsed) ? parsed : null;
}

function getDecimals(num) {
  if (!Number.isFinite(num)) return 0;

  const text = String(num);
  if (!text.includes(".")) return 0;

  return text.split(".")[1].length;
}

export default function AnimatedCounter({
  value,
  duration = 1200,
  locale = "es-ES"
}) {
  const numericValue = useMemo(
    () => extractNumber(value),
    [value]
  );

  const [display, setDisplay] = useState(
    numericValue !== null ? 0 : value
  );

  const frameRef = useRef(null);

  useEffect(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    if (numericValue === null) {
      setDisplay(value);
      return;
    }

    const startValue = 0;
    const endValue = numericValue;
    const decimals = getDecimals(endValue);
    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      const current =
        startValue + (endValue - startValue) * eased;

      const rounded =
        decimals > 0
          ? Number(current.toFixed(decimals))
          : Math.round(current);

      setDisplay(rounded);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(frame);
      } else {
        setDisplay(endValue);
      }
    }

    frameRef.current = requestAnimationFrame(frame);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [numericValue, value, duration]);

  if (numericValue === null) {
    return <>{value}</>;
  }

  return (
    <>
      {Number(display).toLocaleString(locale, {
        maximumFractionDigits: getDecimals(numericValue)
      })}
    </>
  );
}
