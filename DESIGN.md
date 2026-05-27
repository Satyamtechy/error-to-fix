# error-to-fix — Design System (Linear-inspired)

## Theme: Midnight Command Center

> A dark, layered interface lit by precise accents.
> Single vivid accent (Neon Lime #e4f222) for "fix found" indicators.

## Colors

| Token | Value | Role |
|-------|-------|------|
| `--color-bg` | `#08090a` | Page background |
| `--color-card` | `#0f1011` | Card surface |
| `--color-card-elevated` | `#161718` | Elevated cards |
| `--color-border` | `#23252a` | Borders |
| `--color-border-subtle` | `#323334` | Subtle dividers |
| `--color-input` | `#383b3f` | Input backgrounds |
| `--color-text` | `#f7f8f8` | Primary text |
| `--color-text-secondary` | `#d0d6e0` | Secondary text |
| `--color-text-muted` | `#8a8f98` | Labels, metadata |
| `--color-text-dim` | `#62666d` | Timestamps, hints |
| `--color-accent` | `#e4f222` | Primary action (fix found!) |
| `--color-accent-blue` | `#5e6ad2` | Decorative/info |
| `--color-success` | `#27a644` | Success states |
| `--color-error` | `#eb5757` | Error indicators |
| `--color-info` | `#02b8cc` | Info highlights |

## Typography

| Role | Size | Weight | Tracking |
|------|------|--------|----------|
| Display | 72px | 510 | -0.22px |
| Heading Large | 48px | 510 | -0.22px |
| Heading | 24px | 510 | -0.22px |
| Body | 14px | 400 | -0.13px |
| Caption | 10px | 400 | -0.1px |
| Code | 14px (Berkeley Mono) | 400 | -0.15px |

## Spacing

Base unit: 4px, density: compact
- Element gap: 8px
- Card padding: 12px
- Section gap: 24px

## Border Radius

- Tags: 2px
- Badges: 4px
- Cards/Buttons/Inputs: 6px

## Shadows

- Card: `rgba(0,0,0,0.4) 0px 2px 4px 0px`
- Subtle border: `rgb(35,37,42) 0px 0px 0px 1px inset`
- Elevated: `rgba(8,9,10,0.6) 0px 4px 32px 0px`

## Rules

- Single accent only (#e4f222) for interactive elements
- Layered surfaces for depth (not shadows)
- Compact 8px element gaps
- 6px radius everywhere
- Inter Variable for UI, Berkeley Mono for code
- No light mode — dark-first only
