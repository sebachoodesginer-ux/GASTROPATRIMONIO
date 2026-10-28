# GastroPatrimonio · actualización consolidada

## Cómo probar
1. Descomprime el ZIP y abre la carpeta `GASTROPATRIMONIO` en Visual Studio Code.
2. Ejecuta `index.html` con Live Server.
3. Mantén toda la estructura de carpetas al publicar en GitHub Pages.

## Ajustes incluidos en esta versión
- Menú principal unificado en todas las páginas: mismas seis opciones, destinos y orden. El botón GastroPatrimonio y el logo llevan al mismo home.
- Home con colaboradores y una sección de publicaciones destacadas cuyos enlaces conducen a registros editoriales individuales.
- Catálogo de publicaciones sin filtro de artículos; ahora separa libros, capítulos y revista.
- Libros vinculados con sus fichas PALMA y capítulos con sus fichas individuales cuando existe un registro directo.
- Sosquua se muestra en un bloque destacado compacto antes de los filtros y también aparece dentro del filtro de revistas.
- Ventana modal homogénea para fichas de publicaciones, con botón de cierre superior, CTA a la ficha individual y cierre mediante Escape.
- Animaciones suaves de flotación para CTA y hover con crecimiento, sin animaciones de navegación en reposo; el menú conserva su propia interacción con brillo al pasar el cursor.
- Mejoras responsive para títulos, tarjetas, portadas y perfiles.

## Nota de portadas
Las portadas disponibles se guardan como recursos locales en `assets/images/publicaciones/portadas/` para que las tarjetas sigan mostrando una imagen aunque el sitio externo no cargue. Algunas portadas de esta entrega son recortes ampliados de la captura de pantalla compartida; cuando estén disponibles los PNG/JPG originales, reemplaza los archivos manteniendo sus mismos nombres para obtener máxima nitidez.

## Enlaces editoriales integrados
- Cacao, sabores y tradición: `issue/view/181`
- Tesoros líquidos de Colombia: `issue/view/192`
- Gastronomía y turismo: Una reflexión cultural: `issue/view/70`
- Perspectivas turísticas: Una discusión entre lo social y lo cultural: `issue/view/69`
- El turismo gastronómico sostenible: Ruta Bochica: `issue/view/5`
- Tendencias en los procesos de formación del gastrónomo en Colombia: `issue/view/15`
- Recopilación de técnicas en panadería: `issue/view/6`
- Ambientes de aprendizaje para la formación del profesional gastrónomo: `issue/view/13`


## Actualización visual V4

- Se incorporó el banco gráfico de Opciones de grado con un banner visual, cinco imágenes de apoyo y cinco fondos editoriales separados, optimizados en WebP.
- Las imágenes están en `assets/images/opciones-grado/`.
- Se armonizaron tipografías y estilos de las secciones Nuestro equipo y Producción académica del Home.
- Se redujo el tamaño del título de Investigadores y se centró la cuadrícula de perfiles en escritorio, tablet y móvil.
- `js/site-motion.js` replica el movimiento sutil del Home en tarjetas, CTAs y bloques de contenido de las páginas, variando dirección y duración sin animar el menú.
- El sistema de movimiento respeta `prefers-reduced-motion`.


## V5 — Portadas editoriales y coherencia visual

Las portadas de libros y capítulos se guardan en `assets/images/publicaciones/portadas/`, con nombres descriptivos. Las tarjetas usan los archivos locales para evitar que desaparezcan cuando falle un servidor externo. Las imágenes de esta carpeta se recortaron de la vista previa compartida en la conversación, por lo que son versiones de referencia ampliadas; para lograr máxima nitidez, reemplaza cada archivo por el PNG/JPG original conservando exactamente el nombre. Los capítulos reutilizan la portada del libro al que pertenecen.

La página de Opciones de grado usa el banner local `assets/images/opciones-grado/banner-opciones-grado.webp` sin una capa que reduzca su intensidad. El contenido de la sección extensa `Conoce cada modalidad` se retiró porque la información ya se ofrece en las ventanas emergentes de cada opción. La sección `Documentos institucionales` tiene nuevas tarjetas y acciones de acceso.

Se unificó la animación de aparición de los bloques `reveal` con el patrón del Home y se mantuvieron las variaciones suaves de movimiento de tarjetas y CTA. Se respetan los ajustes del sistema para reducir movimiento.


## Archivos de portadas para reemplazo

Las portadas están en `assets/images/publicaciones/portadas/`. Para reemplazar una imagen por el original de mayor resolución, conserva el nombre del archivo y la extensión `.webp` o convierte el original a WebP con el mismo nombre.

| Archivo | Publicación asociada |
|---|---|
| `cacao-sabores-tradicion.webp` | Cacao, sabores y tradición |
| `tesoros-liquidos-colombia.webp` | Tesoros líquidos de Colombia |
| `gastronomia-y-turismo.webp` | Gastronomía y turismo: Una reflexión cultural y capítulos asociados |
| `perspectivas-turisticas.webp` | Perspectivas turísticas: Una discusión entre lo social y lo cultural y capítulos asociados |
| `ruta-bochica.webp` | El turismo gastronómico sostenible: Ruta Bochica y capítulos asociados |
| `tendencias-formacion-gastronomo.webp` | Tendencias en los procesos de formación del gastrónomo en Colombia y capítulo asociado |
| `recopilacion-tecnicas-panaderia.webp` | Recopilación de técnicas en panadería y capítulo asociado |
| `profesional-gastronomo.webp` | Ambientes de aprendizaje para la formación del profesional gastrónomo |

**Nota de calidad:** estos ocho archivos se recortaron de la captura de pantalla del explorador compartida en la conversación. Se pueden usar como marcadores locales, pero al reemplazarlos por las portadas originales se verá mayor nitidez.

## V6 — Carruseles centrados, naranja editorial y animación compartida

- En el Home se retiró el icono/espacio vacío de ubicación encima de «Conócenos».
- La sección «Nuestro equipo» amplía las fotografías y mantiene el título en una línea cuando el ancho lo permite; en pantallas pequeñas el título fluye de forma natural.
- «Producción académica» ahora utiliza un carrusel centrado: la publicación activa queda en primer plano y las publicaciones laterales se ven más pequeñas. Incluye flechas, indicadores, avance automático, navegación por teclado y deslizamiento táctil.
- En Publicaciones se añadió una selección editorial compacta justo después del destacado de Sosquua, con cinco libros y enlaces editoriales.
- La página de Línea de investigación anima el banner al entrar y reduce el espacio entre las sub-líneas, el banner final y el footer.
- En Sub-líneas, «DE INVESTIGACIÓN» permanece en una sola línea cuando la anchura disponible lo permite.
- Investigadores y Opciones de grado se armonizaron con el fondo crema, acentos naranja/terracota, separadores editoriales, tarjetas más grandes y ajustes responsive.
- Los banners de las páginas internas comparten una animación de entrada suave con el Home; las tarjetas y CTAs tienen variaciones de movimiento y crecimiento al pasar el cursor.
- Las animaciones respetan `prefers-reduced-motion`.

## Archivo de estilos y lógica V6

- `css/v6-enhancements.css`: estilos compartidos y ajustes por página.
- `js/v6-interactions.js`: comportamiento accesible de los carruseles centrados.

Para sustituir la versión anterior, conserva toda la estructura del ZIP al copiar la carpeta `GASTROPATRIMONIO` o al publicarla con GitHub Pages.
