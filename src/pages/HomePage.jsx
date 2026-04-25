import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { salons, styleCategories } from '../data/salons';
import SalonCard from '../components/SalonCard';
import FilterChips from '../components/FilterChips';

export default function HomePage({ addToCompare, compareList }) {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const navigate = useNavigate();

  const toggleFilter = (f) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/discover?q=${encodeURIComponent(query)}`);
  };

  const featuredSalons = salons.slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section style={heroSection}>
        <div style={heroInner}>
          <div style={heroBadge}>
            <Sparkles size={12} />
            <span>Review Intelligence Platform</span>
          </div>
          <h1 style={heroTitle}>
            Find the nail salon that actually{' '}
            <span style={heroHighlight}>matches your style.</span>
          </h1>
          <p style={heroDesc}>
            NailMatch compares nail salons using real reviews, style tags, price ranges,
            and design quality — so you stop guessing and start glowing.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} style={searchForm}>
            <div style={searchWrap}>
              <Search size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search salon name, location, or style…"
                style={searchInput}
              />
              <button type="submit" style={searchBtn}>
                Search
                <ArrowRight size={15} />
              </button>
            </div>
          </form>

          {/* Filters */}
          <FilterChips selected={activeFilters} onToggle={toggleFilter} />
        </div>

        {/* Decorative blobs */}
        <div style={blob1} />
        <div style={blob2} />
      </section>

      {/* Style Inspiration */}
      <section style={section}>
        <div style={sectionInner}>
          <div style={sectionHeader}>
            <h2 style={sectionTitle}>Browse by Style</h2>
            <Link to="/discover" style={seeAll}>See all salons <ArrowRight size={14} /></Link>
          </div>
          <div style={styleGrid}>
            {styleCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/discover?style=${encodeURIComponent(cat.tags[0])}`}
                style={{ ...styleCard, background: cat.color }}
              >
                <span style={styleEmoji}>{cat.emoji}</span>
                <span style={styleName}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Salons */}
      <section style={{ ...section, background: 'var(--surface)' }}>
        <div style={sectionInner}>
          <div style={sectionHeader}>
            <h2 style={sectionTitle}>Featured Salons</h2>
            <Link to="/discover" style={seeAll}>Explore all <ArrowRight size={14} /></Link>
          </div>
          <div style={cardsGrid}>
            {featuredSalons.map((salon) => (
              <SalonCard
                key={salon.id}
                salon={salon}
                onCompare={addToCompare}
                inCompare={compareList.some((s) => s.id === salon.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section style={quizCta}>
        <div style={quizInner}>
          <p style={quizPre}>Not sure where to start?</p>
          <h2 style={quizTitle}>Take the Nail Match Quiz</h2>
          <p style={quizDesc}>
            Answer 4 quick questions and we'll match you to the perfect salon based on your style,
            budget, and priorities.
          </p>
          <Link to="/quiz" style={quizBtn}>
            <Sparkles size={16} />
            Find My Match
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={footer}>
        <span style={footerLogo}>💅 NailMatch</span>
        <span style={footerText}>© 2025 NailMatch. Built with style.</span>
      </footer>
    </main>
  );
}

const heroSection = {
  position: 'relative',
  overflow: 'hidden',
  padding: '80px 24px 72px',
  background: 'linear-gradient(160deg, #fff8f8 0%, #fde8ec 100%)',
  borderBottom: '1px solid var(--border)',
};

const heroInner = {
  maxWidth: 720,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 24,
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
};

const heroBadge = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 999,
  padding: '5px 14px',
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--accent)',
};

const heroTitle = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 'clamp(32px, 5vw, 54px)',
  lineHeight: 1.15,
  color: 'var(--text-main)',
  letterSpacing: '-0.5px',
};

const heroHighlight = {
  color: 'var(--accent)',
  fontStyle: 'italic',
};

const heroDesc = {
  fontSize: 17,
  color: 'var(--text-muted)',
  maxWidth: 560,
  lineHeight: 1.7,
};

const searchForm = {
  width: '100%',
  maxWidth: 560,
};

const searchWrap = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  background: 'var(--surface)',
  border: '1.5px solid var(--border)',
  borderRadius: 999,
  padding: '10px 10px 10px 20px',
  boxShadow: '0 4px 20px rgba(229,154,170,0.12)',
};

const searchInput = {
  flex: 1,
  border: 'none',
  background: 'transparent',
  fontSize: 15,
  color: 'var(--text-main)',
};

const searchBtn = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  background: 'var(--primary)',
  color: '#fff',
  borderRadius: 999,
  padding: '9px 20px',
  fontSize: 14,
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'background 0.15s',
};

const blob1 = {
  position: 'absolute',
  top: -80,
  right: -80,
  width: 320,
  height: 320,
  background: 'radial-gradient(circle, rgba(229,154,170,0.18) 0%, transparent 70%)',
  borderRadius: '50%',
  pointerEvents: 'none',
};

const blob2 = {
  position: 'absolute',
  bottom: -60,
  left: -60,
  width: 240,
  height: 240,
  background: 'radial-gradient(circle, rgba(249,225,230,0.5) 0%, transparent 70%)',
  borderRadius: '50%',
  pointerEvents: 'none',
};

const section = {
  padding: '56px 24px',
};

const sectionInner = {
  maxWidth: 1200,
  margin: '0 auto',
};

const sectionHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 28,
};

const sectionTitle = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 26,
  color: 'var(--text-main)',
};

const seeAll = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 14,
  color: 'var(--accent)',
  fontWeight: 500,
  textDecoration: 'none',
};

const styleGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: 14,
};

const styleCard = {
  borderRadius: 16,
  padding: '20px 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 10,
  cursor: 'pointer',
  transition: 'transform 0.15s',
  textDecoration: 'none',
  border: '1px solid rgba(240,216,221,0.5)',
};

const styleEmoji = {
  fontSize: 28,
};

const styleName = {
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--text-main)',
  textAlign: 'center',
  lineHeight: 1.4,
};

const cardsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
  gap: 20,
};

const quizCta = {
  background: 'linear-gradient(135deg, var(--accent) 0%, #C8809A 100%)',
  padding: '72px 24px',
  textAlign: 'center',
};

const quizInner = {
  maxWidth: 560,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
};

const quizPre = {
  fontSize: 13,
  color: 'rgba(255,255,255,0.75)',
  fontWeight: 500,
  letterSpacing: 1,
  textTransform: 'uppercase',
};

const quizTitle = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 'clamp(26px, 4vw, 38px)',
  color: '#fff',
};

const quizDesc = {
  fontSize: 16,
  color: 'rgba(255,255,255,0.85)',
  lineHeight: 1.7,
};

const quizBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: '#fff',
  color: 'var(--accent)',
  borderRadius: 999,
  padding: '12px 28px',
  fontSize: 15,
  fontWeight: 600,
  textDecoration: 'none',
  marginTop: 8,
  transition: 'transform 0.15s',
};

const footer = {
  background: 'var(--surface)',
  borderTop: '1px solid var(--border)',
  padding: '28px 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '100%',
};

const footerLogo = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 18,
  color: 'var(--text-main)',
};

const footerText = {
  fontSize: 13,
  color: 'var(--text-muted)',
};
