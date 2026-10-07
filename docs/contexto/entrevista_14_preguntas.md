# Registro de la Entrevista UX de 14 Preguntas (Clase 4)

**Proyecto:** Rocket Pizza Lunar  
**Fuente de Datos:** Prototipo Figma `Reto 5` (`K52ZLdBz6VmB371pCzuIDI`)  
**Metodología:** Gentle-AI SDD & iTec 2026  

---

### Bloque 1: Identidad, Usuarios y Glosario (Alimenta `arquitectura.md` y `glosario.md`)

1. **Nombre y Propósito del Sitio Web:**
   - **Respuesta:** Se llama *Rocket Pizza Lunar*. Es una plataforma de pedidos de pizzas espaciales para tripulantes en bases y domos lunares, permitiendo personalizar ingredientes compatibles y recibir entregas automatizadas en menos de 15 minutos luz.
2. **Arquetipos de Usuario ("Personas") y Puntos de Dolor:**
   - **Respuesta:**
     - *Persona 1: Kevin (Humano).* Minero espacial fatigado. Opera con guantes en tablet industrial con conectividad intermitente. Dolor: Botones pequeños o formularios largos. Requiere controles táctiles >= 48px y checkout en 2 clics.
     - *Persona 2: Xylar (Alien Zogtoniano).* Ser fotosensible bioenergético. Dolor: Fondos blancos encandilantes e ingredientes terrestres nocivos. Requiere modo oscuro de alto contraste y alimentos con recarga celular.
3. **Rotulado y Glosario Orientado al Usuario (Labeling):**
   - **Respuesta:** Se utiliza labeling intuitivo: *"Lanzar Pedido"* en vez de `Execute_Order`, *"Hangar de Pizzas"* para el catálogo, *"Créditos Lunares"* para la moneda, y *"Alerta Bio-Médica"* para incompatibilidades de ingredientes.

---

### Bloque 2: Estructura, Arquitectura de Información y Figma (Alimenta `arquitectura.md` y `convenciones.md`)

4. **Secciones Principales y Flujo de Navegación (SPA):**
   - **Respuesta:** 
     1. Header fijo accesible (Logo, selector de especie 👫/👽, switch dark/light, badge del carrito).
     2. Hero cósmico con bienvenida y jerarquía Gestalt.
     3. Catálogo interactivo (#builder) con selección de tamaño, masa, ingredientes y PowerUps.
     4. Resumen reactivo de pedido con desglose de precios en vivo.
     5. Formulario de checkout espacial con modal emergente de confirmación.
5. **Anatomía de Tarjetas y Datos de Muestra:**
   - **Respuesta:** Tarjetas con layout Gestalt: badge de categoría, nombre en `font-bold` (16px/20px), selector interactivo con feedback táctil y precio en Créditos Lunares. Datos de muestra: 6 ingredientes terrestres (Muzzarella, Pepperoni, Provolone, etc.) y 3 ingredientes/bebidas cósmicas (Roca Espacial, Bebida Metano, Salsa Solar).
6. **Formulario Interactivo y Feedback Visual:**
   - **Respuesta:** Formulario espacial con validación en cliente (Nombre de Piloto, Sector Lunar, Coordenadas `SEC-XX-YYY`). Dispara el modal accesible `#modal-order-success` sin recargar la página.

---

### Bloque 3: Sistema de Diseño y Accesibilidad (Alimenta `convenciones.md` y `errores-conocidos.md`)

7. **Paleta Semántica y Modo Oscuro/Claro:**
   - **Respuesta:** Primario: Naranja Medianoche (`#FF9500`), Hover: `#FFB874`, Secundario: Albahaca Neón (`#55E16B`), Éxito: `#02AD3F`, Alerta: `#FFB4AB`. Fondos: Dark `#1C2026`, Light `#F8F9FA`. Contraste WCAG AA >= 4.5:1 verificado en ambos modos.
8. **Tipografía y Escala Modular:**
   - **Respuesta:** Familia tipográfica `Plus Jakarta Sans`. H1: 32px bold, H2: 28px bold, H3: 20px semibold, Body: 16px regular/medium, Badges: 14px uppercase.
9. **Responsive & Mobile-First:**
   - **Respuesta:** 1 columna táctil en dispositivos móviles/tablets espaciales; 2-3 columnas en escritorio. Cero desborde horizontal (`overflow-x: hidden`).
10. **Los 5 Estados Obligatorios de Interacción:**
    - **Respuesta:** Cada botón e input declara: 1) Default, 2) Hover, 3) Active (`scale-95`), 4) Focus (`:focus-visible` con anillo `ring-2 ring-amber-400 ring-offset-2`), 5) Disabled (`opacity-50 cursor-not-allowed`).

---

### Bloque 4: Decisiones Técnicas y Límites (Alimenta `decisiones.md` y `arquitectura.md`)

11. **Framework CSS Elegido y Motivos:**
    - **Respuesta:** Tailwind CSS (CDN) + `style.css` con variables nativas `:root`. Permite maquetado ágil de utilidades sin pasos pesados de transpilación.
12. **Límites Técnicos y Tecnologías Prohibidas:**
    - **Respuesta:** PROHIBIDO backend (Node, Express, Python), PROHIBIDO bases de datos complejas (SQL, Mongo, Firebase) y PROHIBIDO frameworks pesados (React, Angular). Todo corre en el navegador mediante JavaScript Vanilla estructurado y `localStorage`.

---

### Bloque 5: Flujo de Trabajo, Accesibilidad y Gotchas (Alimenta `flujo-de-trabajo.md` y `errores-conocidos.md`)

13. **Checklist de Verificación (Definition of Done - DoD):**
    - **Respuesta:** 1. Fidelidad absoluta al Figma (`Reto 5`). 2. Aprobación de la Prueba de la Mano Atada (100% por teclado con `Tab`, `Enter`, `Esc`). 3. Contraste WCAG AA verificado. 4. Master Context vivo en `docs/contexto/`. 5. Reporte SDD.
14. **Errores Comunes a Prevenir (Gotchas UX):**
    - **Respuesta:** 1. Texto blanco sobre naranja primario `#FF9500` reprueba WCAG AA (ratio 2.9:1); se corrige obligatoriamente con texto oscuro `#1A202C` (ratio 5.1:1). 2. Trampa de pérdida de foco en modales; se corrige con `focus trap` WAI-ARIA. 3. Clases protectoras `.force-text-white` y `.force-text-dark` al alternar temas.
