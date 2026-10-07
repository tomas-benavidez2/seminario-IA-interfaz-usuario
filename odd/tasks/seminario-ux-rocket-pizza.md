# Seminario UX Rocket Pizza - Plan Maestro de Integración

## Objetivo
Desarrollar y presentar el proyecto SPA **Rocket Pizza** para el Seminario de Interfaz de Usuario y Desarrollo de Software (iTec 2026), integrando la metodología de arneses agénticos (OpenCode Días 1-3) adaptada a Antigravity CLI con gobernanza Gentle-AI (SDD).

## Criterios de Aceptación & Rúbrica (100 pts)
1. **Fidelidad Figma & UI (25 pts):** Traducción fiel del diseño, jerarquía Gestalt, responsive mobile-first y selector Dark/Light mode con contraste WCAG AA.
2. **Interactividad, 5 Estados & UI Feedback (25 pts):** SPA fluida, catálogo dinámico con filtros, modales accesibles y los 5 estados obligatorios en controles.
3. **Accesibilidad Web WCAG AA (20 pts):** Contraste mínimo 4.5:1, navegación operable 100% por teclado ("prueba de la mano atada" con Tab, Enter, Esc) y semántica HTML5.
4. **Master Context & Reglas Always-On (15 pts):** 6 documentos en `docs/contexto/` con ADRs, reglas `antigravity_rules.md` activas y persistencia.
5. **Ciclo Agéntico SDD & Rúbrica de Cierre (15 pts):** `REPORTE_VERIFICACION_SDD.md` y estructura limpia del proyecto.

## Tareas

- [x] **T1: Configuración de MCPs y Harness**
  - Conectar MCP de Figma en `~/.gemini/config/mcp_config.json` con Personal Access Token.
  - Verificar MCPs activos (`figma`, `chrome-devtools`, `codegraph`).
- [x] **T2: Constitución y Reglas Globales**
  - Crear `.agents/rules/antigravity_rules.md` con encabezado `trigger: always_on`.
  - Definir los 6 pilares operativos (Senior Product Engineer, Tech Stack Defaults, DoD WCAG AA, Guards, Master Context, Flujo SDD).
- [x] **T3: Entrevista UX de 14 Preguntas y Master Context**
  - Completar los 5 bloques de la entrevista de producto UX.
  - Generar los 6 documentos sagrados en `docs/contexto/` (`arquitectura.md`, `convenciones.md`, `decisiones.md` con ADRs 001-004, `glosario.md`, `flujo-de-trabajo.md`, `errores-conocidos.md`).
- [x] **T4: Sistema Multiagente para SDD**
  - Definir subagentes especializados (`planner`, `implementer`, `reviewer`) con límites de lectura/escritura y protocolos de aprobación humana.
- [x] **T5: Ingesta de Figma y Especificación (SDD)**
  - Extraer tokens y estructura del prototipo Rocket Pizza vía MCP de Figma.
  - Generar y aprobar `specs/001-rocket-pizza/spec.md`, `plan.md` y `tasks.md` en sintaxis EARS.
- [x] **T6: Implementación Incremental de la SPA**
  - Estructura semántica HTML5 en `index.html`.
  - Tokens de diseño y clases utilitarias en `style.css`.
  - Lógica interactiva en `app.js` (tema, filtros por especie, modales accesibles, carrito/checkout en `localStorage`).
- [x] **T7: Auditoría de Accesibilidad y 5 Estados**
  - Verificar contraste WCAG AA (4.5:1) en modo claro y oscuro con Chrome DevTools.
  - Ejecutar la prueba de la mano atada (operabilidad total por teclado).
- [x] **T8: Cierre, Documentación de Entrega y Limpieza**
  - Generar `REPORTE_VERIFICACION_SDD.md`.
  - Estructura limpia y consolidada del proyecto para entrega final.
