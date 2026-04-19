// src/components/AnimatedCounter.jsx

import { useEffect, useMemo, useRef, useState } from "react";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function extractNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value
    .trim()
    .replace(/\s/g, "")
    .replace(/[^\d.,-]/g, "");

  if (!cleaned) {
    return null;
  }

  const hasComma = cleaned.includes(",");
  const hasDot = cleaned.includes(".");

  let normalized = cleaned;

  if (hasComma && hasDot) {
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else if (hasComma) {
    normalized = cleaned.replace(",", ".");
  }

  const parsed = Number(normalized);

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
  const numericValue = useMemo(() => extractNumber(value), [value]);
  const decimals = useMemo(
    () => (numericValue !== null ? getDecimals(numericValue) : 0),
    [numericValue]
  );

  const [display, setDisplay] = useState(
    numericValue !== null ? numericValue : value
  );

  const frameRef = useRef(null);
  const previousValueRef = useRef(
    numericValue !== null ? numericValue : 0
  );

  useEffect(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    if (numericValue === null) {
      setDisplay(value);
      return;
    }

    const startValue =
      typeof previousValueRef.current === "number"
        ? previousValueRef.current
        : 0;

    const endValue = numericValue;
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
        previousValueRef.current = endValue;
      }
    }

    frameRef.current = requestAnimationFrame(frame);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [numericValue, value, duration, decimals]);

  if (numericValue === null) {
    return <span>{value}</span>;
  }

  return (
    <span>
      {Number(display).toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
    </span>
  );
}
