// src/components/MotionSection.jsx

import React from "react";

export default function MotionSection({
  children,
  className = "",
  delay = 0,
  y = 12
}) {
  return (
    <section
      className={`motion-section ${className}`.trim()}
      style={{
        "--motion-delay": `${delay}s`,
        "--motion-y": `${y}px`
      }}
    >
      {children}
    </section>
  );
}
