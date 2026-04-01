# Liquid Glass Calculator Design System

## 1) Material Tokens
- **Glass layer**: `backdrop-filter: blur(22px) saturate(180%)`
- **Glass alpha**: dark `0.18`, light `0.34`, tinted `0.26`, clear `0.12`
- **Edge highlights**:
  - top inner rim: `rgba(255,255,255,0.48)`
  - lower occlusion rim: `rgba(0,0,0,0.28)`
- **Bloom shader**: radial highlight tied to cursor (`--mx`, `--my`)
- **Depth**:
  - z1 elevation: `0 8px 24px rgba(0,0,0,0.24)`
  - z2 container: `0 16px 42px rgba(0,0,0,0.34)`

## 2) Curvature + Spatial System
- Global shell curvature: **44px**
- Primary glass surfaces: **36px / 28px radius**
- Control curvature: **22px radius**
- Pill nav & chips: **999px**
- Concentric rounding is preserved from shell → cards → controls.

## 3) Motion System
- Primary spring-like curve: `cubic-bezier(0.16, 1, 0.3, 1)` @ `450ms`
- Micro interaction timing: `180ms ease`
- Key press: scale `0.97`, translateY `1px`, rotateX `8deg`
- Tab bar scroll response: scale to `0.88`, translateY `12px`
- Context alert: anchored at pointer, emerges with scale from `0.84 → 1`

## 4) Components
- **Top Bar**: glass title + theme chips
- **Display Card**: equation + resolved numeric output
- **History Card**: scrollable results stack to drive tab shrink behavior
- **Keypad**: 4-column glass keys (0 spans 2 columns)
- **Tab Bar**: 3 tab pills with dynamic compression on downward scroll
- **Context Alert**: local anchored toast for spatial feedback (used for Clear)

## 5) Theme Modes
- **Dark**: cool cinematic neutral with blue accent
- **Light**: frosted milk glass with darker typography
- **Tint**: expressive violet blend
- **Clear**: high transparency for immersive background exposure

All themes dynamically update CSS custom properties.
