# FIXIN — Appliance Repair App Frontend

A mobile-first multi-screen prototype matching the pasted design. Indonesian copy, frontend only with mock data, AI-generated technician photos.

## Visual System (from the image)
- **Primary navy**: deep blue header/buttons (`oklch` ~ `#1d3a8a`)
- **Accent orange**: logo "X", banners, primary CTAs (`#f97316`)
- **Surfaces**: white cards on light gray background, rounded corners, soft shadows
- **Typography**: bold condensed headings (uppercase section labels), clean sans body
- All colors added as semantic tokens in `src/styles.css` (no hardcoded colors in components)

## Layout Shell
- Mobile frame: centered, max-width ~430px column, app content scrolls inside
- Persistent bottom tab bar: **HOME · PESANAN · PESAN · PROFIL** (icons + labels, active = navy)
- Shared navy top header with **FIXIN** logo (orange X) where appropriate

## Routes (TanStack file-based)
```
src/routes/
  index.tsx              -> / (Home — matches image exactly)
  teknisi.$id.tsx        -> /teknisi/:id (Technician detail + booking entry)
  pesanan.tsx            -> /pesanan (Orders list: active + history)
  pesan.tsx              -> /pesan (Messages / chat list)
  profil.tsx             -> /profil (Profile)
```
Each route gets its own `head()` metadata (title/description in Indonesian). `__root.tsx` renders the mobile shell + bottom nav around `<Outlet />`.

## Screens

**Home (`/`)** — faithful to the image:
- Navy header with FIXIN logo + search bar ("Cari Teknisi AC, Kulkas, Mesin Cuci...")
- 3 category cards: **PERBAIKAN AC · PERBAIKAN KULKAS · PERBAIKAN MESIN CUCI** (with appliance icons)
- Section label: "TEKNISI TERDEKAT & TERVERIFIKASI"
- Orange banner: "HARGA TRANSPARAN & JAMINAN GARANSI PERBAIKAN 100%"
- Horizontal-scroll technician cards: photo + rating badge, name, specialty, price range, orange **PILIH TEKNISI** button
- Navy trust strip: "Harga Transparan · Jaminan Garansi"

**Technician detail (`/teknisi/:id`)** — photo, rating, specialties, price breakdown, reviews, sticky **PILIH TEKNISI / Pesan Sekarang** CTA (opens a simple booking confirmation sheet, mock-only).

**Pesanan (`/pesanan`)** — tabs for Aktif / Selesai, order cards with status badges (mock orders).

**Pesan (`/pesan`)** — chat list with technician avatars, last message preview, unread badges; tapping opens a static mock conversation view.

**Profil (`/profil`)** — user header, menu rows (account, addresses, payment, help, logout), all static.

## Data
- `src/data/technicians.ts` — mock technicians (Andi Saputra, Budi Setiawan, Siti Nurhaliza, +more) with name, specialty, rating, price range, photo import.
- `src/data/orders.ts`, `src/data/messages.ts` — mock content for the other tabs.

## Images
Generate AI technician portraits (uniformed AC/appliance repair workers, friendly, on orange background to match the cards) saved to `src/assets/` and imported per technician. Appliance category icons via `lucide-react`.

## Technical Notes
- Frontend only — no Lovable Cloud, all data hardcoded but structured for an easy backend swap later.
- Components: `BottomNav`, `AppHeader`, `CategoryCard`, `TechnicianCard`, `SectionLabel`, reused across screens.
- Responsive: looks like a phone app on desktop (centered frame), full-bleed on actual mobile.
- Preview viewport switched to mobile.

When approved, I'll generate the technician photos, set up the routes + shell, and build all five screens.