# Glosario del Producto: Rocket Pizza

## 1. Entidades del Dominio Espacial
- **Rocket Pizza:** Cadena de pizzerías intergaláctica automatizada que entrega pedidos mediante estaciones orbitales y robots espaciales.
- **Especie:** Clasificación biológica del cliente que determina la interfaz, ingredientes compatibles y promociones aplicables:
  - *Humano (👫):* Consumidor tradicional de pizzas con ingredientes terrestres (muzzarella, pepperoni, bacon, provolone, morrón, aceitunas).
  - *Alien Zogtoniano (👽):* Ser extraterrestre con fisiología energética que consume ingredientes cósmicos (Roca Espacial, Bebida Metano, Salsa Solar) y cuenta con un beneficio del 50% de descuento.
- **PowerUp Celular:** Adicional bioenergético exclusivo para Zogtonianos que acelera la regeneración celular (30% en 15 min, 50% en 30 min, 80% en 45 min).
- **Ingrediente Prohibido:** Incompatibilidad biológica detectada cuando un usuario selecciona un ingrediente nocivo para su especie (ej: humano intentando ingerir roca o metano).
- **Crédito Lunar / Moneda Intergaláctica:** Unidad de cuenta y sistema de pago estándar en el sector galáctico.

## 2. Entidades de Ingeniería y Accesibilidad
- **Prueba de la Mano Atada:** Prueba de usabilidad donde se opera la aplicación únicamente con el teclado (`Tab`, `Shift+Tab`, `Enter`, `Espacio`, `Esc`), sin tocar el mouse.
- **5 Estados de Control:** Requisito de accesibilidad donde cada control interactivo declara visualmente: Default, Hover, Active, Focus (`:focus-visible`) y Disabled.
- **Master Context:** Conjunto de 6 documentos vivos en `docs/contexto/` que rigen las decisiones de diseño y arquitectura del proyecto.
- **WAI-ARIA Dialog:** Patrón de diseño para modales emergentes accesibles que garantiza que lectores de pantalla y usuarios de teclado puedan interactuar sin perder el foco ni desorientarse.
