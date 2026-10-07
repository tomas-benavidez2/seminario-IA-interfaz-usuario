# Lista de Tareas: Refinamiento Mobile y Fidelidad Figma (002-mobile-figma-refinement)

## Resumen del Plan de Tareas
Esta hoja de ruta define 3 tareas atómicas para que el rol **Implementer** ejecute las correcciones solicitadas por el Director Técnico, cumpliendo la fidelidad al Figma *Reto 5*, eliminando el desbordamiento horizontal en móviles y evitando la superposición de elementos con `sticky`.

---

## [x] T1: Reestructuración Responsiva del Header Móvil (Figma 1:391)
- **Estado:** Completada y Verificada.
- **Objetivo:** Adaptar la cabecera fija para que en viewports móviles (< 768px) no sufra recortes ni desbordamiento horizontal, presentando la barra superior de 64px y el selector de especie ergonómico.
- **Archivos a modificar por Implementer:** `index.html`, `style.css`.
- **Descripción detallada:**
  1. En `index.html`, reestructurar `<header role="banner">`:
     - Fila superior (`h-16` / 64px): Logotipo a la izquierda (`Rocket Pizza` en `#FF9500`) y bloque de acciones a la derecha (Switch de tema `#theme-toggle` y Carrito `#cart-badge-btn`).
     - Selector de especie (`role="radiogroup"`): en pantallas móviles (< 768px), situarlo en una franja sub-header compacta y accesible inmediatamente inferior; en pantallas medianas/grandes (`md:` en adelante), integrarlo en la fila principal entre el logo y las acciones.
  2. En `<main id="main-content">`, ajustar el espaciado superior a `pt-32 md:pt-28` para compensar la barra adaptativa en móvil.
- **Criterios de Aceptación (Observables):**
  - **CA-T1.1:** En pantallas de 360px a 390px, el logo, el botón de tema y el carrito son 100% visibles y accesibles en la barra superior sin corte en el lateral derecho.
  - **CA-T1.2:** El selector de especie es plenamente operable por teclado y touch en dispositivos móviles sin desbordar el ancho de pantalla.

---

## [x] T2: Eliminación de Sticky en Desglose de Costos en Mobile
- **Estado:** Completada y Verificada.
- **Objetivo:** Evitar que la tarjeta de desglose de costos quede fija y flote tapando el formulario de checkout durante el scroll en dispositivos móviles.
- **Archivos a modificar por Implementer:** `index.html`.
- **Descripción detallada:**
  1. En `index.html`, localizar la columna del desglose de costos (línea ~786):
     ```html
     <div role="region" aria-label="Desglose del Pedido" class="lg:col-span-5 p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl sticky top-28">
     ```
  2. Modificar la clase `sticky top-28` para que sea condicional al breakpoint de escritorio:
     ```html
     class="lg:col-span-5 p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl static lg:sticky lg:top-28"
     ```
- **Criterios de Aceptación (Observables):**
  - **CA-T2.1:** En vista móvil (< 1024px), al hacer scroll hacia el formulario de checkout, el desglose de precios fluye normalmente y desaparece por arriba sin tapar los campos de telemetría.
  - **CA-T2.2:** En vista de escritorio (>= 1024px), el desglose conserva su comportamiento adhesivo (`lg:sticky lg:top-28`) acompañando al usuario mientras completa el formulario.

---

## [x] T3: Calibración de Tokens y Badges según Figma (Reto 5)
- **Estado:** Completada y Verificada.
- **Objetivo:** Reflejar con fidelidad 1:1 los colores y estilos del prototipo de Figma en `style.css`.
- **Archivos a modificar por Implementer:** `style.css`, `index.html`.
- **Descripción detallada:**
  1. En `style.css`, actualizar el badge del carrito (`.badge-count`):
     - Fondo: `var(--color-secondary)` (`#55E16B` "Albahaca Neón", según Figma `1:399`).
     - Color de texto: `#00390F` (verde profundo de alto contraste, ratio > 7.5:1).
  2. En `style.css`, establecer el color de fondo de la barra de navegación en modo oscuro a `#10141A` (Figma `1:391`).
  3. Asegurar que las clases de salvaguarda de contraste (`.force-text-dark` y `.force-text-white`) se mantengan armónicas con la paleta de Figma.
- **Criterios de Aceptación (Observables):**
  - **CA-T3.1:** El badge del carrito muestra el fondo verde neón `#55E16B` con texto `#00390F`, idéntico a Figma.
  - **CA-T3.2:** La cabecera en modo oscuro utiliza `#10141A`, mejorando la ambientación espacial y la fidelidad estética.
