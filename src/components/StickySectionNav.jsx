import { motion } from "framer-motion";

const ITEMS = [
  ["overview", "Resumen"],
  ["andalucia", "Andalucía"],
  ["international", "Otros países"],
  ["social", "Base social"],
  ["compare", "Comparativa"]
];

export default function StickySectionNav({
  section,
  setSection
}) {
  return (
    <nav className="sticky-nav">
      <div className="page-wrap sticky-nav__inner">
        {ITEMS.map(([id, label]) => {
          const active = section === id;

          return (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`sticky-nav__btn ${
                active ? "is-active" : ""
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="sticky-nav__pill"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 28
                  }}
                />
              )}

              <span className="sticky-nav__label">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
