# Flujo de Trabajo Adaptativo & SDD Multiagente

## 1. Principio Fundamental
El desarrollo sigue el estándar **Spec-Driven Development (SDD)** de Gentle-AI y la metodología del Seminario iTec 2026. La inteligencia artificial actúa como fuerza de ejecución, mientras que el usuario humano ejerce el rol de **Director Técnico y Product Owner**.

## 2. Los Dos Caminos de Ejecución
- **Fast-Path:** Reservado únicamente para correcciones menores de un solo archivo (ej. corregir un typo en texto, ajustar un margen de CSS puntual). No requiere ciclo de spec formal.
- **Ciclo SDD Estructurado (Obligatorio para >= 2 archivos):**
  Pipeline: `Coordinador` → `Planificador` → `Implementador` → `Verificador`
  1. **Explore:** Inspección de requerimientos, Figma tokens y código existente.
  2. **Propose / Spec:** Redacción de la especificación técnica en `specs/` usando sintaxis EARS (Easy Approach to Requirements Syntax).
  3. **Compuerta de Aprobación 1 (Humano):** El Director Técnico valida la spec.
  4. **Plan & Tasks:** Creación del plan desglosado en tareas atómicas (`tasks.md`).
  5. **Compuerta de Aprobación 2 (Humano):** Aprobación del plan y secuencia de tareas.
  6. **Apply (Implementación):** Ejecución tarea por tarea con TDD o implementación visual incremental.
  7. **Verify (Auditoría):** Revisión con Chrome DevTools, verificación de los 5 estados y contraste WCAG AA.
  8. **Archive (Cierre):** Consolidación del cambio y generación del reporte oficial de entrega (`REPORTE_VERIFICACION_SDD.md`).

## 3. Matriz de Roles y Responsabilidades
| Rol | Tipo | Skills Asignadas | Responsabilidad Principal | Restricciones |
| :--- | :--- | :--- | :--- | :--- |
| **Coordinador** | Agente Principal | Orquestación general | Organiza las fases y transmite el contexto entre humano y subagentes | No escribe código directamente |
| **Planner** | Subagente | `/sdd-explore`<br>`/sdd-propose & /sdd-spec`<br>`/sdd-tasks` | Analiza la petición y diseña la solución | No modifica código fuente (solo `specs/`) |
| **Implementer** | Subagente | `/sdd-apply` | Modifica el código y ejecuta las pruebas | Una sola tarea por iteración |
| **Reviewer** | Subagente | `/sdd-verify`<br>`/sdd-archive` | Comprueba el código frente al plan, audita 5 estados/WCAG AA y genera `REPORTE_VERIFICACION_SDD.md` | No edita código de la app |
