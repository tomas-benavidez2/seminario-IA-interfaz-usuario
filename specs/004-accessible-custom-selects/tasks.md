# Lista de Tareas: Selectores Desplegables WAI-ARIA (004-accessible-custom-selects)

## [x] T1: Reemplazo Semántico de Selectores en index.html y Estilos en style.css (Completado)
- **Objetivo:** Implementar la estructura DOM WAI-ARIA Combobox / Listbox en `#order-form` para `#lunar-sector` y `#payment-method`, agregando estilos para el menú, disparador y los 5 estados en `style.css`.
- **Archivos a modificar por Implementer:** `index.html`, `style.css`.
- **Criterios de Aceptación:**
  - **CA-T1.1:** Ambos selectores muestran botones disparadores con chevron SVG que rotan 180° al abrirse, y menús flotantes contenidos al 100% del ancho del campo (`w-full`).
  - **CA-T1.2:** Los menús y opciones respetan la paleta de Figma (`#252B33` en Dark, `#FFFFFF` en Light) con estados hover, focus y active visibles.

---

## [x] T2: Controlador Interactivo y Accesibilidad por Teclado en app.js (Completado)
- **Objetivo:** Crear el módulo `CustomComboboxManager` en `app.js` gestionando apertura/cierre, selección, navegación por flechas de teclado, tecla `Escape`, click exterior y sincronización reactiva con los inputs y `OrderFormManager`.
- **Archivos a modificar por Implementer:** `app.js`.
- **Criterios de Aceptación:**
  - **CA-T2.1:** Operable 100% por teclado (`Enter`, `Espacio`, `ArrowDown`, `ArrowUp`, `Escape`, `Tab`) con foco visible continuo.
  - **CA-T2.2:** La selección de un sector o método de pago actualiza el valor del campo, limpia mensajes de error y permite el lanzamiento exitoso de la orden.
