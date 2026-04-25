const allFilters = [
  'Gel', 'Acrylic', 'Nail Art', 'Affordable', 'Korean Style',
  'Clean', 'Walk-in Friendly', 'Near Campus', 'Long-lasting',
];

export default function FilterChips({ selected, onToggle }) {
  return (
    <div style={row}>
      {allFilters.map((f) => {
        const active = selected.includes(f);
        return (
          <button
            key={f}
            onClick={() => onToggle(f)}
            style={active ? activeChip : chip}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}

const row = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
};

const chip = {
  padding: '7px 16px',
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 500,
  background: 'var(--primary-soft)',
  color: 'var(--accent)',
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'all 0.15s',
  whiteSpace: 'nowrap',
};

const activeChip = {
  ...chip,
  background: 'var(--primary)',
  color: '#fff',
  border: '1px solid var(--primary)',
};
