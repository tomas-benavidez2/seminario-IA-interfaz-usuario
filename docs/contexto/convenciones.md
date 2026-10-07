# Convenciones de Diseño, Tokens y Accesibilidad

## 1. Tokens de Diseño (Figma: Reto 5)

### Paleta Semántica
| Token | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| `--color-primary` | `#FF9500` | Naranja Medianoche: Botones CTA principales, acentos destacados. |
| `--color-primary-hover` | `#FFB874` | Estado hover/active de botones primarios. |
| `--color-secondary` | `#55E16B` | Albahaca Neón: Badges de categorías, PowerUps, elementos biológicos. |
| `--color-success` | `#02AD3F` | Confirmación de pedido, estados de éxito y alertas positivas. |
| `--color-danger` | `#FFB4AB` / `#E53E3E` | Error de coordenadas, alerta de ingrediente prohibido. |
| `--color-bg-dark` | `#1C2026` | Fondo general en modo Espacio Profundo. |
| `--color-surface-dark` | `#252B33` | Tarjetas de menú, modales y contenedores en modo oscuro. |
| `--color-text-dark` | `#DFE2EB` | Texto primario de alto contraste sobre fondo oscuro. |
| `--color-muted-dark` | `#DBC2AD` | Texto secundario y etiquetas informativas. |
| `--color-bg-light` | `#F8F9FA` | Fondo general en modo Estación Espacial (claro). |
| `--color-surface-light`| `#FFFFFF` | Tarjetas y contenedores en modo claro. |
| `--color-text-light` | `#1A202C` | Texto primario en modo claro. |

### Tipografía
- **Fuente Principal:** `Plus Jakarta Sans`, sans-serif (Google Fonts).
- **Escala:**
  - `H1 / Hero`: `2rem` (32px) - Bold (`font-bold`)
  - `H2 / Sección`: `1.75rem` (28px) - Bold (`font-bold`)
  - `H3 / Tarjeta`: `1.25rem` (20px) - Semibold (`font-semibold`)
  - `Body / Normal`: `1rem` (16px) - Regular / Medium (`font-normal` / `font-medium`)
  - `Caption / Badges`: `0.875rem` (14px) - Semibold / Uppercase

## 2. Los 5 Estados Obligatorios en Controles
Todo elemento interactivo (`<button>`, `<a>`, `<input>`, `<select>`) implementa:
1. **Default:** Visual limpio, contraste mínimo 4.5:1.
2. **Hover:** Variación de luminosidad suave (`hover:brightness-110` o color hover dedicado).
3. **Active:** Efecto táctil (`active:scale-95`).
4. **Focus (`:focus-visible`):** Anillo de enfoque de alto contraste con desplazamiento (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2`).
5. **Disabled:** Visual atenuado (`opacity-50 cursor-not-allowed`) y atributo `disabled` / `aria-disabled="true"`.

## 3. Clases Semánticas y Seguridad WCAG AA
- `.force-text-white`: Asegura que botones de acento o badges mantengan texto blanco legible sin importar el switch de tema.
- `.focus-ring`: Clase utilitaria estandarizada para el anillo de foco por teclado.
- Semántica estricta: Uso exclusivo de `<button>` para acciones y `<a>` para navegación; nunca `<div>` con onClick sin roles ni tabIndex.
