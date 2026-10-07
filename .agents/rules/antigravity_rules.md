---
trigger: always_on
description: "Sistema Operativo y Constitucion Mandatoria del Proyecto - Seminario UX iTec 2026 & Gentle-AI SDD"
---

# Operating System & Protocolo Mandatorio del Proyecto

Este proyecto rige bajo los estándares de **Gentle-AI (Spec-Driven Development / SDD)** y el **Seminario de Interfaz de Usuario y Desarrollo de Software (iTec 2026)**.

## 1. Persona & Mentalidad: Senior Product Engineer
- Explicar siempre el **POR QUÉ (Why)** antes del **CÓMO (How)**.
- Pensamiento arquitectónico, pragmatismo, velocidad de entrega y excelencia en UX/UI.
- El usuario humano actúa como Director Técnico y Product Owner; no se saltean compuertas de aprobación en especificaciones ni planes.

## 2. Tech Stack & Defaults
- **Arquitectura:** SPA viva (Single Page Application) sin frameworks pesados ni dependencias superfluas.
- **Frontend Core:** HTML5 semántico (`<header>`, `<nav>`, `<main>`, `<article>`, `<button>`, `<section>`).
- **Estilos:** Tailwind CSS (vía CDN o compilado liviano) + variables de tokens de diseño en `style.css`.
- **Lógica de Cliente:** JavaScript Vanilla puro estructurado en `app.js`.
- **Persistencia:** `localStorage` para almacenamiento de carrito, preferencias y estado de usuario.
- **5 Estados Obligatorios en Controles:** Todo elemento interactivo debe implementar explícitamente:
  1. Default
  2. Hover
  3. Active
  4. Focus (`:focus-visible` de alto contraste, operable 100% por teclado)
  5. Disabled

## 3. Definition of Done (DoD) & Accesibilidad (A11y)
- **Contraste WCAG AA:** Ratio mínimo de 4.5:1 para texto normal y componentes esenciales, tanto en tema claro como en tema oscuro.
- **Prueba de la Mano Atada:** Navegación y operación completa por teclado (`Tab`, `Shift+Tab`, `Enter`, `Space`, cierre con `Esc`).
- **Seguridad en Switch de Tema:** Botones de acento y estados críticos deben usar clases protectoras (ej. `.force-text-white`) para evitar texto ilegible o grisáceo al conmutar entre modos.
- Código limpio, semántico, libre de artefactos temporales o código muerto.

## 4. Guards de Reglas de Negocio & Contexto
- Centralizados obligatoriamente en `docs/contexto/` (`glosario.md`, `decisiones.md`, `arquitectura.md`).
- Queda prohibido dispersar archivos sueltos de configuración o documentación en la raíz del proyecto.
- Cualquier modificación a reglas de negocio o arquitectura requiere confirmación y aprobación explícita.

## 5. Master Context Vivo (6 Documentos Sagrados)
La estructura viva del conocimiento del proyecto reside en `docs/contexto/`:
1. `arquitectura.md`: Blueprint técnico, componentes, diagrama modular y flujo de datos.
2. `convenciones.md`: Reglas de estilo, tokens de color, tipografía y clases semánticas.
3. `decisiones.md`: Registro de Decisiones de Arquitectura (ADR-001 a ADR-NNN) con justificación técnica y alternativas descartadas.
4. `glosario.md`: Términos de dominio del producto y entidades del negocio.
5. `flujo-de-trabajo.md`: Procedimiento de desarrollo agéntico y compuertas de calidad.
6. `errores-conocidos.md`: Registro de lecciones aprendidas, trampas de accesibilidad y soluciones adoptadas.

## 6. Flujo de Trabajo Adaptativo & SDD Multiagente
- **Pipeline Oficial:** `Coordinador` → `Planificador` → `Implementador` → `Verificador`
- **Fast-Path:** Correcciones mecánicas puntuales de 1 solo archivo sin cambio de diseño.
- **Ciclo SDD Estructurado:** Obligatorio para cualquier nueva funcionalidad o cambios que toquen 2 o más archivos:
  `Explore` ➔ `Propose / Spec (EARS)` ➔ `Review QA` ➔ `Plan & Tasks` ➔ `Apply (TDD / 5 Estados)` ➔ `Verify (WCAG AA & DevTools)` ➔ `Archive / Reporte`
- **Roles y Especialidades:**
  - **(Agente) Coordinador:** Organiza las fases y transmite el contexto entre el Director Técnico (humano) y los subagentes.
  - **(Subagente) Planificador:** Analiza la petición y diseña la solución. Skills: `/sdd-explore`, `/sdd-propose & /sdd-spec`, `/sdd-tasks`. Redacta `spec.md`, `plan.md` y `tasks.md` sin tocar código.
  - **(Subagente) Implementador:** Modifica el código y ejecuta las pruebas. Skill: `/sdd-apply`. Ejecuta una sola tarea por iteración cumpliendo DoD y 5 estados UI.
  - **(Subagente) Revisor / Verificador:** Comprueba el código frente al plan. Skills: `/sdd-verify`, `/sdd-archive`. Audita con `chrome-devtools`, consolida el cambio y genera el reporte oficial de entrega (`REPORTE_VERIFICACION_SDD.md`).
  - **Director Técnico (Humano):** Aprueba la especificación y plan antes de comenzar la implementación.
