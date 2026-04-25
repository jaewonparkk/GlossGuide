import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw, Star } from 'lucide-react';
import { salons } from '../data/salons';

const questions = [
  {
    id: 'style',
    question: 'What style are you going for?',
    emoji: '💅',
    options: [
      { value: 'Minimal', label: 'Minimal', emoji: '🤍' },
      { value: 'Korean', label: 'Korean', emoji: '🌸' },
      { value: 'Cute', label: 'Cute', emoji: '🎀' },
      { value: 'Y2K', label: 'Y2K', emoji: '⚡' },
      { value: 'Elegant', label: 'Elegant', emoji: '🕊️' },
      { value: 'Bold Art', label: 'Bold Art', emoji: '🎨' },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget?",
    emoji: '💰',
    options: [
      { value: 'Low', label: 'Budget-friendly ($)', emoji: '💚' },
      { value: 'Medium', label: 'Mid-range ($$)', emoji: '💛' },
      { value: 'High', label: "Splurge ($$$)", emoji: '💎' },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    emoji: '✨',
    options: [
      { value: 'Price', label: 'Price', emoji: '🏷️' },
      { value: 'Design Quality', label: 'Design Quality', emoji: '🎨' },
      { value: 'Cleanliness', label: 'Cleanliness', emoji: '✨' },
      { value: 'Speed', label: 'Speed', emoji: '⚡' },
      { value: 'Long-lasting Nails', label: 'Long-lasting Nails', emoji: '💪' },
    ],
  },
  {
    id: 'location',
    question: 'Where would you prefer to go?',
    emoji: '📍',
    options: [
      { value: 'Near Campus', label: 'Near Campus', emoji: '🎓' },
      { value: 'Near Home', label: 'Near Home', emoji: '🏠' },
      { value: 'Anywhere', label: 'Anywhere if quality is good', emoji: '🌟' },
    ],
  },
];

function matchSalon(answers) {
  const { style, budget, priority, location } = answers;

  const priceMap = { Low: '$', Medium: '$$', High: '$$$' };
  const targetPrice = priceMap[budget];

  const scored = salons.map((salon) => {
    let score = 0;

    // Style match
    if (style === 'Korean' && salon.tags.some((t) => t.includes('Korean'))) score += 3;
    if (style === 'Minimal' && salon.tags.some((t) => t.includes('Elegant') || t.includes('Gel'))) score += 2;
    if (style === 'Cute' && salon.name.toLowerCase().includes('pink')) score += 2;
    if (style === 'Y2K' && salon.tags.some((t) => t.includes('Chrome') || t.includes('Trendy'))) score += 3;
    if (style === 'Elegant' && salon.tags.some((t) => t.includes('Elegant') || t.includes('Luxury'))) score += 3;
    if (style === 'Bold Art' && salon.tags.some((t) => t.includes('Nail Art'))) score += 2;

    // Budget match
    if (salon.priceRange === targetPrice) score += 3;
    if (budget === 'Low' && salon.priceRange === '$$') score += 1;
    if (budget === 'High' && salon.priceRange === '$$') score += 1;

    // Priority
    if (priority === 'Price' && salon.scores.priceValue >= 8) score += 2;
    if (priority === 'Design Quality' && salon.scores.designQuality >= 9) score += 2;
    if (priority === 'Cleanliness' && salon.scores.cleanliness >= 9) score += 2;
    if (priority === 'Speed' && salon.scores.speed >= 9) score += 2;
    if (priority === 'Long-lasting Nails' && salon.scores.durability >= 9) score += 2;

    // Location
    if (location === 'Near Campus' && salon.tags.some((t) => t.includes('Campus'))) score += 2;
    if (location === 'Anywhere') score += 1;

    // Rating bonus
    score += salon.rating * 0.3;

    return { salon, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].salon;
}

function generateExplanation(salon, answers) {
  const { style, budget, priority } = answers;
  const lines = [];

  lines.push(
    `${salon.name} is your top match based on your preference for ${style.toLowerCase()} nail styles and your ${budget.toLowerCase()} budget.`
  );

  if (priority === 'Design Quality') {
    lines.push(`With a design quality score of ${salon.scores.designQuality}/10, it stands out for its artistry and attention to detail.`);
  } else if (priority === 'Price') {
    lines.push(`It offers one of the best price-to-quality ratios at ${salon.priceRange}, making it smart value for money.`);
  } else if (priority === 'Cleanliness') {
    lines.push(`It scores ${salon.scores.cleanliness}/10 for cleanliness — one of the cleanest salons in our database.`);
  } else if (priority === 'Speed') {
    lines.push(`Known for quick service with a speed score of ${salon.scores.speed}/10, it's great for fitting into a busy schedule.`);
  } else if (priority === 'Long-lasting Nails') {
    lines.push(`Durability is a standout at ${salon.scores.durability}/10 — clients consistently report their nails lasting 3–4+ weeks.`);
  }

  lines.push(`Customers especially love: ${salon.customersLove[0].toLowerCase()}.`);
  return lines;
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState([]);

  const currentQ = questions[step];
  const totalSteps = questions.length;
  const progress = (step / totalSteps) * 100;

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      const match = matchSalon(newAnswers);
      const exp = generateExplanation(match, newAnswers);
      setResult(match);
      setExplanation(exp);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setExplanation([]);
  };

  if (result) {
    return (
      <main style={page}>
        <div style={card}>
          {/* Confetti-like header */}
          <div style={resultHeader}>
            <span style={{ fontSize: 40 }}>✨</span>
            <h1 style={resultTitle}>Your Perfect Match</h1>
            <p style={resultSubtitle}>Based on your style, budget, and priorities</p>
          </div>

          {/* Salon result card */}
          <div style={{ ...salonCard, background: result.imageColor }}>
            <div style={salonOverlay}>
              <div style={salonResultContent}>
                <div style={matchBadge}>
                  <Sparkles size={12} />
                  Best Match
                </div>
                <h2 style={salonResultName}>{result.name}</h2>
                <div style={salonResultMeta}>
                  <span style={ratingBadge}>
                    <Star size={11} fill="var(--accent)" stroke="none" />
                    {result.rating}
                  </span>
                  <span style={locationBadge}>📍 {result.location}</span>
                  <span style={priceBadge}>{result.priceRange}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div style={explanationWrap}>
            {explanation.map((line, i) => (
              <p key={i} style={explanationLine}>{line}</p>
            ))}
          </div>

          {/* Tags */}
          <div style={tagsRow}>
            {result.tags.map((t) => (
              <span key={t} style={tagChip}>{t}</span>
            ))}
          </div>

          {/* Actions */}
          <div style={resultActions}>
            <Link to={`/salon/${result.id}`} style={viewBtn}>
              View Full Profile <ArrowRight size={15} />
            </Link>
            <button onClick={handleReset} style={retakeBtn}>
              <RotateCcw size={14} /> Retake Quiz
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={page}>
      <div style={card}>
        {/* Progress */}
        <div style={progressWrap}>
          <div style={progressTrack}>
            <div style={{ ...progressFill, width: `${progress}%` }} />
          </div>
          <span style={progressText}>
            {step + 1} / {totalSteps}
          </span>
        </div>

        {/* Back button */}
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} style={backBtn}>
            <ArrowLeft size={14} /> Back
          </button>
        )}

        {/* Question */}
        <div style={questionWrap}>
          <span style={questionEmoji}>{currentQ.emoji}</span>
          <h2 style={questionText}>{currentQ.question}</h2>
        </div>

        {/* Options */}
        <div style={optionsGrid}>
          {currentQ.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              style={optionBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--primary)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--surface)';
                e.currentTarget.style.color = 'var(--text-main)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: 24 }}>{opt.emoji}</span>
              <span style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3 }}>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

const page = {
  minHeight: 'calc(100vh - 64px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '40px 24px',
  background: 'linear-gradient(160deg, var(--background) 0%, var(--primary-soft) 100%)',
};

const card = {
  background: 'var(--surface)',
  borderRadius: 28, border: '1px solid var(--border)',
  padding: '40px', maxWidth: 580, width: '100%',
  boxShadow: '0 8px 40px rgba(183,110,121,0.1)',
  display: 'flex', flexDirection: 'column', gap: 24,
};

const progressWrap = {
  display: 'flex', alignItems: 'center', gap: 12,
};
const progressTrack = {
  flex: 1, height: 6, background: 'var(--primary-soft)',
  borderRadius: 999, overflow: 'hidden',
};
const progressFill = {
  height: '100%', background: 'var(--primary)',
  borderRadius: 999, transition: 'width 0.4s ease',
};
const progressText = { fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 };

const backBtn = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  background: 'none', border: 'none', cursor: 'pointer',
  fontSize: 14, color: 'var(--text-muted)', padding: 0,
};

const questionWrap = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  gap: 12, textAlign: 'center',
};
const questionEmoji = { fontSize: 36 };
const questionText = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 'clamp(20px, 3vw, 26px)',
  color: 'var(--text-main)',
};

const optionsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: 12,
};

const optionBtn = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  gap: 8, padding: '18px 12px',
  background: 'var(--surface)', border: '1.5px solid var(--border)',
  borderRadius: 16, cursor: 'pointer',
  transition: 'all 0.15s', color: 'var(--text-main)',
};

/* Result */
const resultHeader = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  gap: 8, textAlign: 'center',
};
const resultTitle = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 30, color: 'var(--text-main)',
};
const resultSubtitle = { fontSize: 14, color: 'var(--text-muted)' };

const salonCard = {
  borderRadius: 20, overflow: 'hidden', minHeight: 160,
};
const salonOverlay = {
  background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 100%)',
  padding: '24px', minHeight: 160,
  display: 'flex', alignItems: 'flex-end',
};
const salonResultContent = { display: 'flex', flexDirection: 'column', gap: 8 };
const matchBadge = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  background: 'var(--accent)', color: '#fff',
  borderRadius: 999, padding: '4px 12px', fontSize: 12, fontWeight: 700,
};
const salonResultName = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 26, color: '#fff',
  textShadow: '0 2px 8px rgba(0,0,0,0.2)',
};
const salonResultMeta = { display: 'flex', gap: 8, flexWrap: 'wrap' };
const ratingBadge = {
  display: 'inline-flex', alignItems: 'center', gap: 4,
  background: 'rgba(255,255,255,0.9)', color: 'var(--accent)',
  borderRadius: 20, padding: '3px 10px', fontSize: 13, fontWeight: 700,
};
const locationBadge = {
  background: 'rgba(255,255,255,0.9)', color: 'var(--text-main)',
  borderRadius: 20, padding: '3px 10px', fontSize: 12,
};
const priceBadge = {
  background: 'rgba(255,255,255,0.9)', color: 'var(--accent)',
  borderRadius: 20, padding: '3px 10px', fontSize: 13, fontWeight: 700,
};

const explanationWrap = {
  background: 'var(--background)', borderRadius: 16,
  padding: '20px', display: 'flex', flexDirection: 'column', gap: 10,
};
const explanationLine = { fontSize: 14, color: 'var(--text-main)', lineHeight: 1.7 };

const tagsRow = { display: 'flex', flexWrap: 'wrap', gap: 8 };
const tagChip = {
  background: 'var(--primary-soft)', color: 'var(--accent)',
  borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 500,
};

const resultActions = { display: 'flex', gap: 10, flexWrap: 'wrap' };
const viewBtn = {
  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  background: 'var(--primary)', color: '#fff',
  borderRadius: 14, padding: '12px', fontSize: 14, fontWeight: 600,
  textDecoration: 'none',
};
const retakeBtn = {
  display: 'flex', alignItems: 'center', gap: 6,
  background: 'transparent', color: 'var(--text-muted)',
  border: '1.5px solid var(--border)', borderRadius: 14,
  padding: '12px 20px', fontSize: 14, fontWeight: 500,
  cursor: 'pointer',
};
