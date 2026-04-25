import { Link } from 'react-router-dom';
import { MapPin, Star, Plus, Check } from 'lucide-react';

const priceColors = {
  '$': '#6BAD8A',
  '$$': '#E59AAA',
  '$$$': '#B76E79',
};

export default function SalonCard({ salon, onCompare, inCompare }) {
  return (
    <div style={cardStyle}>
      {/* Image block */}
      <div style={{ ...imageBlock, background: salon.imageColor }}>
        <span style={imagePlaceholderText}>💅</span>
        <div style={priceTag}>
          <span style={{ color: priceColors[salon.priceRange], fontWeight: 700, fontSize: 13 }}>
            {salon.priceRange}
          </span>
        </div>
      </div>

      <div style={body}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={nameStyle}>{salon.name}</h3>
          <div style={ratingBadge}>
            <Star size={11} fill="var(--accent)" stroke="none" />
            <span>{salon.rating}</span>
          </div>
        </div>

        <div style={locationRow}>
          <MapPin size={12} color="var(--text-muted)" />
          <span style={locationText}>{salon.location}</span>
          <span style={reviewCount}>· {salon.reviewCount} reviews</span>
        </div>

        {/* Tags */}
        <div style={tagsRow}>
          {salon.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={tagChip}>{tag}</span>
          ))}
        </div>

        {/* Keywords */}
        <p style={keywordsText}>{salon.keywords.slice(0, 3).join(' · ')}</p>

        {/* Actions */}
        <div style={actions}>
          <Link to={`/salon/${salon.id}`} style={viewBtn}>View Details</Link>
          <button
            style={inCompare ? compareActive : compareBtn}
            onClick={() => onCompare(salon)}
          >
            {inCompare ? <Check size={13} /> : <Plus size={13} />}
            {inCompare ? 'Added' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: 'var(--surface)',
  borderRadius: 20,
  border: '1px solid var(--border)',
  overflow: 'hidden',
  transition: 'transform 0.2s, box-shadow 0.2s',
  boxShadow: '0 2px 12px rgba(183,110,121,0.06)',
  display: 'flex',
  flexDirection: 'column',
};

const imageBlock = {
  height: 140,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

const imagePlaceholderText = {
  fontSize: 48,
  opacity: 0.7,
};

const priceTag = {
  position: 'absolute',
  top: 12,
  right: 12,
  background: 'rgba(255,255,255,0.9)',
  borderRadius: 8,
  padding: '3px 8px',
  backdropFilter: 'blur(4px)',
};

const body = {
  padding: '16px 18px 18px',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  flex: 1,
};

const nameStyle = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 17,
  color: 'var(--text-main)',
  lineHeight: 1.3,
};

const ratingBadge = {
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  background: 'var(--primary-soft)',
  color: 'var(--accent)',
  borderRadius: 8,
  padding: '3px 8px',
  fontSize: 13,
  fontWeight: 600,
  flexShrink: 0,
};

const locationRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
};

const locationText = {
  fontSize: 13,
  color: 'var(--text-muted)',
};

const reviewCount = {
  fontSize: 12,
  color: 'var(--text-muted)',
};

const tagsRow = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 6,
};

const tagChip = {
  background: 'var(--primary-soft)',
  color: 'var(--accent)',
  borderRadius: 20,
  padding: '3px 10px',
  fontSize: 12,
  fontWeight: 500,
};

const keywordsText = {
  fontSize: 12,
  color: 'var(--text-muted)',
  fontStyle: 'italic',
};

const actions = {
  display: 'flex',
  gap: 8,
  marginTop: 4,
};

const viewBtn = {
  flex: 1,
  background: 'var(--primary)',
  color: '#fff',
  borderRadius: 12,
  padding: '9px 0',
  textAlign: 'center',
  fontSize: 13,
  fontWeight: 500,
  transition: 'background 0.15s',
  textDecoration: 'none',
  display: 'block',
};

const compareBtn = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '9px 14px',
  borderRadius: 12,
  fontSize: 13,
  fontWeight: 500,
  background: 'transparent',
  color: 'var(--text-muted)',
  border: '1px solid var(--border)',
  transition: 'all 0.15s',
  cursor: 'pointer',
};

const compareActive = {
  ...compareBtn,
  background: 'var(--primary-soft)',
  color: 'var(--accent)',
  border: '1px solid var(--primary)',
};
