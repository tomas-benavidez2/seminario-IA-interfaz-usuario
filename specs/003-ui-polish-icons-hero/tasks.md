# Lista de Tareas: Hero Abierto, Selects y Nuevos Iconos (003-ui-polish-icons-hero)

## [x] T1: Rediseño del Hero en Open Canvas de 2 Columnas (index.html, style.css)
- **Objetivo:** Eliminar la tarjeta exterior en la sección Hero, resolver el antipatrón de tarjetas anidadas y crear un layout desktop fluido de dos columnas (7/12 para texto/CTA y 5/12 para HUD biomédico).
- **Archivos a modificar por Implementer:** `index.html`, `style.css`.
- **Criterios de Aceptación:**
  - **CA-T1.1:** En desktop, el Hero aprovecha el ancho completo con un split de dos columnas balanceadas.
  - **CA-T1.2:** Desaparece la doble tarjeta: el panel `#hero-bio-banner` se integra como un HUD aeroespacial nativo.

---

## [x] T2: Estilizado y Responsividad de Desplegables de Telemetría (style.css, index.html)
- **Objetivo:** Aplicar `appearance: none` con chevron SVG en `.select-field` y estilizar los elementos `<option>` con fondo temático, evitando desbordamientos en pantallas móviles.
- **Archivos a modificar por Implementer:** `style.css`, `index.html`.
- **Criterios de Aceptación:**
  - **CA-T2.1:** Los `<select>` muestran un chevron estilizado y las opciones desplegadas tienen fondo oscuro `#252B33` en Dark mode y claro en Light mode.
  - **CA-T2.2:** Ninguna opción genera scroll horizontal ni desborda en viewports de 360px a 390px.

---

## [x] T3: Reemplazo Integral de Emojis por Iconografía Sci-Fi Minimalista (index.html, app.js, style.css)
- **Objetivo:** Sustituir todos los emojis genéricos por glifos e iconos vectoriales SVG limpios, monocromáticos y de precisión aeroespacial.
- **Archivos a modificar por Implementer:** `index.html`, `app.js`, `style.css`.
- **Criterios de Aceptación:**
  - **CA-T3.1:** Logo, selectores de especie (casco astronauta y glifo alien), catálogo de ingredientes, carrito y avisos muestran SVGs minimalistas y accesibles.
  - **CA-T3.2:** No quedan emojis de texto estándar en los elementos interactivos principales.
