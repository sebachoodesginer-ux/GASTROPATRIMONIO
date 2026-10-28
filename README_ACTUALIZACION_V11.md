# GastroPatrimonio — Actualización V11

## Cambios incluidos

- El carrusel de publicaciones destacadas del Home avanza automáticamente cada 2,5 segundos y conserva controles manuales, tarjeta central activa y compatibilidad con movimiento reducido.
- La página Publicaciones ya no contiene carrusel de selección editorial. Se conservó el bloque destacado de Sosquua y se cambiaron los cinco destacados editoriales por una cuadrícula estática adaptable.
- Se reforzó la página Sub-líneas de investigación: banner de carga prioritaria, imágenes de apoyo con dimensiones reservadas, fondo editorial, tarjetas con realce naranja y el banner final.
- Se unificaron las entradas al desplazarse con el sistema compartido de animaciones y se ajustaron las apariciones para que los elementos no desaparezcan al salir de la zona visible.
- Se eliminó del paquete el archivo de imagen de cero bytes `assets/images/Sub_linea/4.webp`, que no era utilizado por el HTML ni el CSS.
- Se agregó `css/v11-refinements.css` a las siete páginas para mantener el mismo lenguaje de animación y los ajustes responsive.

## Cómo probar

1. Descomprime el ZIP manteniendo todas las carpetas.
2. Abre la carpeta `GASTROPATRIMONIO` en Visual Studio Code.
3. Ejecuta `index.html` con Live Server.
4. Comprueba que el carrusel del Home avance solo y que la cuadrícula editorial de Publicaciones no muestre controles de carrusel.
5. Recorre Sub-líneas de investigación en escritorio y móvil para verificar las imágenes, las tarjetas y el banner final.

## Notas

Las portadas permanecen como recursos locales reemplazables. El movimiento automático se pausa cuando se prefiere movimiento reducido, de acuerdo con la accesibilidad del dispositivo.
