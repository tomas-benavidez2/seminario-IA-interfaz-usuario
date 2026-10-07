# Plan Técnico de Implementación: Hero Abierto, Selects Accesibles e Iconos Sci-Fi (003-ui-polish-icons-hero)

## 1. Arquitectura de Cambios por Componente

### 1.1 Rediseño del Hero en `index.html` y `style.css`
- **Eliminación del Antipatrón de Tarjeta Anidada:**
  - Retirar las clases `hero-card border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl rounded-3xl` de `<section id="hero">`.
  - El Hero pasa a ser un contenedor abierto con `grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 sm:py-10`.
- **Columna Izquierda (`lg:col-span-7`):**
  - Badge de propuesta de valor con icono SVG de satélite/órbita.
  - Título principal H1 (`text-4xl sm:text-5xl lg:text-6xl font-black`).
  - Párrafo descriptivo en escala tipográfica fluida.
  - Botón primario de salto rápido hacia `#builder`.
- **Columna Derecha (`lg:col-span-5`):**
  - El panel `#hero-bio-banner` se convierte en un HUD biomédico aeroespacial (`hud-panel`) con borde de acento sutil, indicadores de pulso de telemetría y datos de la tripulación en tiempo real.

### 1.2 Estilizado y Responsividad de Desplegables (`.select-field`)
- **En `style.css`:**
  - Agregar `appearance: none; -webkit-appearance: none;` a `.select-field`.
  - Incrustar chevron vectorial en SVG como `background-image` (color `#FF9500` con offset derecho).
  - Regla para `.select-field option`:
    ```css
    .select-field option {
      background-color: var(--color-surface);
      color: var(--color-text);
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
    }
    ```
- **En `index.html`:**
  - Ajustar etiquetas de texto de las `<option>` para que sean claras y concisas, garantizando que el selector no exceda el ancho del viewport en 360px.

### 1.3 Iconografía Sci-Fi Minimalista (SVG Inline)
Reemplazar los emojis de texto por SVGs con trazo lineal de 1.75px, viewBox estándar `0 0 24 24`, clases de tamaño responsivas (`w-5 h-5`, `w-6 h-6`) y `aria-hidden="true"`:
1. **Logo / Cohete:** Trazo aerodinámico de cohete en `#FF9500`.
2. **Humano:** Casco de astronauta con visor curvo y líneas de bioseguridad.
3. **Alien Zogtoniano:** Glifo extraterrestre / rostro cibernético con óptica bioenergética.
4. **Ingredientes:**
   - Muzzarella: Círculo de masa con queso derretido en gravedad cero.
   - Pepperoni: Rodajas estelares con especias.
   - Bacon: Tiras hidropónicas onduladas.
   - Provolone: Bloque prismático de bajo peso.
   - Morrón: Glifo botánico de cúpula marciana.
   - Aceitunas: Orbe joviano con anillo orbital.
   - Roca Espacial: Poliedro iónico con advertencia.
   - Bebida Metano: Frasco químico criogénico con vapores.
   - Cristales de Plasma: Gemas de energía bio-iónica con rayo.
5. **Carrito y Acciones:** Carrito espacial aerodinámico, iconos sol/luna minimalistas y escudos WAI-ARIA.

---

## 2. Plan de Tareas
- **T1:** Reestructuración de la sección Hero (Open Canvas en 2 columnas en desktop, eliminación de tarjeta duplicada).
- **T2:** Estilizado universal y control responsivo de los `<select>` de telemetría.
- **T3:** Implementación del sistema de iconos vectoriales SVG Sci-Fi minimalistas en toda la SPA.
