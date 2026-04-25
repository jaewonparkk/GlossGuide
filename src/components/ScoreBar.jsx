export default function ScoreBar({ label, score }) {
  const pct = (score / 10) * 100;
  const color = score >= 8.5 ? 'var(--accent)' : score >= 7 ? 'var(--primary)' : '#C0A8B0';

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: 'var(--text-main)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{score.toFixed(1)}</span>
      </div>
      <div style={{ height: 6, background: 'var(--primary-soft)', borderRadius: 999, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: color,
            borderRadius: 999,
            transition: 'width 0.6s ease',
          }}
        />
      </div>
    </div>
  );
}
