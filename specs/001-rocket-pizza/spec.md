# Especificación Funcional: Rocket Pizza Lunar (001-rocket-pizza)

## 1. Propósito y Visión del Producto
Rocket Pizza Lunar es una Single Page Application (SPA) interactiva, responsiva y accesible de última generación diseñada para el Seminario iTec 2026. La aplicación simula el sistema de pedidos de una pizzería intergaláctica automatizada que atiende tanto a clientes **Humanos** (consumidores de gastronomía terrestre) como a **Aliens Zogtonianos** (seres extraterrestres bioenergéticos con acceso a PowerUps y a un subsidio intergaláctico del 50% de descuento).

El objetivo principal es ofrecer una experiencia de usuario inmersiva y fluida, cumpliendo con los estándares de diseño de Figma (Reto 5), garantizando una accesibilidad universal de nivel **WCAG AA**, soportando la **Prueba de la Mano Atada** (operación exclusiva por teclado) y exhibiendo de forma consistente los **5 estados interactivos** en cada control.

---

## 2. Alcance del Proyecto

### 2.1 En Alcance (In Scope)
1. **Selector de Especie reactivo:** Conmutación entre Humano (👫) y Alien Zogtoniano (👽) con actualización dinámica de catálogo de ingredientes, promociones y reglas metabólicas.
2. **Configurador de Pizzas Espaciales:**
   - Selección de tamaño (Personal, Mediana, Familiar, Interestelar).
   - Selección de tipo de masa/base (Fina Lunar, Volcánica, Polvo Estelar).
   - Catálogo interactivo de ingredientes terrestres y cósmicos.
3. **Módulo Alien PowerUp:** Opciones de regeneración bioenergética exclusivas para Zogtonianos (+30% en 15m, +50% en 30m, +80% en 45m).
4. **BioValidator y Alerta de Ingrediente Prohibido:** Detección de incompatibilidades biológicas (ej. humano intentando ingerir Roca Espacial o Bebida Metano) con despliegue de un Modal Accesible WAI-ARIA (role dialog, captura de foco, tecla Esc).
5. **Motor de Cálculo de Precios (PricingEngine):** Desglose en tiempo real de subtotal, costo de ingredientes, recargo por PowerUp, aplicación automática del 50% de descuento Alien y cálculo del total en Créditos Lunares (LC).
6. **Checkout y Validación de Entrega Lunar:** Formulario de piloto con coordenadas orbitales y sector lunar, selección de método de pago intergaláctico y validación de campos.
7. **Modal de Confirmación de Pedido Espacial:** Resumen de la orden, tiempo estimado de entrega orbital y retorno de foco accesible.
8. **Dual-Theme Manager:** Alternancia entre temas *Espacio Profundo* (Dark) y *Estación Espacial* (Light), con preservación en `localStorage` y salvaguarda de contraste estricto (>= 4.5:1).
9. **Persistencia Local:** Sincronización del estado del pedido y configuración en `localStorage`.
10. **Accesibilidad Integral:** Cumplimiento de WCAG AA, prueba de la mano atada y 5 estados (Default, Hover, Active, Focus `:focus-visible`, Disabled).

### 2.2 Fuera de Alcance (Out of Scope)
1. Integración con pasarelas de pago bancario terrestres del mundo real (Stripe, PayPal, MercadoPago).
2. Base de datos externa o servidor backend remoto con autenticación de usuarios.
3. Geolocalización satelital terrestre GPS en tiempo real.

---

## 3. Requisitos Funcionales en Sintaxis EARS

### 3.1 Requisitos Ubicuos (Ubiquitous Requirements)
- **REQ-UBI-01 (Navegación y Controles Globales):** El sistema deberá mantener visible y accesible en todo momento una barra de navegación superior con el logo de Rocket Pizza Lunar, el conmutador de tema, el selector de especie y el indicador dinámico del carrito.
- **REQ-UBI-02 (Los 5 Estados Interactivos):** El sistema deberá garantizar que todo elemento interactivo (`<button>`, `<a>`, `<input>`, `<select>`) implemente y exhiba de manera perceptible los 5 estados de control:
  1. *Default:* Contraste de texto y fondo conforme a WCAG AA (mínimo 4.5:1).
  2. *Hover:* Variación visual perceptible (elevación de brillo o cambio de tono específico).
  3. *Active:* Indicador táctil de pulsación (`scale-95`).
  4. *Focus (`:focus-visible`):* Anillo de enfoque de alto contraste con desplazamiento (`ring-2 ring-amber-400 ring-offset-2`).
  5. *Disabled:* Atenuación visual (`opacity-50`, cursor no permitido) con atributos `disabled` y `aria-disabled="true"`.
- **REQ-UBI-03 (Prueba de la Mano Atada):** El sistema deberá ser 100% gobernable exclusivamente mediante teclado (`Tab`, `Shift+Tab`, `Enter`, `Espacio`, `Escape`), sin requerir puntero de mouse en ningún flujo.
- **REQ-UBI-04 (Ratio de Contraste WCAG AA):** El sistema deberá mantener un ratio de contraste de al menos 4.5:1 para texto estándar y 3:1 para elementos gráficos y estados de foco en ambos temas.
- **REQ-UBI-05 (Salvaguarda de Contraste en Botones Primarios):** El sistema deberá renderizar los botones primarios naranjas (`#FF9500`) con texto oscuro de alto contraste (`#1A202C`), prohibiendo texto blanco que degrade el ratio por debajo de 4.5:1.
- **REQ-UBI-06 (Persistencia de Estado):** El sistema deberá sincronizar automáticamente los cambios de configuración del pedido y la preferencia de tema en `localStorage` bajo las claves `rocket_pizza_cart` y `rocket_pizza_theme`.

### 3.2 Requisitos Basados en Eventos (Event-driven Requirements)
- **REQ-EVD-01 (Cambio de Especie):** Cuando el usuario active el selector de especie (Humano o Alien Zogtoniano), el sistema deberá actualizar inmediatamente el estado de la aplicación, reconfigurar la disponibilidad de ingredientes, recalcular el descuento y refrescar el mensaje de bienvenida y las reglas de biocompatibilidad.
- **REQ-EVD-02 (Selección/Deselección de Ingrediente):** Cuando el usuario interactúe con una tarjeta de ingrediente compatible mediante clic, pulsación de tecla `Enter` o `Espacio`, el sistema deberá conmutar el estado del ingrediente en la pizza actual y emitir una actualización inmediata al motor de precios.
- **REQ-EVD-03 (Conmutación de Tema):** Cuando el usuario presione el botón de cambio de tema, el sistema deberá alternar el atributo de tema en el elemento raíz del DOM (`dark` / `light`), persistir la elección en `localStorage` y actualizar los atributos `aria-pressed` o `aria-label` asociados.
- **REQ-EVD-04 (Envío del Formulario de Pedido):** Cuando el usuario presione el botón "Lanzar Pedido al Espacio", el sistema deberá validar los campos del formulario de entrega y, de ser válidos, abrir el Modal WAI-ARIA de Confirmación de Pedido.
- **REQ-EVD-05 (Cierre de Modales vía Teclado):** Cuando el usuario presione la tecla `Escape` mientras cualquier modal accesible se encuentra abierto, el sistema deberá cerrar el modal de inmediato y restaurar el foco del teclado al elemento disparador original.
- **REQ-EVD-06 (Limpieza de Configuración):** Cuando el usuario presione el botón "Reiniciar Módulo", el sistema deberá restaurar la configuración de la pizza a sus valores por defecto tras confirmar la acción.

### 3.3 Requisitos Basados en Estados (State-driven Requirements)
- **REQ-STD-01 (Beneficio Alien Zogtoniano):** Mientras el estado de la especie activa sea "Alien Zogtoniano", el sistema deberá aplicar automáticamente una bonificación del 50% de descuento sobre el precio base y la masa de la pizza, reflejándolo explícitamente en el desglose de precios.
- **REQ-STD-02 (Habilitación de PowerUps Celulares):** Mientras el estado de la especie activa sea "Alien Zogtoniano", el sistema deberá habilitar e iluminar el panel de selección de "PowerUp Celular" con las 3 variantes de recarga energética.
- **REQ-STD-03 (Bloqueo de PowerUps para Humanos):** Mientras el estado de la especie activa sea "Humano", el sistema deberá mantener deshabilitado y visualmente oculto o bloqueado el panel de PowerUp Celular.
- **REQ-STD-04 (Bloqueo de Checkout por Configuración Incompleta):** Mientras la pizza actual no cuente con un tamaño y una base válidos seleccionados, el sistema deberá mantener el botón de lanzamiento en estado inhabilitado (`disabled`, `aria-disabled="true"`).
- **REQ-STD-05 (Captura de Foco en Modales / Focus Trap):** Mientras un modal (Alerta de Incompatibilidad o Confirmación de Pedido) permanezca abierto, el sistema deberá atrapar la navegación por teclado (`Tab` y `Shift+Tab`) ciclándola exclusivamente dentro de los controles interactivos del modal, asignando `aria-hidden="true"` al contenedor principal exterior.

### 3.4 Requisitos de Comportamiento No Deseado / Errores (Unwanted Behavior Requirements)
- **REQ-UNW-01 (Incompatibilidad Biológica en Humanos):** Si un usuario en estado de especie "Humano" intenta seleccionar un ingrediente tóxico para su metabolismo (*Bebida Metano*, *Roca Espacial* o aditivos no biológicos), entonces el sistema deberá rechazar la adición del ingrediente, abrir de forma inmediata el Modal WAI-ARIA de "INGREDIENTE PROHIBIDO" con advertencia toxicológica y colocar el foco en el botón de confirmación/cierre del modal.
- **REQ-UNW-02 (Incompatibilidad Biológica en Aliens):** Si un usuario en estado de especie "Alien Zogtoniano" intenta seleccionar un ingrediente tóxico para su metabolismo (ej. lácteos hiperdensos incompatibles), entonces el sistema deberá rechazar la selección y activar el Modal de "INGREDIENTE PROHIBIDO" adaptado a la fisiología zogtoniana.
- **REQ-UNW-03 (Fallas de Validación en Formulario de Entrega):** Si el usuario intenta lanzar el pedido con campos obligatorios vacíos o coordenadas espaciales que no respeten el patrón galáctico exigido, entonces el sistema deberá marcar visualmente el campo en error con `--color-danger`, anunciar el fallo mediante un contenedor con `role="alert"` o `aria-live="polite"` y trasladar el foco al primer campo inválido.
- **REQ-UNW-04 (Corrupción de Datos en Almacenamiento Local):** Si el contenido recuperado de `localStorage` está dañado o no es serializable como JSON, entonces el sistema deberá capturar la excepción de forma transparente, purgar la clave corrupta e inicializar el estado seguro por defecto (Humano, Tema Dark, Pizza Personal) sin interrumpir la ejecución.

### 3.5 Requisitos Opcionales (Optional Requirements)
- **REQ-OPT-01 (Insignia Bioenergética de PowerUp):** Donde el cliente Alien seleccione un PowerUp Celular activo, el sistema deberá desplegar una insignia animada de pulso bioenergético junto al indicador de tiempo estimado de entrega.
- **REQ-OPT-02 (Exportación o Snapshot del Pedido):** Donde el usuario confirme su orden espacial, el sistema deberá ofrecer una opción accesible para copiar el comprobante del pedido en Créditos Lunares al portapapeles.

---

## 4. Criterios de Aceptación y Pruebas Observables

| Identificador | Criterio de Aceptación | Método de Verificación Observable |
| :--- | :--- | :--- |
| **CA-01** | **5 Estados Interactivos Verificados** | En cada botón, link, tarjeta interactiva e input se evidencia visualmente: estado normal, hover (luminosidad), active (scale-95), focus (anillo visible ámbar con offset) y disabled (opacidad reducida y cursor not-allowed). |
| **CA-02** | **Contraste WCAG AA en Ambos Temas** | Auditoría con DevTools demuestra ratio >= 4.5:1 en todos los textos sobre sus respectivos fondos, especialmente en botones primarios naranjas donde el texto es `#1A202C` o `#643700`. |
| **CA-03** | **Prueba de la Mano Atada Aprobada** | Un operador puede navegar desde el primer elemento del header hasta el botón final de confirmación únicamente usando `Tab`, `Shift+Tab`, `Enter`, `Espacio` y `Esc`, sin tocar el ratón. |
| **CA-04** | **Gestión Accesible de Ingrediente Prohibido** | Al intentar añadir "Roca Espacial" siendo Humano, se bloquea la adición, aparece el modal con `role="alertdialog"`, el foco salta al botón "Entendido" y no se puede escapar del modal con `Tab` hasta cerrarlo con `Esc` o clic. |
| **CA-05** | **Cálculo Exacto del 50% de Descuento Alien** | Al alternar a "Alien Zogtoniano", el precio base de la pizza refleja un 50% de descuento documentado con etiqueta promocional, reduciendo el total en la proporción correspondiente. |
| **CA-06** | **Persistencia y Resiliencia en Recarga (F5)** | Al recargar la página, se preserva el tema seleccionado y el contenido del pedido previo configurado en `localStorage`. |
