import { Link, useLocation } from 'react-router-dom';
import { Scale, Sparkles } from 'lucide-react';

const styles = {
  nav: {
    background: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 12px rgba(229,154,170,0.08)',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
  },
  logoIcon: {
    width: 34,
    height: 34,
    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 16,
  },
  logoText: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 22,
    color: 'var(--text-main)',
    letterSpacing: '-0.3px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  link: (active) => ({
    padding: '8px 14px',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: active ? 500 : 400,
    color: active ? 'var(--accent)' : 'var(--text-muted)',
    background: active ? 'var(--primary-soft)' : 'transparent',
    transition: 'all 0.15s',
    textDecoration: 'none',
  }),
  compareBtn: (count) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 16px',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 500,
    background: count > 0 ? 'var(--primary)' : 'var(--primary-soft)',
    color: count > 0 ? '#fff' : 'var(--accent)',
    transition: 'all 0.15s',
    textDecoration: 'none',
  }),
  badge: {
    background: '#fff',
    color: 'var(--accent)',
    borderRadius: '50%',
    width: 18,
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
  },
};

export default function Navbar({ compareCount }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIcon}>💅</div>
          <span style={styles.logoText}>NailMatch</span>
        </Link>

        <div style={styles.links}>
          <Link to="/" style={styles.link(path === '/')}>Home</Link>
          <Link to="/discover" style={styles.link(path === '/discover')}>Discover</Link>
          <Link to="/quiz" style={styles.link(path === '/quiz')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Sparkles size={13} />
              Quiz
            </span>
          </Link>
          <Link to="/compare" style={styles.compareBtn(compareCount)}>
            <Scale size={14} />
            Compare
            {compareCount > 0 && <span style={styles.badge}>{compareCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
