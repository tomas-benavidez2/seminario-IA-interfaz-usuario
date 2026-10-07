# Especificación Funcional: Hero Abierto, Selects Accesibles e Iconografía Sci-Fi (003-ui-polish-icons-hero)

## 1. Propósito y Alcance
Esta especificación aborda la tanda final de refinamientos estéticos, de layout y de usabilidad del proyecto Rocket Pizza Lunar:
1. **Hero Abierto y Ergonómico:** Eliminación del antipatrón de tarjeta dentro de tarjeta ("container inception") en la sección Hero, adoptando un diseño abierto (*Open Canvas Hero*) con distribución en 2 columnas en pantallas de escritorio.
2. **Estilizado Responsivo de Desplegables (`<select>`):** Personalización de los controles de selección de sector y método de pago con `appearance: none`, chevron SVG de precisión y opciones formateadas con alto contraste y sin desbordamiento en dispositivos móviles.
3. **Iconografía Vectorial Sci-Fi Minimalista:** Reemplazo integral de emojis genéricos del sistema por glifos e iconos vectoriales SVG en línea, monocromáticos y dinámicos, consistentes con la paleta de tokens de Figma (*Reto 5*).

---

## 2. Requisitos Funcionales en Sintaxis EARS

### 2.1 Requisitos Ubicuos (Ubiquitous Requirements)
- **REQ-UBI-01 (Iconografía Vectorial Consistente):** El sistema deberá emplear exclusivamente iconos vectoriales SVG en línea con trazo geométrico minimalista (1.5px a 2px), utilizando `currentColor` o las variables de tokens (`--color-primary`, `--color-secondary`), eliminando emojis estándar de texto.
- **REQ-UBI-02 (Estilizado de Controles Desplegables):** El sistema deberá presentar todos los elementos `<select>` con indicador chevron SVG personalizado, fondo semántico y elementos `<option>` estilizados que respeten el tema activo (claro u oscuro).

### 2.2 Requisitos Basados en Estados (State-driven Requirements)
- **REQ-STD-01 (Hero Layout en Desktop):** Mientras el ancho de pantalla sea igual o superior a `1024px` (`lg:`), el Hero deberá renderizarse en una cuadrícula de dos columnas: contenido principal a la izquierda y panel HUD de bioseguridad integrado a la derecha, sin bordes de tarjeta duplicados.
- **REQ-STD-02 (Hero Layout en Mobile):** Mientras el ancho de pantalla sea inferior a `1024px`, el Hero deberá apilar verticalmente sus elementos de forma limpia sobre el lienzo principal.

### 2.3 Requisitos de Comportamiento No Deseado (Unwanted Behavior Requirements)
- **REQ-UNW-01 (Prohibición de Desbordamiento en Desplegables):** Si un usuario despliega cualquier `<select>` en un dispositivo móvil con viewport de 360px a 390px, el menú de opciones no deberá sobrepasar los límites de la pantalla ni generar desplazamiento horizontal.

---

## 3. Criterios de Aceptación Observables

| Identificador | Criterio de Aceptación | Método de Verificación Observable |
| :--- | :--- | :--- |
| **CA-P01** | **Hero sin Tarjeta Anidada** | La sección Hero carece de borde de tarjeta envolvente repetido; el panel `#hero-bio-banner` se integra como un HUD aeroespacial sin dar sensación de "caja dentro de caja". |
| **CA-P02** | **Hero en 2 Columnas Desktop** | En resoluciones >= 1024px, el texto y CTA ocupan la columna izquierda (7/12) y el panel biomédico la columna derecha (5/12), con balance visual Gestalt. |
| **CA-P03** | **Desplegables Estilizados y sin Overflow** | Los `<select>` exhiben chevron SVG y opciones estilizadas con fondo oscuro `#252B33` en Dark mode; ninguna opción desborda en 360px. |
| **CA-P04** | **Iconos SVG Sci-Fi Integrados** | Logo, botones de especie, ingredientes, carrito y avisos utilizan SVGs minimalistas y accesibles con atributos `aria-hidden="true"`. |
