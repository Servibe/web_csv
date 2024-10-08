# Challenge

**Prueba Full-Stack**

El propósito de esta prueba es evaluar tus habilidades en desarrollo Backend y Frontend. Debes construir una aplicación web que permita a los usuarios cargar un archivo CSV con datos preformateados y mostrar esos datos como tarjetas en el sitio web, pudiendo filtrar los datos.

**Instrucciones**

- **NO crees 2 repositorios**, asegúrate de incluir todo el código en el mismo repositorio de GitHub. Crea una carpeta "frontend" y "backend" dentro de tu repositorio y codifica directamente dentro de ellas.
- El Frontend y el Backend deben funcionar simplemente ejecutando **"npm install" seguido de "npm run dev"** (para ejecutar la aplicación) o **"npm run test"** (para ejecutar todas las pruebas).
- **NO agregues instrucciones adicionales o comandos de Docker en el readme**, si algo más necesita ser ejecutado antes de iniciar la aplicación, asegúrate de incluirlo en tu script de desarrollo.
- **Los archivos JavaScript** solo están permitidos en archivos de configuración de lib, todo tu código DEBE estar en **TypeScript** y completamente **tipado**.

---

**Características del Frontend**

- Debe ejecutarse en el **puerto 4000**, y todo debe estar en la ruta **"/"** como una **aplicación de una sola página (SPA)** usando **React**.
- Un botón para **seleccionar un archivo CSV** desde la máquina local y otro botón para **cargar el archivo seleccionado**.
- Una **barra de búsqueda** que permita a los usuarios buscar datos dentro del archivo CSV cargado.
- La barra de búsqueda debe **actualizar las tarjetas mostradas** para mostrar solo los resultados coincidentes.
- Los datos CSV cargados deben mostrarse como **tarjetas en el sitio web**, con cada tarjeta mostrando todos los datos de una sola fila del archivo CSV.
- **Manejo de errores claro y amigable para el usuario**.

**Características del Backend**

- Debe ejecutarse en el **puerto 3000**.
- El backend debe implementarse como una **API RESTful** utilizando **Node**. **(NO uses ningún framework con opiniones como Adonis o Nest)**.
- **El backend debe incluir los siguientes endpoints**:
    - **[POST /api/files]**
        - Un endpoint que acepta la carga de un archivo CSV desde el frontend y almacena los datos en una base de datos o una estructura de datos. Debes usar la clave "file" en la solicitud del cuerpo.
        - Esta ruta debe devolver el estado 200 y un objeto con la clave "message" con el valor "El archivo se cargó correctamente".
        - O esta ruta debe devolver el estado 500 y un objeto con la clave "message" con un mensaje de error en el valor.
    - **[GET /api/users]**
        - Debe incluir un endpoint que permita al frontend buscar a través de los datos CSV cargados. Esta ruta debe aceptar un parámetro de consulta ?q= para términos de búsqueda y debe buscar en CADA columna del CSV. El filtro debe buscar coincidencias parciales y también ser insensible a mayúsculas y minúsculas.
        - Esta ruta debe devolver el estado 200 y un objeto con la clave "data" con un array de objetos dentro de él.
        - O esta ruta debe devolver el estado 500 y un objeto con la clave "message" con un mensaje de error en el valor.
