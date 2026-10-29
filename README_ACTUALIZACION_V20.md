# GastroPatrimonio — actualización V20

## Cambios incluidos

- **Perfil de Orlando Ernesto Rodríguez Argáez:** nombre completo corregido y biografía resumida para el perfil de investigador y la tarjeta de inicio.
- **Nueva publicación:** se incorporó *El legado de las hierbas: patrimonio biocultural y saberes mestizos* (2025), de Alvelayis Nieto Mejía y Fabián Llano, enlazada a PALMA. Se añadió una imagen local de portada para que la tarjeta no dependa de una imagen remota.
- **Publicaciones destacadas:** *Cacao, sabores y tradición* quedó marcado con su doble distinción en los Gourmand World Cookbook Awards 2023, conocidos como los “Óscar” de los libros de cocina. La noticia institucional abre desde la tarjeta destacada; en el catálogo el libro aparece una sola vez.
- **Revista Sosquua:** se conserva su protagonismo en el inicio y en la página de publicaciones junto a las novedades editoriales.
- **Banners responsive:** se retiraron velos de color y brumas superpuestas sin cambiar el recorte ni la posición de las imágenes en escritorio. En móvil, cada bloque de texto recibe un panel semitransparente con bordes redondeados, adaptado al contenido para dejar visible parte del banner.
- **Animaciones de entrada:** los textos, títulos, tarjetas y otros elementos de contenido entran por separado durante el scroll. Se eliminaron los desenfoques de entrada y el menú y los pies de página se mantienen estáticos.
- **Puntero:** se fuerza el cursor nativo visible y se evita que elementos decorativos bloqueen los clics.
- **Botones “Ver detalles”:** se corrigió el contraste del texto y del fondo para recuperar su visibilidad en capítulos y publicaciones.
- **Ruta de imagen local:** se normalizó a un nombre ASCII el archivo de portada de “Cocina rústica con memoria culinaria” para evitar problemas de rutas en GitHub.

## Archivos principales editados

- `index.html`
- `publicaciones.html`
- `investigadores.html`
- `js/site-motion.js`
- `js/publicaciones.js`
- `css/v20-responsive-polish.css` (nuevo, incluido en las siete páginas HTML)
- Portadas locales en `assets/images/publicaciones/portadas/`

## Publicaciones destacadas

- [El legado de las hierbas — PALMA](https://cipres.sanmateo.edu.co/ojs/index.php/libros/issue/view/242)
- [Cacao, sabores y tradición — noticia del reconocimiento](https://www.sanmateo.edu.co/detalle-noticia.html?id=196)
- [Sosquua — último número enlazado en el sitio](https://cipres.sanmateo.edu.co/ojs/index.php/sosquua/issue/view/232)

## Publicar

Descomprime la carpeta y ábrela en Visual Studio Code. Conserva las rutas relativas y sus mayúsculas/minúsculas al subirla a GitHub Pages. No es necesario instalar dependencias ni ejecutar una compilación: es un sitio estático HTML/CSS/JavaScript.
