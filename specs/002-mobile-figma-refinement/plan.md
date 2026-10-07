# Plan Técnico de Implementación: Refinamiento Mobile y Fidelidad Figma (002-mobile-figma-refinement)

## 1. Arquitectura Técnica y Estrategia de Solución

### 1.1 Rediseño Responsivo del Header (`index.html` & `style.css`)
En Figma (*Reto 5*), la cabecera móvil (`Header - TopAppBar`, Frame `1:391`) mide exactamente 64px de alto y alberga:
- **Izquierda:** Isotipo 🚀 + Texto "Rocket Pizza" en naranja `#FF9500`.
- **Derecha:** Botón de cambio de tema + Botón de carrito con badge verde `#55E16B`.

Para evitar el desbordamiento horizontal en pantallas móviles sin perder la accesibilidad del selector de especie (`role="radiogroup"`):
1. **En Mobile (`< md:` / `< 768px`):**
   - La barra superior fija (`h-16` / 64px) aloja exclusivamente el Logo a la izquierda y las Acciones (Tema + Carrito) a la derecha.
   - Inmediatamente debajo se ubica una franja compacta y fija de selección de especie (Sub-Header de navegación segmentada de 48px), permitiendo un toque táctil cómodo (`min-h-[44px]`) y roving tabindex para teclado.
   - La altura total fija de cabecera en mobile pasa a ser de 112px, y el `<main>` ajusta su espaciado superior a `pt-32` para evitar cualquier solapamiento.
2. **En Tablet/Desktop (`md:` y superior):**
   - El selector de especie se reubica automáticamente en la fila principal entre el logo y las acciones mediante clases responsivas de Flexbox (`hidden md:flex` en la fila superior, y `md:hidden` en la franja móvil).

### 1.2 Corrección del Comportamiento Sticky en Mobile (`index.html`)
- **Diagnóstico:** La tarjeta de desglose de costos tiene asignada la clase `sticky top-28` incondicionalmente en la línea 786 de `index.html`.
- **Modificación:**
  ```html
  <!-- ANTES: sticky incondicional que tapa el formulario al scrollear en mobile -->
  <div role="region" class="lg:col-span-5 ... sticky top-28">

  <!-- AHORA: estático en mobile/tablet y sticky únicamente en desktops (lg:) -->
  <div role="region" class="lg:col-span-5 ... static lg:sticky lg:top-28">
  ```
- **Resultado:** En pantallas pequeñas, el desglose fluye de forma natural con el scroll. El usuario lee el desglose y al seguir bajando ve el formulario limpio sin solapamientos flotantes.

### 1.3 Calibración de Tokens y Componentes Figma (`style.css`)
1. **Badge del Carrito Lunar:**
   - Figma especifica fondo `#55E16B` ("Albahaca Neón") y texto `#00390F` (Frame `1:399`).
   - Se actualiza la clase `.badge-count` para utilizar esta combinación oficial de Figma, ofreciendo un ratio de contraste de `7.8:1` (supera ampliamente WCAG AA).
2. **Cabecera Dark:**
   - Se fija el fondo de la cabecera en modo oscuro a `#10141A` (Figma `1:391`) con un sutil borde de delimitación `#252B33`.
3. **Botones e Iconos Primarios:**
   - Tipografía del logo en `#FF9500` con `font-black` coincidente con Figma `8:49`.
   - Ajuste de espaciados táctiles en los botones de especie para alcanzar la pauta de accesibilidad móvil (mínimo 44px de área de interacción).

---

## 2. Modificaciones Concretas por Archivo

### 2.1 En `index.html`:
- Reestructurar el `<header role="banner">`:
  - Barra principal `h-16` con logo y acciones.
  - Barra móvil segmentada `md:hidden` para selector de especie.
  - Mantener los mismos IDs (`species-human`, `species-alien`, `theme-toggle`, `cart-badge-btn`, etc.) para preservar la reactividad intacta de `app.js`.
- En `#checkout-section`: cambiar `sticky top-28` a `static lg:sticky lg:top-28`.
- En `<main id="main-content">`: ajustar `pt-28` a `pt-32 md:pt-28` para acomodar la barra adaptativa.

### 2.2 En `style.css`:
- Ajustar `.badge-count`:
  ```css
  .badge-count {
    background-color: var(--color-secondary); /* #55E16B */
    color: #00390F; /* Verde bosque profundo de alto contraste */
    font-weight: 900;
  }
  ```
- Ajustar token de fondo de cabecera:
  ```css
  :root {
    --color-header-bg: #10141A;
  }
  [data-theme="light"] {
    --color-header-bg: rgba(255, 255, 255, 0.95);
  }
  ```

### 2.3 En `app.js`:
- Verificar que los event listeners y roving tabindex sigan sincronizados con ambos controles de especie (o el contenedor adaptativo), garantizando interoperabilidad al cambiar de tamaño de ventana o girar el dispositivo.

---

## 3. Estrategia de Verificación y DoD
1. **Emulación DevTools en iPhone SE / iPhone 12/14/15 (375px a 390px):**
   - Comprobar que no existe scroll horizontal (`window.innerWidth === document.documentElement.clientWidth`).
   - Comprobar que el logo, el botón de tema y el carrito son 100% visibles.
2. **Prueba de Scroll en Checkout:**
   - Desplazarse por el desglose y continuar hacia el formulario: el desglose no debe flotar sobre el formulario.
3. **Auditoría WCAG AA:**
   - Ratio de contraste del nuevo badge del carrito: `>= 4.5:1`.
   - Accesibilidad por teclado mantenida (Prueba de la Mano Atada).
