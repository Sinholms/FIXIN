---
name: Service Professional System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#434750'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#747781'
  outline-variant: '#c3c6d2'
  surface-tint: '#395d9e'
  primary: '#002556'
  on-primary: '#ffffff'
  primary-container: '#0d3b7a'
  on-primary-container: '#84a7ed'
  inverse-primary: '#acc7ff'
  secondary: '#964900'
  on-secondary: '#ffffff'
  secondary-container: '#fe8a29'
  on-secondary-container: '#642f00'
  tertiary: '#23272a'
  on-tertiary: '#ffffff'
  tertiary-container: '#393d40'
  on-tertiary-container: '#a4a8ab'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#acc7ff'
  on-primary-fixed: '#001a40'
  on-primary-fixed-variant: '#1d4585'
  secondary-fixed: '#ffdcc6'
  secondary-fixed-dim: '#ffb786'
  on-secondary-fixed: '#311300'
  on-secondary-fixed-variant: '#723600'
  tertiary-fixed: '#e0e3e7'
  tertiary-fixed-dim: '#c3c7cb'
  on-tertiary-fixed: '#181c1f'
  on-tertiary-fixed-variant: '#43474b'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.02em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 1rem
  gutter-md: 1rem
  gutter-sm: 0.5rem
  section-padding: 1.5rem
  component-padding: 0.75rem
---

## Brand & Style

This design system is built for reliability, accessibility, and professional efficiency in the on-demand service sector. The visual language balances high-trust corporate stability with energetic action-oriented accents.

The style is **Modern Corporate**, utilizing a structured layout, clear information hierarchy, and a bold color palette. It prioritizes clarity and ease of use for users who need to find help quickly. Key characteristics include high-contrast interactive elements, rounded containers for friendliness, and a clean, spacious interface that reduces cognitive load during the booking process.

## Colors

The palette is anchored by a deep Navy Blue, signaling authority and competence. This is contrasted by a vibrant Safety Orange, used strategically for primary calls to action and status badges to draw immediate attention.

*   **Primary (Navy):** Used for headers, brand backgrounds, and key navigation states.
*   **Secondary (Orange):** Reserved for primary buttons, rating stars, and verification badges.
*   **Tertiary (Soft Blue/Gray):** Used for background surfaces and card containers to differentiate from the pure white page.
*   **Neutral (Dark Charcoal):** Applied to typography and iconography to ensure high legibility and WCAG compliance.

## Typography

The design system uses **Plus Jakarta Sans** for its modern, friendly, and highly readable characteristics. The type scale is optimized for mobile interfaces where space is premium but clarity is non-negotiable.

Headlines use bold weights to create clear section breaks. Labels for service categories are uppercase to provide variety in the visual texture of the page. Body text maintains a comfortable line height to ensure descriptions and pricing remain legible even on smaller devices.

## Layout & Spacing

The layout follows a **Fluid Mobile Grid** philosophy. It uses a standard 16px (1rem) margin on the left and right edges of the screen to ensure content does not feel cramped against the device bezel.

Vertical rhythm is maintained through 24px (1.5rem) spacing between major sections (e.g., between the search area and category grid). Cards within a horizontal scroller use 12px (0.75rem) spacing to allow the "peek" effect, signaling to users that more content is available off-screen.

## Elevation & Depth

This design system uses **Tonal Layering** combined with subtle **Ambient Shadows** to create depth. 

*   **Level 0 (Base):** The primary app background uses a very light gray/blue tint to reduce eye strain.
*   **Level 1 (Cards):** Service category and technician cards use a white background with a subtle 4px blur shadow (5% opacity) to lift them slightly from the base.
*   **Level 2 (Active Elements):** Bottom navigation bars and floating headers use a solid white background with a more pronounced top-border or subtle shadow to indicate they sit above the scrolling content.

## Shapes

The shape language is **Rounded**, favoring 8px (0.5rem) corners for standard UI components like search bars and buttons. Larger containers, such as the top header background and the primary technician cards, utilize 16px (1rem) corners for a more modern, approachable feel. This consistent rounding softens the "industrial" nature of repair services, making the app feel more consumer-friendly.

## Components

### Search Bar
The search bar is a white, rounded-md container with a subtle inner border. It features a left-aligned icon and placeholder text. It is always positioned prominently within the navy header area for instant access.

### Service Categories
These are represented as white vertical tiles. They consist of a large, high-contrast icon (Navy) followed by a bold, uppercase label. The interaction state should involve a subtle scale-down effect.

### Technician Cards
Vertical cards featuring a split design:
*   **Top Half:** An image of the professional with a vibrant orange background, including a floating rating badge (Orange/White).
*   **Bottom Half:** Text-heavy white section containing the professional's name, specialization, and pricing.
*   **CTA:** A full-width orange button ("Pilih Teknisi") anchored to the bottom of the card.

### Bottom Navigation
A clean, white fixed bar with 4-5 items. Icons use the primary Navy color for the active state and a light gray for inactive states. Labels are positioned directly below the icons in a small, bold font.

### Banners & Badges
Informational banners use the primary Navy blue with white text and orange icons to highlight "100% Guarantees." This reinforces the brand's value proposition through color association.