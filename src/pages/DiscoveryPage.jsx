import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { salons } from '../data/salons';
import SalonCard from '../components/SalonCard';
import FilterChips from '../components/FilterChips';

export default function DiscoveryPage({ addToCompare, compareList }) {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialStyle = searchParams.get('style') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeFilters, setActiveFilters] = useState(initialStyle ? [initialStyle] : []);
  const [sortBy, setSortBy] = useState('rating');

  const toggleFilter = (f) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const filtered = useMemo(() => {
    let result = [...salons];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          s.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }

    if (activeFilters.length > 0) {
      result = result.filter((s) =>
        activeFilters.some((f) =>
          s.tags.some((t) => t.toLowerCase().includes(f.toLowerCase())) ||
          s.style?.some((st) => st.toLowerCase().includes(f.toLowerCase()))
        )
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'price-low') {
        const order = { '$': 1, '$$': 2, '$$$': 3 };
        return order[a.priceRange] - order[b.priceRange];
      }
      if (sortBy === 'price-high') {
        const order = { '$': 1, '$$': 2, '$$$': 3 };
        return order[b.priceRange] - order[a.priceRange];
      }
      return 0;
    });

    return result;
  }, [query, activeFilters, sortBy]);

  return (
    <main style={page}>
      <div style={inner}>
        {/* Page header */}
        <div style={header}>
          <div>
            <h1 style={title}>Discover Salons</h1>
            <p style={subtitle}>
              {filtered.length} salon{filtered.length !== 1 ? 's' : ''} found
              {activeFilters.length > 0 && ` · filtered by ${activeFilters.join(', ')}`}
            </p>
          </div>
        </div>

        {/* Search + Sort */}
        <div style={searchRow}>
          <div style={searchWrap}>
            <Search size={16} color="var(--text-muted)" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search salons, locations, styles…"
              style={searchInput}
            />
            {query && (
              <button onClick={() => setQuery('')} style={clearBtn}>
                <X size={14} />
              </button>
            )}
          </div>

          <div style={sortWrap}>
            <SlidersHorizontal size={15} color="var(--text-muted)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={select}
            >
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <div style={filtersWrap}>
          <FilterChips selected={activeFilters} onToggle={toggleFilter} />
          {activeFilters.length > 0 && (
            <button onClick={() => setActiveFilters([])} style={clearAllBtn}>
              <X size={12} /> Clear all
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={grid}>
            {filtered.map((salon) => (
              <SalonCard
                key={salon.id}
                salon={salon}
                onCompare={addToCompare}
                inCompare={compareList.some((s) => s.id === salon.id)}
              />
            ))}
          </div>
        ) : (
          <div style={empty}>
            <span style={{ fontSize: 48 }}>💅</span>
            <p style={emptyTitle}>No salons found</p>
            <p style={emptyDesc}>Try adjusting your search or clearing filters.</p>
            <button
              onClick={() => { setQuery(''); setActiveFilters([]); }}
              style={resetBtn}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

const page = {
  minHeight: 'calc(100vh - 64px)',
  padding: '40px 24px 64px',
};

const inner = {
  maxWidth: 1200,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
};

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const title = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 32,
  color: 'var(--text-main)',
  marginBottom: 4,
};

const subtitle = {
  fontSize: 14,
  color: 'var(--text-muted)',
};

const searchRow = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
};

const searchWrap = {
  flex: 1,
  minWidth: 240,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  background: 'var(--surface)',
  border: '1.5px solid var(--border)',
  borderRadius: 14,
  padding: '10px 16px',
};

const searchInput = {
  flex: 1,
  border: 'none',
  background: 'transparent',
  fontSize: 14,
  color: 'var(--text-main)',
};

const clearBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--text-muted)',
  display: 'flex',
  alignItems: 'center',
  padding: 2,
};

const sortWrap = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  background: 'var(--surface)',
  border: '1.5px solid var(--border)',
  borderRadius: 14,
  padding: '10px 16px',
};

const select = {
  border: 'none',
  background: 'transparent',
  fontSize: 14,
  color: 'var(--text-main)',
  cursor: 'pointer',
};

const filtersWrap = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  flexWrap: 'wrap',
};

const clearAllBtn = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 13,
  color: 'var(--accent)',
  background: 'var(--primary-soft)',
  border: 'none',
  borderRadius: 999,
  padding: '6px 12px',
  cursor: 'pointer',
  fontWeight: 500,
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
  gap: 20,
};

const empty = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
  padding: '80px 24px',
  textAlign: 'center',
};

const emptyTitle = {
  fontSize: 20,
  fontWeight: 600,
  color: 'var(--text-main)',
};

const emptyDesc = {
  fontSize: 14,
  color: 'var(--text-muted)',
};

const resetBtn = {
  marginTop: 8,
  background: 'var(--primary)',
  color: '#fff',
  border: 'none',
  borderRadius: 12,
  padding: '10px 24px',
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
};
