"use client";

export default function DropDownFilter({
  label,
  name,
  value,
  options,
  onChange,
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontWeight: 700, fontSize: 12 }}>{label}</span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        style={{ color: "#222", fontWeight: "500", padding: 6, minWidth: 160 }}
      >
        <option value="">-- Any --</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
