# Plan de Implementación Técnica: Rocket Pizza (001-rocket-pizza)

## 1. Visión General de la Arquitectura de Archivos

La solución se estructura bajo una arquitectura SPA modular y desacoplada en tres capas independientes:

```
├── index.html       # Estructura semántica, accesibilidad WAI-ARIA y maquetado de vistas
├── style.css        # Tokens de diseño, 5 estados interactivos, variables CSS y salvaguardas de contraste
└── app.js           # Lógica modular: Store reactivo, BioValidator, PricingEngine, ThemeManager y A11yModalManager
```

---

## 2. Desglose Estructural de Componentes en `index.html`

### 2.1 Header y Navegación Principal (`<header role="banner">`)
- **Logo y Marca:** Enlace accesible o heading con isotipo de cohete y tipografía `Plus Jakarta Sans`.
- **Selector de Especie (`role="radiogroup"` o segmented button group):**
  - Botón Humano (`aria-checked="true"`, `data-species="human"`): Icono 👫 y texto "Humano".
  - Botón Alien Zogtoniano (`aria-checked="false"`, `data-species="alien"`): Icono 👽 y texto "Alien Zogtoniano (-50%)".
- **Theme Switcher (`<button id="theme-toggle">`):**
  - Atributos: `aria-label="Alternar entre tema Espacio Profundo y Estación Espacial"`, `aria-pressed="false"`.
  - Iconos SVG inline de Sol / Luna con animación suave.
- **Badge del Carrito Lunar:** Botón de anclaje rápido al resumen con contador reactivo de ingredientes y `aria-label`.

### 2.2 Hero y Contexto de Especie (`<section aria-labelledby="hero-title">`)
- Encabezado dinámico (`<h1>`) que saluda según la especie activa:
  - Humano: *"Pizzas Terrestres Tradicionales con Entrega Orbital"*.
  - Alien Zogtoniano: *"Bienvenido Zogtoniano: Aplica tu 50% de Descuento Galáctico"*.
- Banner informativo con advertencia de biocompatibilidad y políticas de entrega en órbita.

### 2.3 Configurador de Pizza Espacial (`<section id="builder">`)
- **Tamaños (`role="radiogroup" aria-labelledby="size-label"`):**
  - Opciones: Personal (8 LC), Mediana (12 LC), Familiar (16 LC), Interestelar (22 LC).
  - Implementado mediante `<button role="radio">` con indicadores de selección accesibles.
- **Tipo de Masa / Base:**
  - Opciones: Fina Lunar, Volcánica (Picante), Polvo Estelar (Bio-crujiente).
- **Catálogo de Ingredientes (`<div role="group" aria-labelledby="ingredients-label">`):**
  - Tarjetas de ingredientes con checkbox nativo o botón de alternancia (`aria-pressed`):
    - *Ingredientes Terrestres:* Muzzarella Lunar (+2 LC), Pepperoni Galáctico (+3 LC), Bacon Cósmico (+3 LC), Provolone de Asteroide (+2.5 LC), Morrón de Marte (+1.5 LC), Aceitunas de Ganímedes (+1.5 LC).
    - *Ingredientes Zogtonianos / Cósmicos:* Roca Espacial (+4 LC), Bebida Metano (+3.5 LC), Salsa Solar (+2 LC), Cristales de Plasma (+4.5 LC).
  - Badge visual de biocompatibilidad (compatible / advertencia de toxicidad).
- **Panel de PowerUps Celulares Alienígenas (`<section id="powerup-panel">`):**
  - Visible y habilitado exclusivamente cuando la especie activa es *Alien Zogtoniano*.
  - Opciones:
    - *Regeneración Nivel 1:* +30% en 15 min (+3 LC).
    - *Regeneración Nivel 2:* +50% en 30 min (+5 LC).
    - *Regeneración Nivel 3:* +80% en 45 min (+8 LC).

### 2.4 Panel de Resumen y Checkout Lunar (`<section id="checkout-section">`)
- **Desglose de Costos (`<div role="region" aria-label="Desglose del Pedido">`):**
  - Fila Base & Tamaño.
  - Fila Descuento Alien (50% OFF en verde destacado con indicador visual).
  - Fila Ingredientes seleccionados.
  - Fila PowerUp Celular (si aplica).
  - Fila Total destacado en Créditos Lunares (`LC`).
- **Formulario de Entrega (`<form id="order-form" novalidate>`):**
  - Input: Nombre del Piloto / Cliente (`<input id="pilot-name" required>`).
  - Input: Sector Lunar / Estación Orbital (`<select id="lunar-sector" required>`).
  - Input: Coordenadas Espaciales (`<input id="orbital-coords" placeholder="SEC-04-ALPHA" pattern="[A-Z]{3}-\\d{2}-[A-Z]+" required>`) con texto de ayuda y `aria-describedby="coords-help"`.
  - Método de Pago: Créditos Lunares, Cripto Nova, Vales de la Flota.
  - Contenedor de Alertas de Validación (`<div id="form-errors" role="alert" aria-live="polite">`).
  - Botón CTA Primario: `<button type="submit" id="btn-submit-order" class="btn-primary">` ("Lanzar Pedido al Espacio").

### 2.5 Modales Accesibles (WAI-ARIA Dialogs)
- **Modal 1: Alerta de Ingrediente Prohibido (`<dialog id="modal-bio-alert" role="alertdialog">`):**
  - Contenedor con `aria-modal="true"`, `aria-labelledby="alert-title"`, `aria-describedby="alert-desc"`.
  - Icono de peligro biológico, mensaje de incompatibilidad toxicológica, botón de confirmación ("Entendido, preservar mi salud") y botón de cierre (`aria-label="Cerrar advertencia"`).
- **Modal 2: Confirmación de Pedido Lunar (`<dialog id="modal-order-success" role="dialog">`):**
  - Contenedor con `aria-modal="true"`, `aria-labelledby="success-title"`.
  - Resumen detallado de la orden, número de voucher espacial, tiempo estimado de entrega orbital y botón "Configurar nuevo pedido".

---

## 3. Tokens y Arquitectura de Estilos en `style.css`

### 3.1 Definición de Variables CSS y Tematización Dinámica
```css
:root {
  /* Paleta Base (Modo Espacio Profundo / Dark) */
  --color-primary: #FF9500;
  --color-primary-hover: #FFB874;
  --color-secondary: #55E16B;
  --color-success: #02AD3F;
  --color-danger: #E53E3E;
  --color-danger-subtle: #FFB4AB;
  
  --color-bg: #1C2026;
  --color-surface: #252B33;
  --color-surface-hover: #2F3640;
  --color-border: #38414D;
  --color-text: #DFE2EB;
  --color-text-muted: #DBC2AD;
  --color-text-on-primary: #1A202C; /* Salvaguarda WCAG AA: texto oscuro sobre naranja */

  /* Tipografía */
  --font-family-base: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  
  /* Elevación y Efectos */
  --focus-ring-color: #FBBF24; /* Amber 400 */
  --focus-ring-offset: #1C2026;
}

[data-theme="light"] {
  /* Paleta Estación Espacial (Light) */
  --color-bg: #F8F9FA;
  --color-surface: #FFFFFF;
  --color-surface-hover: #F1F3F5;
  --color-border: #E2E8F0;
  --color-text: #1A202C;
  --color-text-muted: #4A5568;
  --color-text-on-primary: #1A202C;
  --focus-ring-offset: #FFFFFF;
}
```

### 3.2 Implementación Rigurosa de los 5 Estados Interactivos

Cada elemento interactivo debe implementar y auditar los siguientes estados:

| Estado | Selector CSS / Clases Tailwind Equivalentes | Comportamiento Visual |
| :--- | :--- | :--- |
| **1. Default** | `.btn-primary`, `.btn-secondary`, `.card-option` | Superficie limpia, contraste mínimo 4.5:1 verificado. |
| **2. Hover** | `:hover` (cuando no está deshabilitado) | Incremento de brillo (`filter: brightness(1.1)`) o cambio de fondo dedicado (`--color-primary-hover`). |
| **3. Active** | `:active` | Microinteracción de compresión (`transform: scale(0.96)`). |
| **4. Focus** | `:focus-visible` | Anillo nítido de 2px sólido (`outline: none; box-shadow: 0 0 0 2px var(--focus-ring-offset), 0 0 0 4px var(--focus-ring-color)`). |
| **5. Disabled** | `:disabled`, `[aria-disabled="true"]` | `opacity: 0.5; cursor: not-allowed; pointer-events: none;` |

### 3.3 Clases Semánticas y Salvaguardas de Contraste
- `.force-text-dark`: Aplica `color: #1A202C !important; font-weight: 700;` en botones naranjas primarios, garantizando un ratio de contraste de `5.2:1` sobre `#FF9500`.
- `.force-text-white`: Para insignias y chips de fondo oscuro o verde que requieran texto blanco estricto.
- `.focus-ring`: Regla universal aplicada a todos los controles para asegurar el cumplimiento del criterio WCAG 2.4.7.
- `.modal-backdrop`: Overlay semitransparente con `backdrop-filter: blur(4px); background-color: rgba(0, 0, 0, 0.7);`.

---

## 4. Módulos y Flujo Lógico en `app.js`

### 4.1 Módulo `Store` (Gestor de Estado Centralizado)
- **Estructura del Estado:**
  ```javascript
  const state = {
    species: 'human', // 'human' | 'alien'
    size: 'medium',   // 'personal' | 'medium' | 'large' | 'interstellar'
    crust: 'thin',    // 'thin' | 'volcanic' | 'stardust'
    ingredients: [],  // Array de IDs de ingredientes seleccionados
    powerUp: null,    // null | 'regen1' | 'regen2' | 'regen3'
    customer: {
      pilotName: '',
      sector: '',
      coords: ''
    },
    paymentMethod: 'credits',
    theme: 'dark'     // 'dark' | 'light'
  };
  ```
- **Métodos:**
  - `getState()`, `setSpecies(species)`, `setSize(size)`, `setCrust(crust)`, `toggleIngredient(id)`, `setPowerUp(id)`, `setCustomerData(data)`, `resetOrder()`.
  - `subscribe(listener)`: Notifica a los controladores de la vista ante cualquier mutación.

### 4.2 Módulo `BioValidator` (Guardia de Biocompatibilidad)
- **Matriz de Ingredientes:**
  - `human-safe`: Muzzarella, Pepperoni, Bacon, Provolone, Morrón, Aceitunas.
  - `alien-safe`: Roca Espacial, Bebida Metano, Salsa Solar, Cristales de Plasma.
  - `toxic-for-human`: `['space-rock', 'methane-drink', 'plasma-crystals']`.
  - `toxic-for-alien`: `[]` (los Zogtonianos pueden consumir casi todo, excepto combinaciones saturadas terrestres según la regla del seminario).
- **Método `isCompatible(species, ingredientId)`:**
  - Evalúa la biocompatibilidad. Si es incompatible, devuelve `{ allowed: false, reason: 'Toxicidad biológica crítica detectada.' }`.
- **Intercepción de Eventos:** Si `allowed === false`, cancela la mutación del Store e invoca de inmediato a `A11yModalManager.openBioAlert(ingredient)`.

### 4.3 Módulo `PricingEngine` (Motor Financiero Galáctico)
- **Lógica de Cálculo:**
  ```javascript
  function calculatePricing(currentState) {
    const basePrices = { personal: 8, medium: 12, large: 16, interstellar: 22 };
    let base = basePrices[currentState.size] || 12;
    
    // Descuento Alien: 50% de bonificación en base
    const discount = currentState.species === 'alien' ? base * 0.5 : 0;
    const baseWithDiscount = base - discount;
    
    // Costo de ingredientes
    const ingredientsCost = currentState.ingredients.reduce((acc, id) => acc + getIngredientPrice(id), 0);
    
    // Costo de PowerUp (sólo aliens)
    const powerUpCost = currentState.species === 'alien' && currentState.powerUp ? getPowerUpPrice(currentState.powerUp) : 0;
    
    const total = baseWithDiscount + ingredientsCost + powerUpCost;
    return { base, discount, ingredientsCost, powerUpCost, total };
  }
  ```

### 4.4 Módulo `A11yModalManager` (Control Accesible WAI-ARIA)
- **Gestión de Foco:**
  - Guarda `lastFocusedElement = document.activeElement`.
  - Al abrir: Asigna `aria-hidden="true"` al `<main>` y `<header>`, retira el atributo `hidden` del `<dialog>`, y enfoca el primer control operable (o el botón de confirmación).
  - **Focus Trap:** Escucha eventos `keydown` en el modal:
    - Si `key === 'Tab'`: intercepta si se desborda del último o primer elemento enfocable y redirige el foco.
    - Si `key === 'Escape'`: llama a `closeModal()`.
  - Al cerrar: Oculta el modal, restaura accesibilidad del `<main>`, y devuelve el foco mediante `lastFocusedElement.focus()`.

### 4.5 Módulo `ThemeManager` (Gestión de Temas Dual)
- Lee la preferencia persistida en `localStorage.getItem('rocket_pizza_theme')` o `window.matchMedia('(prefers-color-scheme: dark)')`.
- Aplica el atributo `data-theme="dark"` o `data-theme="light"` en `document.documentElement`.
- Actualiza el estado visual del botón y `aria-pressed`.

### 4.6 Módulo `StorageManager` (Persistencia Segura)
- Guarda y recupera `rocket_pizza_cart` y `rocket_pizza_theme`.
- Envoltorio con bloques `try...catch` para evitar caídas si el almacenamiento local está deshabilitado o corrompido.

---

## 5. Estrategia de Accesibilidad WCAG AA y Prueba de la Mano Atada

### 5.1 Criterios de Éxito WCAG 2.1 AA a Cumplir
1. **1.4.3 Contraste Mínimo:** Todos los elementos de texto presentan ratio >= 4.5:1. Los botones primarios naranja (`#FF9500`) usan texto oscuro (`#1A202C`, ratio 5.2:1).
2. **2.1.1 Teclado:** Toda funcionalidad interactiva (cambio de especie, selección de ingredientes, conmutación de tema, checkout, apertura y cierre de modales) es operable con `Tab`, `Shift+Tab`, `Enter`, `Espacio` y `Esc`.
3. **2.1.2 Sin Trampas de Foco:** En la vista principal el foco fluye libremente; en modales el foco se contiene deliberadamente (Focus Trap intencional) y se libera con `Esc`.
4. **2.4.7 Foco Visible:** Anillo de foco accesible claramente delineado en todos los componentes interactivos.
5. **3.3.1 y 3.3.2 Identificación de Errores y Etiquetas:** Todos los campos de formulario cuentan con `<label for="...">` explícitos y mensajes de error asociados mediante `aria-describedby` y `role="alert"`.
6. **4.1.2 Nombre, Función, Valor:** Uso de botones con nombres accesibles, estados declarados con `aria-pressed`, `aria-checked` y roles semánticos nativos.

### 5.2 Protocolo de la Prueba de la Mano Atada (Keyboard-Only Test)
El operador debe poder ejecutar el siguiente flujo completo utilizando únicamente el teclado:
1. `Tab` hasta el switch de tema -> `Enter` (cambia a Light).
2. `Tab` hasta el switch de tema -> `Enter` (cambia a Dark).
3. `Tab` hasta selector de especie -> `Enter` o Flechas (cambia a Alien Zogtoniano).
4. `Tab` por los tamaños de pizza -> `Espacio` para seleccionar "Interestelar".
5. `Tab` por ingredientes -> Seleccionar ingredientes con `Espacio`.
6. `Tab` hasta un ingrediente incompatible si se cambia a humano -> `Espacio` -> Se abre modal -> `Tab` al botón "Entendido" -> `Enter` (se cierra y foco vuelve al ingrediente).
7. `Tab` por formulario de checkout -> Llenar datos con teclado.
8. `Tab` hasta "Lanzar Pedido al Espacio" -> `Enter` -> Se abre modal de confirmación -> `Esc` para cerrar.
