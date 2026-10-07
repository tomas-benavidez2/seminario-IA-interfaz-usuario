# Registro de Decisiones de Arquitectura (ADR)

## ADR-001: Adopción de SPA Vanilla JavaScript y Tailwind CSS
- **Fecha:** 2026-10-06
- **Estado:** Aceptado
- **Contexto:** El proyecto requiere velocidad de entrega, alta fidelidad visual al wireframe de Figma (Reto 5), accesibilidad estricta WCAG AA y portabilidad sin complejidad de empaquetadores complejos.
- **Decisión:** Implementar la interfaz como una Single Page Application (SPA) modular en JavaScript Vanilla estructurado, utilizando Tailwind CSS para maquetado de utilidad rápida y CSS personalizado para tokens específicos.
- **Consecuencias:**
  - *Positivo:* Carga instantánea, sin pasos pesados de build, interoperabilidad directa con cualquier navegador y cero dependencias obsoletas.
  - *Alternativas descartadas:* React/Next.js (sobrecarga innecesaria para un prototipo interactivo enfocado en maquetación UX y A11y).

---

## ADR-002: Persistencia y Gestión de Estado en Cliente (`localStorage`)
- **Fecha:** 2026-10-06
- **Estado:** Aceptado
- **Contexto:** Se necesita mantener el carrito, el tema seleccionado y el historial de pedidos ante recargas de página sin requerir un backend con base de datos.
- **Decisión:** Utilizar un Store reactivo en `app.js` sincronizado con la API nativa de `localStorage` (`rocket_pizza_cart` y `rocket_pizza_theme`).
- **Consecuencias:**
  - *Positivo:* Persistencia transparente, autónoma y sin latencia de red.
  - *Alternativas descartadas:* Mock API / Fetch remoto (introduce puntos de falla externos y lentitud en demostraciones en vivo).

---

## ADR-003: Manejo Accesible de Alertas de Biocompatibilidad ("Ingrediente Prohibido")
- **Fecha:** 2026-10-06
- **Estado:** Aceptado
- **Contexto:** En el universo narrativo de Rocket Pizza, los ingredientes de Zogtonianos (ej. Bebida Metano, Roca Espacial) son tóxicos para humanos, y viceversa. Cuando el usuario comete un error, se debe alertar de manera no intrusiva pero accesible.
- **Decisión:** Implementar un Modal Emergente Accesible bajo el estándar WAI-ARIA Dialog (con `role="dialog"`, `aria-modal="true"`, foco atrapado en el modal y cierre con tecla `Esc`), evitando el uso de `alert()` nativo del navegador.
- **Consecuencias:**
  - *Positivo:* Cumple los criterios de WCAG AA y la rúbrica de interacción del seminario.
  - *Alternativas descartadas:* `window.alert()` (bloquea el hilo de ejecución, es inaccesible y no es estético).

---

## ADR-004: Dual-Theming (Espacio Profundo / Claro) con Clases Protectoras
- **Fecha:** 2026-10-06
- **Estado:** Aceptado
- **Contexto:** Al conmutar entre modos oscuro y claro, los botones de acento primarios (naranja) o secundarios suelen heredar colores de texto con bajo contraste si no se aíslan correctamente.
- **Decisión:** Definir clases de protección semántica como `.force-text-white` y tokens en variables CSS que garantizan un ratio mínimo de 4.5:1 en ambos temas.
- **Consecuencias:**
  - *Positivo:* Aprueba la auditoría de contraste WCAG AA en ambas modalidades.
  - *Alternativas descartadas:* Colores fijos sin soporte para variables dinámicas.
