"use client";

export default function ResetFilters({ onReset, children }) {
  return (
    <button
      onClick={onReset}
      style={{
        padding: "6px 12px",
        background: "#0f766e",
        color: "white",
        borderRadius: 6,
      }}
    >
      {children}
    </button>
  );
}
