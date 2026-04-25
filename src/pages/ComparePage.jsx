import { Link } from 'react-router-dom';
import { X, Star, ArrowLeft, Scale } from 'lucide-react';
import { salons } from '../data/salons';

function generateRecommendation(list) {
  if (list.length === 0) return '';
  if (list.length === 1) return `${list[0].name} is the only salon selected — add more to compare.`;

  const sorted = [...list].sort((a, b) => {
    const aScore = Object.values(a.scores).reduce((s, v) => s + v, 0);
    const bScore = Object.values(b.scores).reduce((s, v) => s + v, 0);
    return bScore - aScore;
  });

  const best = sorted[0];
  const budget = list.reduce((prev, curr) => {
    const order = { '$': 1, '$$': 2, '$$$': 3 };
    return order[prev.priceRange] < order[curr.priceRange] ? prev : curr;
  });

  if (best.id === budget.id) {
    return `Based on the selected salons, ${best.name} stands out as the top overall choice — offering the best scores across the board.`;
  }

  return `Based on the selected salons, ${best.name} is the strongest overall pick for ${best.tags[0].toLowerCase()} and quality, while ${budget.name} is the best option if you're looking for more affordable pricing.`;
}

const scoreLabels = {
  designQuality: 'Design Quality',
  cleanliness: 'Cleanliness',
  priceValue: 'Price Value',
  speed: 'Speed',
  bookingEase: 'Booking Ease',
  durability: 'Durability',
};

export default function ComparePage({ compareList, removeFromCompare }) {
  const recommendation = generateRecommendation(compareList);

  if (compareList.length === 0) {
    return (
      <main style={page}>
        <div style={emptyWrap}>
          <Scale size={48} color="var(--border)" />
          <h2 style={emptyTitle}>Nothing to compare yet</h2>
          <p style={emptyDesc}>
            Go to the Discover page and click "Compare" on salons to add them here.
          </p>
          <Link to="/discover" style={discoverBtn}>Browse Salons</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={page}>
      <div style={inner}>
        <Link to="/discover" style={backLink}>
          <ArrowLeft size={15} /> Back to Discover
        </Link>

        <h1 style={pageTitle}>Compare Salons</h1>

        {/* AI Recommendation */}
        <div style={recBanner}>
          <span style={recLabel}>✨ AI Recommendation</span>
          <p style={recText}>{recommendation}</p>
        </div>

        {/* Comparison Table */}
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={thLabel}></th>
                {compareList.map((s) => (
                  <th key={s.id} style={thSalon}>
                    <div style={salonHeader}>
                      <div style={{ ...salonColor, background: s.imageColor }}>💅</div>
                      <div>
                        <p style={salonName}>{s.name}</p>
                        <p style={salonLoc}>{s.location}</p>
                      </div>
                      <button
                        onClick={() => removeFromCompare(s.id)}
                        style={removeBtn}
                        title="Remove"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Rating */}
              <tr style={trRow}>
                <td style={tdLabel}>Rating</td>
                {compareList.map((s) => (
                  <td key={s.id} style={tdVal}>
                    <span style={ratingChip}>
                      <Star size={11} fill="var(--accent)" stroke="none" />
                      {s.rating}
                    </span>
                    <span style={reviewSmall}>({s.reviewCount})</span>
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr style={trRowAlt}>
                <td style={tdLabel}>Price Range</td>
                {compareList.map((s) => (
                  <td key={s.id} style={tdVal}>
                    <span style={priceChip}>{s.priceRange}</span>
                  </td>
                ))}
              </tr>

              {/* Scores */}
              {Object.entries(scoreLabels).map(([key, label], idx) => (
                <tr key={key} style={idx % 2 === 0 ? trRow : trRowAlt}>
                  <td style={tdLabel}>{label}</td>
                  {compareList.map((s) => {
                    const val = s.scores[key];
                    const best = Math.max(...compareList.map((x) => x.scores[key]));
                    return (
                      <td key={s.id} style={tdVal}>
                        <div style={scoreRow}>
                          <div style={scoreBar}>
                            <div
                              style={{
                                ...scoreBarFill,
                                width: `${(val / 10) * 100}%`,
                                background: val === best ? 'var(--accent)' : 'var(--primary)',
                              }}
                            />
                          </div>
                          <span style={{ ...scoreNum, color: val === best ? 'var(--accent)' : 'var(--text-muted)', fontWeight: val === best ? 700 : 400 }}>
                            {val.toFixed(1)}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Main Strength */}
              <tr style={trRow}>
                <td style={tdLabel}>Main Strength</td>
                {compareList.map((s) => (
                  <td key={s.id} style={tdVal}>
                    <span style={strengthChip}>{s.mainStrength}</span>
                  </td>
                ))}
              </tr>

              {/* Main Weakness */}
              <tr style={trRowAlt}>
                <td style={tdLabel}>Main Weakness</td>
                {compareList.map((s) => (
                  <td key={s.id} style={tdVal}>
                    <span style={weaknessChip}>{s.mainWeakness}</span>
                  </td>
                ))}
              </tr>

              {/* Recommended For */}
              <tr style={trRow}>
                <td style={tdLabel}>Recommended For</td>
                {compareList.map((s) => (
                  <td key={s.id} style={{ ...tdVal, maxWidth: 200 }}>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{s.recommendedFor}</p>
                  </td>
                ))}
              </tr>

              {/* CTA row */}
              <tr>
                <td style={tdLabel}></td>
                {compareList.map((s) => (
                  <td key={s.id} style={tdVal}>
                    <Link to={`/salon/${s.id}`} style={viewDetailBtn}>View Details</Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/discover" style={addMoreBtn}>
            + Add More Salons
          </Link>
        </div>
      </div>
    </main>
  );
}

const page = { padding: '32px 24px 64px', minHeight: 'calc(100vh - 64px)' };
const inner = { maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 };

const backLink = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none',
};

const pageTitle = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 32, color: 'var(--text-main)',
};

const recBanner = {
  background: 'linear-gradient(135deg, var(--primary-soft) 0%, #fff6f8 100%)',
  border: '1px solid var(--border)',
  borderLeft: '4px solid var(--accent)',
  borderRadius: 16, padding: '20px 24px',
};
const recLabel = {
  fontSize: 12, fontWeight: 700, color: 'var(--accent)',
  textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 8,
};
const recText = { fontSize: 15, color: 'var(--text-main)', lineHeight: 1.7 };

const tableWrap = {
  background: 'var(--surface)', borderRadius: 20,
  border: '1px solid var(--border)', overflow: 'auto',
};

const table = { width: '100%', borderCollapse: 'collapse', minWidth: 600 };

const thLabel = {
  padding: '16px 20px', textAlign: 'left',
  fontSize: 12, color: 'var(--text-muted)',
  fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5,
  width: 160, background: 'var(--background)',
  position: 'sticky', left: 0,
};

const thSalon = {
  padding: '16px 20px',
  borderLeft: '1px solid var(--border)',
  background: 'var(--surface)',
};

const salonHeader = {
  display: 'flex', alignItems: 'center', gap: 10,
};
const salonColor = {
  width: 40, height: 40, borderRadius: 12,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 20, flexShrink: 0,
};
const salonName = { fontSize: 14, fontWeight: 600, color: 'var(--text-main)' };
const salonLoc = { fontSize: 12, color: 'var(--text-muted)' };
const removeBtn = {
  marginLeft: 'auto', background: 'none', border: 'none',
  cursor: 'pointer', color: 'var(--text-muted)', padding: 4,
  borderRadius: 6, display: 'flex', alignItems: 'center',
};

const trRow = { background: 'var(--surface)' };
const trRowAlt = { background: 'var(--background)' };

const tdLabel = {
  padding: '14px 20px', fontSize: 13,
  color: 'var(--text-muted)', fontWeight: 500,
  borderTop: '1px solid var(--border)',
  position: 'sticky', left: 0, background: 'inherit',
};

const tdVal = {
  padding: '14px 20px', borderTop: '1px solid var(--border)',
  borderLeft: '1px solid var(--border)', verticalAlign: 'middle',
};

const ratingChip = {
  display: 'inline-flex', alignItems: 'center', gap: 4,
  background: 'var(--primary-soft)', color: 'var(--accent)',
  borderRadius: 8, padding: '3px 8px', fontSize: 13, fontWeight: 700,
};
const reviewSmall = { fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 };

const priceChip = {
  display: 'inline-block',
  background: 'var(--primary-soft)', color: 'var(--accent)',
  borderRadius: 8, padding: '3px 10px', fontSize: 14, fontWeight: 700,
};

const scoreRow = { display: 'flex', alignItems: 'center', gap: 8 };
const scoreBar = {
  flex: 1, height: 6, background: 'var(--primary-soft)',
  borderRadius: 999, overflow: 'hidden',
};
const scoreBarFill = { height: '100%', borderRadius: 999, transition: 'width 0.4s' };
const scoreNum = { fontSize: 13, minWidth: 28, textAlign: 'right' };

const strengthChip = {
  display: 'inline-block', fontSize: 12, fontWeight: 500,
  color: '#6BAD8A', background: '#EDF7EF',
  borderRadius: 8, padding: '3px 10px',
};
const weaknessChip = {
  display: 'inline-block', fontSize: 12, fontWeight: 500,
  color: 'var(--accent)', background: 'var(--primary-soft)',
  borderRadius: 8, padding: '3px 10px',
};

const viewDetailBtn = {
  display: 'inline-block', background: 'var(--primary)',
  color: '#fff', borderRadius: 10, padding: '8px 16px',
  fontSize: 13, fontWeight: 500, textDecoration: 'none',
};

const addMoreBtn = {
  display: 'inline-block', background: 'var(--primary-soft)',
  color: 'var(--accent)', borderRadius: 12, padding: '10px 24px',
  fontSize: 14, fontWeight: 500, textDecoration: 'none',
};

const emptyWrap = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  gap: 16, padding: '100px 24px', textAlign: 'center',
};
const emptyTitle = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 26, color: 'var(--text-main)',
};
const emptyDesc = { fontSize: 15, color: 'var(--text-muted)', maxWidth: 400, lineHeight: 1.6 };
const discoverBtn = {
  display: 'inline-block', background: 'var(--primary)',
  color: '#fff', borderRadius: 12, padding: '11px 28px',
  fontSize: 14, fontWeight: 500, textDecoration: 'none', marginTop: 8,
};
