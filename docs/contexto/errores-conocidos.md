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
