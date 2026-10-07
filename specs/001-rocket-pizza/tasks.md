# Lista de Tareas de Implementación: Rocket Pizza (001-rocket-pizza)

## Resumen del Plan de Tareas
Esta hoja de ruta establece 5 tareas atómicas y secuenciales (T1 a T5) diseñadas para que el rol **Implementer** construya la SPA interactiva sin romper los principios de Spec-Driven Development (SDD), cubriendo los 5 estados en cada control, la prueba de la mano atada y el cumplimiento estricto de WCAG AA.

---

## [x] T1: Maquetado Semántico Base en `index.html` y Sistema de Tokens en `style.css` (Completada)
- **Estado:** Completada y Verificada.
- **Objetivo:** Construir la estructura DOM semántica completa y la base de estilos con tokens CSS y los 5 estados interactivos.
- **Archivos a modificar por Implementer:** `index.html`, `style.css`.
- **Descripción detallada:**
  1. En `index.html`, crear la estructura semántica:
     - `<header>` con logotipo de Rocket Pizza, selector de especie (`role="radiogroup"`), botón de switch de tema (`id="theme-toggle"`, `aria-label`, `aria-pressed`) y badge del carrito.
     - `<main>` con sección Hero de bienvenida, configurador de pizza (`#builder`) con grupos accesibles para tamaño, masa, catálogo de ingredientes y panel de PowerUps.
     - Sección de resumen y checkout (`#checkout-section`) con tabla de desglose de precios y formulario de entrega lunar (`<form id="order-form">`).
     - Elementos `<dialog>` para el modal de advertencia biológica (`#modal-bio-alert`) y modal de confirmación (`#modal-order-success`).
  2. En `style.css`, declarar las variables de tokens (`:root` y `[data-theme="light"]`) según `convenciones.md`.
  3. Definir estilos para los 5 estados obligatorios en botones, inputs y tarjetas interactivas:
     - **Default:** Contraste mínimo 4.5:1.
     - **Hover:** Luminosidad y feedback de cursor.
     - **Active:** `scale-95` / microinteracción física.
     - **Focus:** `:focus-visible` con anillo `ring-2 ring-amber-400 ring-offset-2`.
     - **Disabled:** `opacity-50`, `cursor-not-allowed`.
  4. Implementar `.force-text-dark` (`#1A202C`) para salvaguardar el contraste en botones primarios naranjas (`#FF9500`).
- **Criterios de Aceptación (Observables):**
  - **CA-T1.1:** Al cargar `index.html` en el navegador, la página se renderiza sin errores de consola, con tipografía `Plus Jakarta Sans` y layout responsivo.
  - **CA-T1.2:** Todos los botones y tarjetas muestran visiblemente sus 5 estados interactivos al pasar el cursor, hacer clic, navegar con `Tab` o asignarles el atributo `disabled`.
  - **CA-T1.3:** La auditoría de contraste sobre los botones naranjas primarios valida un ratio >= 4.5:1 (texto oscuro `#1A202C`).

---

## [x] T2: Motor de Estado (`Store`), Sistema de Temas (`ThemeManager`) y Persistencia en `localStorage` (Completada)
- **Estado:** Completada y Verificada.
- **Objetivo:** Implementar la base de JavaScript modular para gestión reactiva de datos, persistencia local y soporte de temas visuales accesibles.
- **Archivos a modificar por Implementer:** `app.js`.
- **Descripción detallada:**
  1. Implementar la clase o módulo `Store` con el estado global: especie (`human` / `alien`), tamaño, masa, ingredientes seleccionados, powerup, datos del cliente y tema activo.
  2. Implementar `StorageManager` para guardar y restaurar `rocket_pizza_cart` y `rocket_pizza_theme` de forma segura con bloques `try...catch`.
  3. Implementar `ThemeManager` conectado al botón `#theme-toggle`:
     - Al alternar, conmuta `data-theme="light"` o `data-theme="dark"` en `<html>` o `<body>`.
     - Actualiza el atributo `aria-pressed` e icono SVG del botón.
     - Guarda la preferencia en `localStorage`.
  4. Al iniciar la aplicación (`DOMContentLoaded`), restaurar tema y carrito guardados.
- **Criterios de Aceptación (Observables):**
  - **CA-T2.1:** Al presionar `Enter` o hacer clic en el botón de tema, la interfaz cambia instantáneamente entre Espacio Profundo (Dark) y Estación Espacial (Light).
  - **CA-T2.2:** Al recargar la página (F5), la aplicación conserva el tema y estado previamente seleccionados.
  - **CA-T2.3:** El cambio de tema mantiene los contrastes WCAG AA sin dejar textos ilegibles o invisibles.

---

## [x] T3: Selector de Especie, Catálogo Dinámico de Ingredientes y BioValidator con Modal WAI-ARIA (Completada)
- **Objetivo:** Conectar la reactividad de la especie con el catálogo de ingredientes, validando incompatibilidades toxicológicas mediante un modal accesible con captura de foco.
- **Archivos a modificar por Implementer:** `app.js`, `index.html`.
- **Descripción detallada:**
  1. Conectar los controles de especie (Humano 👫 / Alien Zogtoniano 👽) para despachar la acción `setSpecies` en el Store.
  2. Implementar `BioValidator` con la matriz de toxicidad:
     - Ingredientes tóxicos para humanos: *Roca Espacial*, *Bebida Metano*, *Cristales de Plasma*.
     - Ingredientes seguros para humanos y alienígenas: *Muzzarella Lunar*, *Pepperoni Galáctico*, etc.
  3. Implementar `A11yModalManager`:
     - Función `openModal(modalId)` y `closeModal(modalId)`.
     - Captura de foco (**Focus Trap**): Al presionar `Tab` dentro del modal, el foco no sale del diálogo.
     - Presionar tecla `Escape` cierra el modal.
     - Al cerrar, restaura el foco al elemento interactivo que disparó la acción (`lastFocusedElement.focus()`).
  4. Al intentar seleccionar un ingrediente tóxico para la especie activa, interceptar la adición, evitar que se marque el checkbox/botón y abrir el `#modal-bio-alert`.
- **Criterios de Aceptación (Observables):**
  - **CA-T3.1:** Estando en modo "Humano", al intentar agregar "Roca Espacial" o "Bebida Metano", se detiene la adición y se abre inmediatamente el modal de "INGREDIENTE PROHIBIDO".
  - **CA-T3.2:** Dentro del modal, la navegación con `Tab` cicla únicamente entre los controles del modal y al presionar `Esc` se cierra automáticamente.
  - **CA-T3.3:** Tras cerrar el modal, el foco del teclado regresa con precisión a la tarjeta del ingrediente que disparó la alerta.

---

## [x] T4: PricingEngine, Panel de PowerUps Celulares y Descuento del 50% Zogtoniano (Completada)
- **Objetivo:** Calcular dinámicamente los costos en Créditos Lunares (`LC`), aplicar la regla de bonificación extraterrestre del 50% y gestionar los PowerUps biológicos.
- **Archivos a modificar por Implementer:** `app.js`.
- **Descripción detallada:**
  1. Implementar el módulo `PricingEngine`:
     - Precios base por tamaño: Personal (8 LC), Mediana (12 LC), Familiar (16 LC), Interestelar (22 LC).
     - Costos individuales por ingrediente adicional (+1.5 a +4.5 LC).
     - Cálculo de descuento: Si `species === 'alien'`, aplicar 50% de descuento en el valor base de la pizza.
  2. Gestionar la sección de **PowerUps Celulares**:
     - Ocultar o deshabilitar visual y funcionalmente cuando `species === 'human'`.
     - Mostrar y permitir selección cuando `species === 'alien'` (+30% en 15m: 3 LC, +50% en 30m: 5 LC, +80% en 45m: 8 LC).
  3. Renderizar dinámicamente el desglose de precios en el panel de resumen: Subtotal, Bonificación Alien (en verde destacado), Ingredientes, PowerUp y Total en Créditos Lunares.
- **Criterios de Aceptación (Observables):**
  - **CA-T4.1:** Al conmutar de Humano a Alien Zogtoniano, el precio base de la pizza muestra explícitamente el descuento del 50% y el total disminuye en tiempo real.
  - **CA-T4.2:** El panel de PowerUps es inaccesible para humanos y completamente operable para Zogtonianos, sumando su costo al total.
  - **CA-T4.3:** Al agregar o remover cualquier ingrediente compatible, el total se actualiza instantáneamente en pantalla.

---

## [x] T5: Formulario de Checkout Lunar, Modal de Confirmación y Certificación de la Prueba de la Mano Atada (Completada)
- **Estado:** Completada y lista para Auditoría de Verificación.
- **Objetivo:** Validar el formulario de lanzamiento espacial, desplegar el modal de confirmación y certificar la operabilidad total mediante teclado.
- **Archivos a modificar por Implementer:** `app.js`, `index.html`.
- **Descripción detallada:**
  1. Implementar validación accesible para el formulario `#order-form`:
     - Campos obligatorios: Nombre de Piloto, Sector Lunar, Coordenadas Espaciales (patrón regex: `SEC-XX-YYY`).
     - Si hay errores, mostrar mensaje en contenedor con `role="alert"` y mover el foco al primer campo inválido.
  2. Al validar exitosamente el envío:
     - Generar voucher de orden espacial aleatorio (ej. `#LUNAR-7749`).
     - Calcular tiempo de entrega estimado (ej. 15-25 minutos terrestres).
     - Abrir el Modal de Confirmación `#modal-order-success` con resumen completo.
     - Permitir reiniciar el configurador para un nuevo pedido mediante botón accesible.
  3. Ejecutar la **Prueba de la Mano Atada** integral:
     - Verificar que un usuario puede configurar una pizza completa, disparar la alerta de ingrediente prohibido, corregirla, completar el formulario y confirmar la orden utilizando **únicamente el teclado** (`Tab`, `Shift+Tab`, `Enter`, `Espacio`, `Esc`).
- **Criterios de Aceptación (Observables):**
  - **CA-T5.1:** Formulario rechaza envíos vacíos o coordenadas con formato incorrecto, alertando al usuario y enfocando el campo respectivo.
  - **CA-T5.2:** Al completar el formulario válido y pulsar "Lanzar Pedido al Espacio", se abre el Modal WAI-ARIA de Confirmación con el voucher y resumen de la orden.
  - **CA-T5.3:** Prueba de la Mano Atada exitosa: Toda la experiencia es 100% navegable y accionable por teclado sin necesidad de mouse, cumpliendo con la rúbrica WCAG AA.
