# Blueprint de Arquitectura: Rocket Pizza (SPA)

## 1. Visión General del Sistema
Rocket Pizza es una Single Page Application (SPA) reactiva y ligera desarrollada para el Seminario de Interfaz de Usuario y Desarrollo de Software (iTec 2026). La aplicación permite la personalización y pedido de pizzas intergalácticas para dos especies con necesidades metabólicas distintas: **Humanos** y **Aliens Zogtonianos**.

## 2. Diagrama Modular y Flujo de Datos
El flujo de datos es unidireccional y se gestiona mediante un Store de estado centralizado en memoria del cliente con persistencia en `localStorage`.

```
[Usuario / Teclado]
        │
        ▼
   [UI View] (index.html + Tailwind CSS)
        │
        ├── Dispara Eventos (Especie, Tamaño, Ingrediente, Checkout)
        ▼
 [State Manager] (app.js)
        │
        ├── Bio-Compatibility Guard (Valida ingredientes tóxicos según especie)
        ├── Pricing & Discount Calculator (Aplica 50% OFF a Zogtonianos)
        │
        ▼
  [Store State] ─── Sincroniza ───► [localStorage: 'rocket_pizza_state']
        │
        ▼
[DOM Re-render] (Actualiza Catálogo, Modal de Alerta, Resumen y Checkout)
```

## 3. Módulos del Cliente (`app.js`)
- **`Store`**: Almacena el estado global de la sesión (especie seleccionada, tamaño de base, ingredientes agregados, PowerUp activo, método de pago y órdenes completadas).
- **`BioValidator`**: Valida las combinaciones de ingredientes. Si un humano intenta consumir *Bebida Metano* o *Roca Espacial*, o un Zogtoniano intenta consumir elementos no biocompatibles, activa el modal de "INGREDIENTE PROHIBIDO".
- **`PricingEngine`**: Calcula subtotales, recargos por tamaño, costos de ingredientes y el descuento de beneficio Alien (50% OFF en base/powerups).
- **`A11yModalManager`**: Maneja la apertura, cierre con `Esc`, focus trap y restauración de foco para modales accesibles (Alerta de Ingrediente y Confirmación de Pedido).
- **`ThemeManager`**: Alterna entre tema *Espacio Profundo* (Dark) y tema *Estación Espacial* (Light), preservando la preferencia del usuario y garantizando el ratio de contraste WCAG AA.

## 4. Persistencia Local (`localStorage`)
La aplicación persiste dos claves principales:
- `rocket_pizza_theme`: `'dark'` | `'light'`
- `rocket_pizza_cart`: Snapshot del pedido en curso y pedidos históricos.
