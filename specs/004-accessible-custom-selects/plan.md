# Plan Técnico de Implementación: Selectores Desplegables WAI-ARIA (004-accessible-custom-selects)

## 1. Arquitectura Técnica

### 1.1 Estructura Semántica en `index.html`
Sustituir los `<select>` nativos por el patrón estándar **WAI-ARIA Combobox / Listbox**:
1. **Contenedor `.custom-combobox`:** Relativo, ancho del 100% (`w-full`), conteniendo el input de sincronización, el botón disparador y el menú flotante.
2. **Campo de Sincronización `<input type="hidden">`:**
   - Mantiene los identificadores `id="lunar-sector"` y `id="payment-method"` para que `OrderFormManager.validate()` y `store.setCustomerData()` lean sus valores sin alterar una sola línea de lógica de negocio.
3. **Botón Disparador `<button role="combobox">`:**
   - Atributos: `aria-haspopup="listbox"`, `aria-expanded="false"`, `aria-controls="[id]-listbox"`.
   - Clases: `.combobox-trigger w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-sm font-medium focus-ring flex items-center justify-between text-left`.
   - Muestra el texto de la opción activa y el chevron SVG naranja que rota 180° al abrirse.
4. **Menú de Opciones `<ul role="listbox">`:**
   - Posicionamiento: `absolute left-0 right-0 top-full mt-1.5 z-30`.
   - Clases: `.combobox-menu hidden rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-2xl max-h-60 overflow-y-auto space-y-1 p-1.5`.
   - Ancho: Confinado estrictamente a `w-full` del contenedor; no puede desbordar la pantalla en ningún dispositivo.
5. **Ítems `<li role="option">`:**
   - Atributos: `aria-selected="false"` (o `"true"` si está activo), `data-value="[valor]"`.
   - Clases: `.combobox-option px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium cursor-pointer transition-all flex items-center justify-between hover:bg-[var(--color-surface-hover)]`.
   - Checkmark SVG verde (`#55E16B`) visible únicamente en la opción seleccionada.

---

### 1.2 Estilos y 5 Estados en `style.css`
- **Estados del Disparador (`.combobox-trigger`):**
  1. *Default:* Fondo `var(--color-bg)`, borde `var(--color-border)`.
  2. *Hover:* Borde `var(--color-primary-hover)`.
  3. *Active:* Borde `var(--color-primary)`.
  4. *Focus (`:focus-visible`):* Anillo de alto contraste `ring-2 ring-amber-400 ring-offset-2`.
  5. *Invalid (`.is-invalid`):* Borde `var(--color-danger)` y anillo de foco rojo.
- **Rotación de Chevron:**
  - `.combobox-trigger[aria-expanded="true"] .chevron-icon { transform: rotate(180deg); }`
- **Menú y Opciones (`.combobox-menu`, `.combobox-option`):**
  - Fondo `var(--color-surface)` (`#252B33` en Dark, `#FFFFFF` en Light).
  - Estado activo/hover: `background-color: var(--color-surface-hover)` y color `var(--color-primary)`.
  - Opción seleccionada (`[aria-selected="true"]`): fondo sutil de acento y checkmark visible.

---

### 1.3 Controlador Modular en `app.js` (`CustomComboboxManager`)
- **Gestión de Eventos:**
  - Click en disparador: alterna `aria-expanded` y clase `.hidden` en el menú.
  - Click en opción: actualiza el input hidden, cambia el texto del disparador, actualiza `aria-selected` y checkmarks, cierra el menú y despacha evento `change` e `input`.
  - Click fuera del combobox: cierra automáticamente cualquier menú abierto.
- **Navegación por Teclado (Prueba de la Mano Atada):**
  - En disparador: `Enter`, `Espacio`, `ArrowDown` o `ArrowUp` abren el menú y mueven el foco a la primera opción.
  - En menú / opciones:
    - `ArrowDown` / `ArrowUp`: ciclan entre opciones.
    - `Enter` / `Espacio`: seleccionan la opción activa, actualizan el valor y devuelven el foco al disparador.
    - `Escape`: cierra el menú y devuelve el foco al disparador sin alterar la selección previa.
    - `Tab`: cierra el menú y permite continuar la navegación natural del formulario.

---

## 2. Estrategia de Pruebas
1. **Emulación DevTools en 360px (Android) y 390px (iPhone):**
   - Abrir ambos comboboxes y comprobar que el menú queda 100% contenido en el formulario (`scrollWidth === innerWidth`).
2. **Prueba de Teclado:**
   - Completar el formulario usando solo `Tab`, flechas del cursor, `Enter` y `Espacio`.
3. **Prueba de Envío:**
   - Validar que al enviar vacío se marque error en `#lunar-sector`, y que al seleccionar una opción se limpie el error y se genere el voucher `#LUNAR-XXXX`.
