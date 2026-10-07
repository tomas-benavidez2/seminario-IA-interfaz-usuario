# Errores Conocidos y Trampas de Accesibilidad (Lecciones Aprendidas)

## 1. Trampa del Contraste en Botones Naranjas (#FF9500)
- **Problema:** En muchos diseños UI se coloca texto blanco (`#FFFFFF`) sobre botones naranjas de acento (`#FF9500`). El ratio de contraste resultante es de aproximadamente `2.9:1`, lo cual **REPRUEBA** el estándar WCAG AA (mínimo exigido 4.5:1).
- **Solución Adoptada:** Sobre el fondo naranja primario (`#FF9500`), se utiliza texto oscuro (`#643700` o `#1A202C`), alcanzando un ratio de contraste de `5.1:1` a `5.4:1` (Aprobado WCAG AA). Cuando se requiera texto claro sobre acentos, se debe oscurecer el fondo a un tono ámbar/marrón profundo o utilizar clases específicas de alto contraste.

## 2. Trampa del Switch de Tema en Botones de Acento
- **Problema:** Al conmutar de tema oscuro a claro, los botones pueden heredar clases de texto generales (ej. texto negro sobre fondo oscuro o texto claro sobre fondo blanco).
- **Solución Adoptada:** Aplicar clases semánticas forzadas (`.force-text-dark` o `.force-text-white` según el fondo del componente) que no dependan de la herencia dinámica del selector `dark:`.

## 3. Falta de Focus Trap en Modales Accesibles
- **Problema:** Al abrir un modal, el usuario que navega por teclado con `Tab` puede salirse del modal y continuar interactuando invisiblemente con elementos del fondo de la página.
- **Solución Adoptada:** Implementar captura de foco (`focus trap`) en `app.js`, manteniendo el foco ciclado dentro del modal hasta que se presione el botón de cierre o la tecla `Esc`, y restaurando el foco al elemento disparador.

## 4. Omisión del Anillo `:focus-visible`
- **Problema:** Eliminar el contorno de foco con `outline: none` sin proveer un reemplazo visual hace que la aplicación sea 100% inoperable para personas con discapacidad motriz o usuarios de teclado.
- **Solución Adoptada:** Todo elemento interactivo incluye obligatoriamente la clase utilitaria `focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2`.

## 5. Desbordamiento y Corte Horizontal del Header en Mobile
- **Problema:** Disponer en una única fila horizontal el logotipo, el selector de especie (`role="radiogroup"`) y las acciones de tema y carrito requiere más de 500px de ancho. En pantallas móviles estándar (375px a 390px, como los frames de iPhone en Figma), el contenido excede el ancho del viewport y la mitad derecha (switch de tema y carrito) se recorta o queda inaccesible.
- **Solución Adoptada:** Adaptar la cabecera móvil a la estructura exacta de Figma (`Header - TopAppBar` de 64px): fila superior exclusiva para Logo a la izquierda y Acciones (tema y carrito) a la derecha; el selector de especie se reubica de forma adaptativa en un sub-header móvil o barra segmentada accesible inmediatamente inferior, pasando a una sola fila integrada únicamente en pantallas medianas/grandes (`sm:` / `md:`).

## 6. Posicionamiento `sticky` Incondicional en Viewports Móviles
- **Problema:** Asignar `sticky top-28` al contenedor de desglose de precios sin discriminar por tamaño de pantalla (`lg:`) provoca que, al descender por el scroll en móvil hacia el formulario de checkout, la tarjeta de desglose permanezca fija y flote sobre los campos de telemetría, bloqueando la visibilidad e interacción.
- **Solución Adoptada:** Utilizar `static` por defecto en mobile y restringir la fijación mediante breakpoint: `lg:sticky lg:top-28`.

## 7. Desviación Cromática y de Componentes frente a Figma (Reto 5)
- **Problema:** El prototipo presentaba discrepancias con los tokens exactos del diseño: el badge numérico del carrito utilizaba naranja en lugar de Albahaca Neón (`#55E16B` con texto `#00390F`), la cabecera no coincidía con `#10141A`, y los contrastes de los badges necesitaban alineación rigurosa con la paleta de Figma.
- **Solución Adoptada:** Incorporar los tokens nativos extraídos de `Paleta de Colores (2002:22)` y `Header - TopAppBar (1:391)` asegurando fidelidad 1:1 y ratio WCAG AA >= 4.5:1.

## 8. Incontrolabilidad de Estilo y Desbordamiento en `<select>` y `<option>` Nativos
- **Problema:** En la especificación HTML, el menú desplegable que contiene los elementos `<option>` no pertenece al árbol de renderizado CSS ordinario, sino que es delegado al motor de widgets nativo del Sistema Operativo. Propiedades CSS críticas como `max-width`, `text-overflow: ellipsis`, bordes redondeados y fondos personalizados son ignoradas en los `<option>`. En dispositivos móviles y emulaciones responsive, el menú nativo se abre como una ventana emergente del SO que excede el ancho del contenedor del formulario (`width > 100%`), desborda la pantalla y rompe la paleta visual del tema oscuro.
- **Solución Adoptada:** Implementar el patrón WAI-ARIA **Accessible Custom Select / Combobox** (`role="combobox"` para el botón disparador y `role="listbox"` con `role="option"` para la lista desplegable). Al ser elementos HTML nativos controlados en el DOM, se garantiza ancho exacto restringido (`w-full`), estilizado 100% fiel a los tokens Figma (`#252B33` en Dark, `#FFFFFF` en Light), soporte de teclado (`Enter`, `Espacio`, `Flechas`, `Esc`) y sincronización reactiva con el Store sin desbordamiento alguno.


