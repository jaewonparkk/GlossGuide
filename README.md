# NailMatch

> Find the nail salon that actually matches your style.

NailMatch is a review intelligence and recommendation platform for local nail salons. It helps users compare salons by style, price, cleanliness, design quality, and booking convenience — reducing decision friction through smart summaries and personalized matching.

Built with **React + Vite**. No backend, no API keys, no account needed — runs entirely in the browser with mock data.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/jaewonparkk/GlossGuide.git
cd GlossGuide

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open your browser and go to: **http://localhost:5173**

### Other Commands

```bash
npm run build     # Build for production (outputs to /dist)
npm run preview   # Preview the production build locally
```

---

## How to Use the App

### Home Page (`/`)
- Read the tagline and app description
- Use the **search bar** to find salons by name, location, or style keyword
- Click **filter chips** (Gel, Korean Style, Affordable, etc.) to browse by category
- Click a **style card** (Aura Nails, Chrome Nails, etc.) to jump to matching salons
- Scroll to see **Featured Salons**
- Click **"Find My Match"** at the bottom to take the quiz

### Discover Page (`/discover`)
- Browse all 10 mock salons in a card grid
- Use the **search bar** to filter by name, location, or tag
- Toggle **filter chips** to narrow by style or quality
- Use the **sort dropdown** to sort by rating, reviews, or price
- Click **"View Details"** on any card to see the full salon profile
- Click **"Compare"** to add a salon to your comparison list (up to 3)

### Salon Detail Page (`/salon/:id`)
- See the full profile: rating, location, price range, style tags
- Read the **review intelligence summary**: what customers love, common complaints, best for, not ideal for
- View the **score breakdown** with animated bars for Design Quality, Cleanliness, Price Value, Speed, Booking Ease, and Durability
- Read **real customer review snippets**
- Click **"Add to Compare"** to add the salon to your comparison

### Compare Page (`/compare`)
- Accessible from the **Compare** button in the navbar (shows a badge with count)
- See a **side-by-side comparison table** for 2–3 selected salons
- Score bars highlight the best-performing salon per category in accent color
- Read the **AI-style recommendation sentence** at the top
- Click **"View Details"** to go to any salon's full page
- Click **"X"** to remove a salon from the comparison
- Click **"+ Add More Salons"** to go back and pick more

### Quiz Page (`/quiz`)
- Answer 4 questions: preferred style, budget, top priority, and location preference
- Watch the **progress bar** fill as you go
- Use the **Back button** to change a previous answer
- See your **personalized salon match** with an explanation of why it fits you
- Click **"View Full Profile"** to go directly to that salon's detail page
- Click **"Retake Quiz"** to start over

---

## Project Structure

```
GlossGuide/
├── index.html                  # HTML entry point, loads fonts and mounts the app
├── vite.config.js              # Vite configuration
├── package.json                # Project dependencies and scripts
│
├── src/
│   ├── main.jsx                # React app entry — mounts <App /> into the DOM
│   ├── App.jsx                 # Root component — sets up React Router and shared compare state
│   ├── index.css               # Global styles and CSS variables (color palette, fonts, scrollbar)
│   │
│   ├── data/
│   │   └── salons.js           # All mock data: 10 salon objects + 8 style categories
│   │
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky top navigation with logo, links, and compare badge
│   │   ├── SalonCard.jsx       # Reusable card used in Home and Discover — shows salon summary
│   │   ├── ScoreBar.jsx        # Animated horizontal score bar used in Salon Detail page
│   │   └── FilterChips.jsx     # Row of toggleable filter pill buttons
│   │
│   └── pages/
│       ├── HomePage.jsx        # Landing page — hero, search, style grid, featured salons, quiz CTA
│       ├── DiscoveryPage.jsx   # Full salon browser with search, filters, and sort
│       ├── SalonDetailPage.jsx # Full salon profile with scores, review intelligence, and reviews
│       ├── ComparePage.jsx     # Side-by-side comparison table with AI recommendation
│       └── QuizPage.jsx        # 4-step quiz with salon matching logic and result screen
```

---

## Mock Data Reference

All salon data lives in `src/data/salons.js`. Each salon object has:

| Field | Description |
|---|---|
| `id` | Unique identifier used in the URL (`/salon/:id`) |
| `name` | Salon name |
| `location` | Neighborhood, city |
| `rating` | Score out of 5 |
| `reviewCount` | Number of reviews |
| `priceRange` | `$`, `$$`, or `$$$` |
| `tags` | Array of style/quality labels used for filtering |
| `keywords` | Short descriptive words shown on cards |
| `imageColor` | Hex color used as the card's image placeholder background |
| `customersLove` | Array of things reviewers commonly praise |
| `commonComplaints` | Array of recurring criticisms |
| `bestFor` | Who this salon suits best |
| `notIdealFor` | Who should look elsewhere |
| `scores` | Object with 6 numeric scores (0–10): `designQuality`, `cleanliness`, `priceValue`, `speed`, `bookingEase`, `durability` |
| `reviewSnippets` | Array of `{ author, text }` mock review quotes |
| `recommendedFor` | One-line summary shown in compare table and detail page |
| `mainStrength` | Short label for the compare table |
| `mainWeakness` | Short label for the compare table |
| `style` | Array of style category names used for style-based filtering |

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React](https://react.dev/) | UI components and state management |
| [Vite](https://vite.dev/) | Dev server and build tool |
| [React Router](https://reactrouter.com/) | Client-side routing between pages |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Google Fonts](https://fonts.google.com/) | DM Serif Display (headings) + DM Sans (body) |

---

## Design System

| Variable | Value | Used For |
|---|---|---|
| `--background` | `#FFF8F8` | Page background |
| `--surface` | `#FFFFFF` | Cards and panels |
| `--primary` | `#E59AAA` | Buttons, active states |
| `--primary-soft` | `#F9E1E6` | Chip backgrounds, soft highlights |
| `--text-main` | `#2D2428` | Headings and body text |
| `--text-muted` | `#8A7A7F` | Secondary/subtext |
| `--border` | `#F0D8DD` | Card borders and dividers |
| `--accent` | `#B76E79` | Ratings, selected states, highlights |
