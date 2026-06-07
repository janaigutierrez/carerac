# TODO Carerac

## Pendent amb la clienta (en directe)

### EmailJS — passar al seu compte
Ara mateix els correus de notificacio + confirmacio surten del compte d'EmailJS del Janai. S'han de passar al de la Laia.

Passos durant la reunio:
1. Crear-li compte a https://www.emailjs.com (free tier).
2. Connectar el seu Gmail (`carerac.life@gmail.com`) com a service.
3. Recrear els 2 templates:
   - Notificacio de reserva nova (cap a ella)
   - Confirmacio de reserva aprovada (cap al client)
   Copiar el contingut/variables dels actuals.
4. Copiar `service_id`, els 2 `template_id` i el `public_key` nous.
5. A Netlify → Site configuration → Environment variables, substituir:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
6. Netlify → Deploys → Trigger deploy → Clear cache and deploy site.
7. Verificar enviant una reserva de prova.
8. Despres del swap, revocar/esborrar els templates antics del compte del Janai.

### Cloudinary — swap al compte de la clienta
Provisional: les 4 vars de Cloudinary apunten al compte del Janai per fer test rapid. S'ha de fer el swap al compte de la clienta en algun moment.

Quan toqui:
1. Crear-li compte a https://cloudinary.com (free tier: 25GB + 25GB bandwidth/mes).
2. Al dashboard de Cloudinary copiar `cloud_name`, `api_key`, `api_secret`.
3. A Netlify substituir les 4 vars (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — aquesta ultima amb el mateix valor que la primera).
4. Clear cache and deploy.
5. Re-pujar les imatges des de `/admin` Galeria (les antigues quedaran al compte del Janai, no es migren automaticament).
6. Eliminar les imatges del compte del Janai un cop confirmat el swap.

### Sobre nosaltres — escriure el text llarg
La pagina `/sobre-nosaltres` ja existeix pero amb contingut buit. La Laia ha d'escriure la historia llarga des de `/admin` pestanya Contingut, en CA / ES / EN.

## Pendent de rebre

- Preus finals de cada experiencia
- Textos definitius i horaris de les experiencies
- Avis legal i politica de privacitat (la de cookies ja esta feta)

## Idees per iteracions futures

- **Integracio IA**: chatbot FAQ amb informacio de la masia + experiencies (cost ~5-15€/mes API). Implementacio estimada: 4-6h.
- **SEO + AI Overviews**: schema.org marcatge, sitemap, contingut estructurat perque IAs (Google AI Overviews, Perplexity) llegeixin be el contingut. Implementacio estimada: 2-3h.
- **Domini + hosting** (tasca de la clienta): comprar `carerac.life` (o similar) i decidir si paguem tier de Mongo Atlas amb cluster sempre actiu (~9€/mes M2) per evitar el cold start del free tier.
