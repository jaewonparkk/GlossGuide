import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, ArrowLeft, Heart, Scale, ExternalLink, Check, AlertCircle, Zap, ThumbsDown } from 'lucide-react';
import { salons } from '../data/salons';
import ScoreBar from '../components/ScoreBar';

export default function SalonDetailPage({ addToCompare, compareList }) {
  const { id } = useParams();
  const salon = salons.find((s) => s.id === Number(id));

  if (!salon) {
    return (
      <div style={notFound}>
        <p>Salon not found.</p>
        <Link to="/discover" style={backLink}>← Back to Discover</Link>
      </div>
    );
  }

  const inCompare = compareList.some((s) => s.id === salon.id);

  const scoreLabels = {
    designQuality: 'Design Quality',
    cleanliness: 'Cleanliness',
    priceValue: 'Price Value',
    speed: 'Speed',
    bookingEase: 'Booking Ease',
    durability: 'Durability',
  };

  return (
    <main style={page}>
      <div style={inner}>
        {/* Back */}
        <Link to="/discover" style={backLink}>
          <ArrowLeft size={15} /> Back to Discover
        </Link>

        {/* Hero card */}
        <div style={{ ...heroBanner, background: salon.imageColor }}>
          <div style={heroOverlay}>
            <div style={heroContent}>
              <div style={heroLeft}>
                <div style={tagRow}>
                  {salon.tags.slice(0, 4).map((t) => (
                    <span key={t} style={tag}>{t}</span>
                  ))}
                </div>
                <h1 style={heroName}>{salon.name}</h1>
                <div style={heroMeta}>
                  <div style={ratingBadge}>
                    <Star size={13} fill="var(--accent)" stroke="none" />
                    <span>{salon.rating}</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
                      ({salon.reviewCount} reviews)
                    </span>
                  </div>
                  <div style={locationBadge}>
                    <MapPin size={13} />
                    {salon.location}
                  </div>
                  <div style={priceBadge}>{salon.priceRange}</div>
                </div>
              </div>
              <div style={heroActions}>
                <a href="#" style={bookBtn}>
                  <ExternalLink size={14} />
                  Book Appointment
                </a>
                <button
                  onClick={() => addToCompare(salon)}
                  style={inCompare ? compareActiveBtn : compareBtn}
                >
                  <Scale size={14} />
                  {inCompare ? 'Added to Compare' : 'Add to Compare'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div style={twoCol}>
          {/* Left: Review Intelligence */}
          <div style={leftCol}>
            {/* Scores */}
            <div style={card}>
              <h2 style={cardTitle}>Score Breakdown</h2>
              {Object.entries(scoreLabels).map(([key, label]) => (
                <ScoreBar key={key} label={label} score={salon.scores[key]} />
              ))}
            </div>

            {/* Customers Love */}
            <div style={{ ...card, borderTop: '3px solid #6BAD8A' }}>
              <h2 style={cardTitle}>
                <span style={{ color: '#6BAD8A', marginRight: 8 }}>✓</span>
                Customers Love
              </h2>
              <ul style={listStyle}>
                {salon.customersLove.map((item, i) => (
                  <li key={i} style={listItem}>
                    <Check size={14} color="#6BAD8A" style={{ flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Complaints */}
            <div style={{ ...card, borderTop: '3px solid #E59AAA' }}>
              <h2 style={cardTitle}>
                <span style={{ color: 'var(--primary)', marginRight: 8 }}>!</span>
                Common Complaints
              </h2>
              <ul style={listStyle}>
                {salon.commonComplaints.map((item, i) => (
                  <li key={i} style={listItem}>
                    <AlertCircle size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Best For, Reviews */}
          <div style={rightCol}>
            {/* Best For / Not Ideal For */}
            <div style={card}>
              <h2 style={cardTitle}>
                <Zap size={16} color="var(--accent)" style={{ marginRight: 6 }} />
                Best For
              </h2>
              <ul style={listStyle}>
                {salon.bestFor.map((item, i) => (
                  <li key={i} style={{ ...listItem, color: 'var(--accent)', fontWeight: 500 }}>
                    <span style={dot('#B76E79')} />
                    {item}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                <h3 style={{ ...cardTitle, fontSize: 15 }}>
                  <ThumbsDown size={14} color="var(--text-muted)" style={{ marginRight: 6 }} />
                  Not Ideal For
                </h3>
                <ul style={listStyle}>
                  {salon.notIdealFor.map((item, i) => (
                    <li key={i} style={{ ...listItem, color: 'var(--text-muted)' }}>
                      <span style={dot('#C0A8B0')} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendation */}
            <div style={recCard}>
              <p style={recLabel}>Recommended For</p>
              <p style={recText}>{salon.recommendedFor}</p>
            </div>

            {/* Reviews */}
            <div style={card}>
              <h2 style={cardTitle}>Customer Reviews</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {salon.reviewSnippets.map((r, i) => (
                  <div key={i} style={reviewCard}>
                    <div style={reviewHeader}>
                      <div style={avatar}>{r.author[0]}</div>
                      <div>
                        <p style={reviewAuthor}>{r.author}</p>
                        <div style={{ display: 'flex', gap: 2 }}>
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={10} fill="var(--accent)" stroke="none" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p style={reviewText}>"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

const heroBanner = {
  borderRadius: 24, overflow: 'hidden', minHeight: 220,
};
const heroOverlay = {
  background: 'linear-gradient(135deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.05) 100%)',
  padding: '36px 36px',
  minHeight: 220,
  display: 'flex',
  alignItems: 'flex-end',
};
const heroContent = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
  width: '100%', flexWrap: 'wrap', gap: 16,
};
const heroLeft = { display: 'flex', flexDirection: 'column', gap: 10 };
const tagRow = { display: 'flex', flexWrap: 'wrap', gap: 6 };
const tag = {
  background: 'rgba(255,255,255,0.9)', color: 'var(--accent)',
  borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600,
};
const heroName = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 'clamp(24px, 4vw, 38px)',
  color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.2)',
};
const heroMeta = { display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' };
const ratingBadge = {
  display: 'flex', alignItems: 'center', gap: 5,
  background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
  borderRadius: 20, padding: '5px 12px', color: '#fff', fontSize: 14, fontWeight: 600,
};
const locationBadge = {
  display: 'flex', alignItems: 'center', gap: 4,
  background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
  borderRadius: 20, padding: '5px 12px', color: '#fff', fontSize: 13,
};
const priceBadge = {
  background: 'rgba(255,255,255,0.9)', color: 'var(--accent)',
  borderRadius: 20, padding: '5px 12px', fontSize: 13, fontWeight: 700,
};
const heroActions = { display: 'flex', gap: 10, flexWrap: 'wrap' };
const bookBtn = {
  display: 'inline-flex', alignItems: 'center', gap: 7,
  background: '#fff', color: 'var(--accent)',
  borderRadius: 14, padding: '10px 20px', fontSize: 14, fontWeight: 600,
  textDecoration: 'none',
};
const compareBtn = {
  display: 'inline-flex', alignItems: 'center', gap: 7,
  background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
  color: '#fff', borderRadius: 14, padding: '10px 20px', fontSize: 14, fontWeight: 500,
  border: '1px solid rgba(255,255,255,0.4)', cursor: 'pointer',
};
const compareActiveBtn = {
  ...compareBtn,
  background: 'rgba(255,255,255,0.35)',
};

const twoCol = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 20,
};

const leftCol = { display: 'flex', flexDirection: 'column', gap: 16 };
const rightCol = { display: 'flex', flexDirection: 'column', gap: 16 };

const card = {
  background: 'var(--surface)', borderRadius: 20,
  border: '1px solid var(--border)', padding: '24px',
};

const cardTitle = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 18, color: 'var(--text-main)', marginBottom: 16,
  display: 'flex', alignItems: 'center',
};

const listStyle = { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 };
const listItem = {
  display: 'flex', alignItems: 'flex-start', gap: 8,
  fontSize: 14, color: 'var(--text-main)', lineHeight: 1.5,
};

const dot = (color) => ({
  width: 7, height: 7, borderRadius: '50%',
  background: color, flexShrink: 0, marginTop: 6,
});

const recCard = {
  background: 'linear-gradient(135deg, var(--primary-soft) 0%, #fff 100%)',
  border: '1px solid var(--border)', borderRadius: 20, padding: '20px 24px',
};
const recLabel = {
  fontSize: 11, fontWeight: 700, color: 'var(--accent)',
  textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
};
const recText = { fontSize: 15, color: 'var(--text-main)', lineHeight: 1.6 };

const reviewCard = {
  background: 'var(--background)', borderRadius: 14,
  padding: '16px', display: 'flex', flexDirection: 'column', gap: 10,
};
const reviewHeader = { display: 'flex', alignItems: 'center', gap: 10 };
const avatar = {
  width: 34, height: 34, borderRadius: '50%',
  background: 'var(--primary)', color: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 14, fontWeight: 600, flexShrink: 0,
};
const reviewAuthor = { fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 2 };
const reviewText = { fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' };

const notFound = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  gap: 16, padding: 80,
};
