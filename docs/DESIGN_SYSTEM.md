# Design System Specification: DiziBrand Media

This document establishes the visual identity, design tokens, typography, component specifications, and interactive animation rules for the DiziBrand Media platform.

---

## 1. Design Philosophy & Brand Aesthetic

- **Aesthetic Classification**: Premium Global Corporate-Technology Consulting.
- **Visual Values**: Restrained, authoritative, engineering-grade precision, ample whitespace, architectural grid alignment.
- **Anti-Patterns**:
  - No generic, garish agency gradients or saturated rainbow accents.
  - No generic stock photography showing laughing models in corporate suits.
  - No frivolous or disorienting animations; all motion must be purposeful, subtle, and hardware-accelerated.
  - **Zero Fake Proof**: Every metric, logo, or case study without verified client sign-off must display a discreet `[Pending verification]` badge.

---

## 2. Color Palette & Design Tokens

### A. Dark Foundation & Surfaces (Corporate Tech Palette)
```css
:root {
  /* Foundations */
  --bg-primary: #0A0C10;        /* Deep Black / Void */
  --bg-secondary: #12151E;      /* Midnight Charcoal */
  --bg-tertiary: #1A1F2C;       /* Graphite Grey */
  --bg-surface: #22283A;        /* Elevated Surface Card */
  --bg-surface-hover: #2B334A;  /* Card Hover State */

  /* Hairline Borders & Dividers */
  --border-subtle: #1E2436;     /* Low-contrast divider */
  --border-default: #2A324B;    /* Standard card border */
  --border-focused: #FF5500;    /* Focus ring border */

  /* Typography & Text */
  --text-primary: #F8FAFC;      /* Pure Crisp White / Off-White */
  --text-secondary: #CBD5E1;    /* Slate Light */
  --text-muted: #94A3B8;        /* Graphite Muted */
  --text-faint: #64748B;        /* Meta / Timestamp */

  /* DiziBrand Controlled Accent (Orange) */
  --accent-orange: #FF5500;       /* Signature DiziBrand Orange */
  --accent-orange-hover: #E04B00; /* Darker Orange on hover */
  --accent-orange-glow: rgba(255, 85, 0, 0.18); /* Subtle glow filter */
  --accent-orange-soft: rgba(255, 85, 0, 0.08); /* Badge background */

  /* Status Colors */
  --status-success: #10B981;    /* Emerald Green */
  --status-warning: #F59E0B;    /* Amber Warning */
  --status-danger: #EF4444;     /* Crimson Red */
  --status-info: #3B82F6;       /* Blue Info */
  --status-pending: #8B5CF6;    /* Purple "Pending Verification" */
}
```

### B. Tailwind CSS Configuration Mapping
```javascript
// tailwind.config.ts color extension
colors: {
  brand: {
    black: '#0A0C10',
    charcoal: '#12151E',
    graphite: '#1A1F2C',
    surface: '#22283A',
    surfaceHover: '#2B334A',
    border: '#2A324B',
    orange: {
      DEFAULT: '#FF5500',
      hover: '#E04B00',
      soft: 'rgba(255, 85, 0, 0.08)',
      glow: 'rgba(255, 85, 0, 0.18)',
    }
  }
}
```

---

## 3. Typography & Hierarchy

- **Primary Font Family**: **Plus Jakarta Sans** (Modern geometric grotesque with high readability and corporate weight).
- **Secondary / Monospace**: **JetBrains Mono** (for project codes, timestamps, metrics, and technical labels).

### Scale & Application

| Token | Size / Line-Height | Weight | Use Case |
| :--- | :--- | :--- | :--- |
| `display-2xl` | 56px / 64px (Desktop) | 700 / Bold | Hero Primary Headline |
| `display-xl` | 44px / 52px | 700 / Bold | Major Section Headers |
| `heading-lg` | 32px / 40px | 600 / SemiBold | Service & Capability Titles |
| `heading-md` | 24px / 32px | 600 / SemiBold | Card Titles, Dashboard Widgets |
| `heading-sm` | 18px / 26px | 600 / SemiBold | Sub-sections, Form Headers |
| `body-lg` | 18px / 28px | 400 / Regular | Hero Sub-headline & Lead Text |
| `body-md` | 16px / 24px | 400 / Regular | Standard Body Copy & Articles |
| `body-sm` | 14px / 20px | 400 / Regular | Captions, Metadata, Portal Rows |
| `eyebrow` | 12px / 16px | 700 / Bold | Uppercase Tracking (`letter-spacing: 0.15em`) |

---

## 4. Hero Visual: Animated Business Ecosystem Node Graph

### A. Conceptual Architecture
Rather than using generic stock photos, the hero features an interactive, animated corporate ecosystem representing DiziBrand's integrated delivery model:

```
                     ┌──────────────────┐
                     │   Digital CMO    │
                     └────────┬─────────┘
                              │
       ┌──────────────────┐   │   ┌──────────────────┐
       │   Growth Team    ├───┼───┤   Digital CTO    │
       └──────────────────┘   │   └──────────────────┘
                              │
                     ┌────────┴─────────┐
                     │  YOUR BUSINESS   │ (Center Node)
                     └────────┬─────────┘
                              │
       ┌──────────────────┐   │   ┌──────────────────┐
       │     AI Team      ├───┼───┤    Data Team     │
       └──────────────────┘   │   └──────────────────┘
```

### B. Interactive Behavior & Technical Specification
- **Center Node ("Your Business")**:
  - Prominent dark pill or circular container with subtle radial orange pulse (`rgba(255, 85, 0, 0.15)`).
  - Subtle breathing animation: `scale: [1, 1.02, 1]`, duration: 4s, ease: "easeInOut".
- **Satellite Nodes**:
  1. **Digital CMO**: Brand Strategy, Omnichannel Acquisition, Executive Advisory.
  2. **Digital CTO**: Cloud Architecture, Engineering Governance, Tech Strategy.
  3. **Growth Team**: Performance Ads, SEO, Lead Gen, CRO.
  4. **AI Team**: Autonomous Agents, Workflow Automations, LLM Integrations.
  5. **Data Team**: Attribution Modeling, Business Intelligence, Revenue Forecasting.
- **Connecting Synapses (Lines)**:
  - Curved SVG bezier paths connecting each satellite node to the center node.
  - Subtle flowing light pulses (SVG `stroke-dashoffset` or Framer Motion particles) traversing from the satellite nodes into "Your Business".
- **Mobile Responsiveness**:
  - On screens `< 768px`, the 2D canvas dynamically simplifies into a sleek vertical connected flow with the center node at the top, ensuring fast render times and zero horizontal overflow.

---

## 5. Component Primitives & Design Standards

### A. Buttons & CTAs
- **Primary CTA (`Button variant="primary"`):**
  - Background: `var(--accent-orange)` (`#FF5500`).
  - Text: `#FFFFFF`, SemiBold.
  - Hover: Background `#E04B00`, subtle box-shadow `0 0 20px rgba(255, 85, 0, 0.35)`.
  - Active: Scale `0.98`.
- **Secondary CTA (`Button variant="secondary"`):**
  - Background: `var(--bg-tertiary)` (`#1A1F2C`).
  - Border: `1px solid var(--border-default)`.
  - Text: `#F8FAFC`.
  - Hover: Border `1px solid var(--accent-orange)`, Background `var(--bg-surface)`.
- **Ghost / Outline CTA (`Button variant="outline"`):**
  - Background: Transparent.
  - Border: `1px solid var(--border-default)`.
  - Text: `var(--text-secondary)`.

### B. Cards & Glassmorphic Surfaces
- Background: `rgba(26, 31, 44, 0.7)` with `backdrop-filter: blur(12px)`.
- Border: `1px solid rgba(42, 50, 75, 0.6)`.
- Radius: `12px` (`rounded-xl`).
- Hover: Border color transitions to `rgba(255, 85, 0, 0.4)`, slight vertical lift `translateY(-3px)`.

### C. Forms & Inputs
- Background: `var(--bg-secondary)` (`#12151E`).
- Border: `1px solid var(--border-default)` (`#2A324B`).
- Typography: `15px`, `var(--text-primary)`.
- Focus: Border `1px solid var(--accent-orange)`, Ring: `2px solid rgba(255, 85, 0, 0.2)`.
- Floating labels with accessible `aria-labelledby` and visible error messaging.

### D. Badges & Proof Integrity
- Standard Badge: Background `var(--bg-surface)`, text `var(--text-secondary)`, border `1px solid var(--border-default)`.
- **Pending Verification Badge**:
  - Background: `rgba(139, 92, 246, 0.1)`.
  - Border: `1px solid rgba(139, 92, 246, 0.3)`.
  - Text: `#C4B5FD` (Soft Purple).
  - Label: `[Pending verification]`.
  - Used on all preliminary case study metrics, logos, and testimonials to guarantee strict editorial honesty.
