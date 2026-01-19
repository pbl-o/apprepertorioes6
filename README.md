# Mi repertorio

Servidor con Express que utiliza el módulo File
System para agregar, modificar y eliminar canciones almacenadas en un JSON local (repertorio.json)

- Commonjs
- 'https://github.com/pbl-o/apprepertorio'

## Tecnologías Empleadas

- Node.js, express.js

## Instalación y uso.

Instrucciones de instalación y configuración del proyecto:

1. Clonar repositorio:

```bash
git clone https://github.com/pbl-o/apprepertorio.git
```

2. Instalar dependencias:

```bash
npm install
```

3. Para Levantar el servidor:

```bash
npm run dev
```

4. Utiliar la Aplicación de la siguiente manera:

   a. Ingresar nombre de artista canción y tonalidad en los campos indicados del formulario. (Se recomiendad indicar tonalidad con clave americana para mayor simplicidad)
   - Clave Americana: [C,D,E,F,G,A,B]

- Para colocar la especie del acorde, indicar de la siguiente forma:
  - C = Do mayor
  - Cm = Do menor

  b. Para editar una canción hacer click en el botón
  "Editar" de la canción deseada Editar los datos requridos y volver a presionar el botón.

  c. Para Eliminar una canción hacer click en el botón "Eliminar" De no haber errores, recibirá un mensaje confirmando su acción en pantalla.

5. Para interactuar con el servidor vía postman, thunder-client o similar. Las rutas están indicadas en:

http://localhost:3000/docs (copiar en browser o añadir endpoint (/docs) a url incial)
