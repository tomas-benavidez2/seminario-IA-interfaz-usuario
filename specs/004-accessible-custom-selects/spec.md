# Especificación Funcional: Selectores Desplegables WAI-ARIA Personalizados (004-accessible-custom-selects)

## 1. Propósito y Diagnóstico
El formulario de telemetría y checkout espacial (`#order-form`) requiere selectores para el **Sector Lunar** y el **Método de Pago**. Los elementos nativos `<select>` delegan el menú de opciones al gestor de ventanas del Sistema Operativo, provocando:
1. Desbordamiento horizontal incontrolable del viewport en pantallas móviles.
2. Incompatibilidad de estilos y ruptura de la paleta temática oscura (*Espacio Profundo*).
3. Imposibilidad de aplicar animaciones, microinteracciones o alineación fluida con el diseño de Figma.

Para subsanar definitivamente esta limitación, se implementa el patrón estándar de accesibilidad **WAI-ARIA Combobox / Listbox**, confinando el 100% del renderizado al DOM interno del navegador.

---

## 2. Requisitos Funcionales en Sintaxis EARS

### 2.1 Requisitos Ubicuos (Ubiquitous Requirements)
- **REQ-UBI-01 (Contención Estricta de Ancho):** El sistema deberá confinar la lista desplegable de opciones al ancho exacto del contenedor del campo (`w-full`), prohibiendo cualquier desbordamiento fuera de la pantalla en dispositivos móviles (360px a 390px).
- **REQ-UBI-02 (Fidelidad Cromática y 5 Estados):** El menú desplegable y cada opción deberán respetar los tokens de diseño de Figma (`#252B33` en Dark Mode, `#FFFFFF` en Light Mode) e implementar los 5 estados interactivos (Default, Hover, Active, Focus `:focus-visible`, Disabled/Selected).
- **REQ-UBI-03 (Compatibilidad con el Formulario):** La selección de una opción deberá actualizar de forma síncrona el valor de un campo subyacente para que la validación y el cálculo de `OrderFormManager` en `app.js` operen de manera transparente sin regresiones.

### 2.2 Requisitos Basados en Eventos (Event-driven Requirements)
- **REQ-EVD-01 (Apertura y Cierre con Teclado/Click):** Cuando el usuario haga click o presione `Enter` / `Espacio` en el botón disparador (`role="combobox"`), el sistema deberá alternar el estado del menú (`aria-expanded="true"` / `false`) y desplegar/ocultar la lista (`role="listbox"`).
- **REQ-EVD-02 (Navegación por Flechas):** Cuando el menú esté abierto y el usuario presione `ArrowDown` o `ArrowUp`, el sistema deberá desplazar el foco visual activo entre las opciones contiguas (`aria-activedescendant` o foco físico).
- **REQ-EVD-03 (Cierre por Escape o Click Externo):** Cuando el menú esté abierto y el usuario presione la tecla `Escape` o haga click fuera del componente, el sistema deberá cerrar el menú de inmediato y devolver el foco al botón disparador.

### 2.3 Requisitos de Comportamiento No Deseado (Unwanted Behavior Requirements)
- **REQ-UNW-01 (Sin Fugas de Scroll en Mobile):** Si el usuario desplaza verticalmente la página mientras un menú combobox se encuentra abierto, el menú no deberá desarticularse ni salirse del contenedor del formulario.

---

## 3. Criterios de Aceptación Observables

| Identificador | Criterio de Aceptación | Método de Verificación Observable |
| :--- | :--- | :--- |
| **CA-S01** | **Cero Desbordamiento en Mobile (360px a 390px)** | Al abrir el selector de Sector Lunar o Método de Pago en un viewport de 360px (emulador Android) o 390px (iPhone), el menú desplegable tiene un ancho idéntico al campo y no genera scroll horizontal. |
| **CA-S02** | **Fidelidad Estética de Tokens** | El menú abierto exhibe fondo `#252B33`, borde `#38414D`, opciones en `#DFE2EB` con hover `#2F3640`, y checkmark SVG en la opción seleccionada. |
| **CA-S03** | **Prueba de la Mano Atada (100% Operable por Teclado)** | Un usuario puede navegar al selector con `Tab`, abrirlo con `Enter`/`Espacio`, elegir una opción con flechas y `Enter`, o cerrarlo con `Esc`, sin requerir mouse. |
| **CA-S04** | **Validación y Envío Sin Regresiones** | Al seleccionar un sector y método de pago, los errores de validación de `OrderFormManager` se limpian reactivamente y el voucher `#LUNAR-XXXX` se genera con los datos correctos. |
