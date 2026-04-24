Colocar los archivos de la fuente LTC Nicolas Cochin en esta carpeta:

  - LTCNicolasCochin.ttf         (regular)
  - LTCNicolasCochinItalic.ttf   (italic)

Las rutas están referenciadas desde css/styles.css como:
  url('../fonts/LTCNicolasCochin.ttf')
  url('../fonts/LTCNicolasCochinItalic.ttf')

Si sólo se cuenta con el archivo regular, dejar ambas declaraciones
@font-face apuntando al mismo archivo, o eliminar el bloque italic:
el navegador sintetizará una cursiva por defecto.
