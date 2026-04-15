# CLAUDE.md — Can Carerac

Landing + sistema de reserves per una masia historica a Caldes de Montbui.

## Stack

- Next.js 15 (App Router) + TypeScript
- MongoDB Atlas + Mongoose
- Tailwind CSS v3 (config a `tailwind.config.ts`)
- iron-session (cookies) + bcryptjs per admin
- EmailJS browser-side per notificacions
- Deploy: Netlify (`@netlify/plugin-nextjs`)

## Estructura

```
carerac/
├── app/
│   ├── page.tsx              # Landing publica (SSR)
│   ├── layout.tsx            # Fonts, metadata, LanguageProvider
│   ├── admin/
│   │   ├── login/            # Formulari login
│   │   └── (protected)/      # Dashboard (requireAdmin())
│   └── api/
│       ├── booking/          # POST public, crea reserva pending + rate limit
│       ├── calendar/         # GET public, retorna dates ocupades
│       └── admin/            # PATCH/DELETE reserves, CRUD blocked-dates, login
├── components/
│   ├── booking/              # Sub-components de reserva
│   ├── sections/             # Seccions de la landing
│   └── layout/               # Header, Footer
├── hooks/useLanguage.tsx     # i18n (CA default / ES / EN)
├── lib/
│   ├── models/               # Mongoose schemas (Booking, BlockedDate)
│   ├── data/locales/         # Traduccions tipades
│   ├── mongo.ts              # Connexio cached
│   ├── session.ts            # iron-session helpers
│   ├── admin-auth.ts         # Verifica username + bcrypt hash
│   └── rate-limit.ts         # In-memory limit (10 POST/h per IP)
└── public/images/            # WebP assets
```

## Variables d'entorn

Veure `.env.example`. Totes server-side excepte les `NEXT_PUBLIC_EMAILJS_*` (EmailJS es client-side per disseny).

A `.env.local`: escapar `$` com `\$` al `ADMIN_PASSWORD_HASH` perque Next no el parsegi com variable. A Netlify UI: valor raw sense escapar.

## Flux de reserva

1. Usuari omple formulari → `POST /api/booking` → reserva pending a Mongo.
2. Client envia email de notificacio a la propietaria (EmailJS template nova reserva).
3. Admin entra a `/admin`, veu les pending al dashboard.
4. Admin aprova/rebutja → `PATCH /api/admin/bookings/[id]` actualitza status.
5. Si aprovada → client envia email de confirmacio al usuari (EmailJS template confirmacio).
6. Calendar `/api/calendar` retorna dates ocupades (approved ∪ blocked) → calendari landing els marca indisponibles.

## Dates i timezones

Les dates es guarden com a Date (UTC midnight). Important usar `setUTCHours(0,0,0,0)` (no `setHours`) al processar strings de tipus `YYYY-MM-DD`, si no hi ha desplaçament d'un dia segons zona horaria.

## Comandes

```bash
npm run dev      # port 3000 fix
npm run build    # build produccio
npm run start    # servir build local
npm run lint     # ESLint
```

## Desplegament

Netlify detecta Next.js via `@netlify/plugin-nextjs`. Variables d'entorn configurades al dashboard. `netlify.toml` minimal.
