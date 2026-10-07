# Especificación Funcional: Refinamiento Mobile y Fidelidad Figma (002-mobile-figma-refinement)

## 1. Propósito y Diagnóstico del Problema
Tras la auditoría visual y funcional en dispositivos móviles (viewports de 360px a 390px, coincidentes con el frame base de Figma `390x890` de iPhone), se detectaron tres inconsistencias críticas de experiencia de usuario y fidelidad de diseño:

1. **Corte y Desbordamiento Horizontal del Header en Mobile:**
   - La cabecera actual ubica el logotipo, el selector de especie completo y los botones de acción (tema y carrito) en una única fila flexible (`flex items-center justify-between`).
   - El ancho total requerido excede los 500px, provocando que en pantallas móviles la mitad derecha quede cortada fuera de la pantalla.
   - En Figma (*Reto 5*, Frame `1:391: Header - TopAppBar`), la cabecera móvil mide `390px x 64px`, conteniendo a la izquierda el isotipo 🚀 con el texto "Rocket Pizza" en `#FF9500` y a la derecha el icono de carrito con su badge en `#55E16B` y el botón de tema, sin apiñar el selector de especie en la misma fila.
2. **Superposición de Bloque Sticky en Mobile (Desglose de Costos):**
   - El contenedor del desglose de costos posee la clase `sticky top-28` sin discriminar viewport.
   - En mobile, al desplazarse hacia el formulario de checkout que se encuentra debajo, la tarjeta de desglose queda flotando fija y tapa los campos de telemetría y el botón de envío.
3. **Discrepancias en Tokens de Color y Componentes respecto a Figma:**
   - Fondo de cabecera en Figma: `#10141A` (Espacio Profundo oscuro).
   - Badge del carrito en Figma: fondo `#55E16B` ("Albahaca Neón") con tipografía en `#00390F`.
   - Colores secundarios, bordes y tipografía sincronizados con la paleta de Figma `2002:22`.

---

## 2. Requisitos Funcionales en Sintaxis EARS

### 2.1 Requisitos Ubicuos (Ubiquitous Requirements)
- **REQ-UBI-01 (Fidelidad de Cabecera Móvil a Figma):** En pantallas móviles (< 640px), el sistema deberá presentar una barra de cabecera de 64px de altura con fondo `#10141A`, conteniendo exclusivamente el logo/marca a la izquierda y los botones de acción accesibles (tema y carrito) a la derecha, sin desbordamiento horizontal.
- **REQ-UBI-02 (Badge de Carrito con Token Figma):** El sistema deberá renderizar el badge numérico del carrito con fondo `#55E16B` ("Albahaca Neón") y texto de alto contraste `#00390F` (ratio 7.8:1, superando WCAG AA).
- **REQ-UBI-03 (Flujo Natural de Scroll en Mobile):** En pantallas móviles (< 1024px), el contenedor del desglose de costos deberá comportarse con flujo estático normal (`static`), reservando el posicionamiento `sticky` exclusivamente para escritorios (`lg:sticky lg:top-28`).

### 2.2 Requisitos Basados en Eventos (Event-driven Requirements)
- **REQ-EVD-01 (Acceso al Selector de Especie en Mobile):** Cuando la aplicación se renderice en pantallas móviles, el selector de especie deberá presentarse inmediatamente debajo de la cabecera fija como una barra de pestañas o sub-header segmentado accesible (`role="radiogroup"`), con altura y padding ergonómicos para toque táctil (mínimo 44px de área de contacto).
- **REQ-EVD-02 (Conmutación Responsiva a Desktop):** Cuando el viewport sea igual o superior a `md:` / `lg:`, la barra de especie se integrará limpiamente en la fila principal del header sin alterar el estado reactivo del `Store`.

### 2.3 Requisitos Basados en Estados (State-driven Requirements)
- **REQ-STD-01 (Sin Obstrucción Visual del Checkout):** Mientras el usuario se desplace verticalmente por el formulario de checkout en un dispositivo móvil, ningún panel superior o lateral deberá superponerse a los campos de entrada de telemetría ni al botón de envío.

### 2.4 Requisitos de Comportamiento No Deseado (Unwanted Behavior Requirements)
- **REQ-UNW-01 (Prohibición de Overflow Horizontal):** Si el viewport del navegador se reduce hasta 320px de ancho, el cuerpo del documento no deberá presentar barra de desplazamiento horizontal ni elementos ocultos por corte de pantalla (`overflow-x: hidden`).

---

## 3. Criterios de Aceptación Observables

| Identificador | Criterio de Aceptación | Método de Verificación Observable |
| :--- | :--- | :--- |
| **CA-M01** | **Header Mobile sin Cortes (360px a 390px)** | En un viewport emulado de 390px (iPhone), el logo "Rocket Pizza", el botón de switch de tema y el carrito son 100% visibles simultáneamente dentro de la barra superior de 64px. |
| **CA-M02** | **Selector de Especie Ergonómico en Mobile** | El selector Humano / Alien Zogtoniano se ubica visible y accesible debajo de la barra de navegación sin desbordar el ancho de pantalla, operable por teclado y touch. |
| **CA-M03** | **Desglose de Costos No Bloqueante** | Al hacer scroll vertical hacia el formulario en mobile, el bloque de desglose de costos fluye de manera natural y no se queda pegado tapando el formulario. En desktop (`lg`), conserva su comportamiento sticky lateral. |
| **CA-M04** | **Tokens Cromáticos Figma 1:1** | El badge del carrito adopta el verde `#55E16B` con texto `#00390F` coincidente con Figma `1:399`, y la cabecera refleja el tono `#10141A`. |
