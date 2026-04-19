// src/components/MotionSection.jsx

import React from "react";

export default function MotionSection({
  children,
  className = "",
}) {
  return (
    <section className={className}>
      {children}
    </section>
  );
}
