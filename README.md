# Markdown Links

![¡Bienvenidoa a md-links!](https://github.com/paolandre/DEV007-md-links/assets/129551206/b6a35f97-8915-4054-8f58-f5e1e024ca6d)

## Índice

* [1. Descripción](#1-descripción)
* [2. Instalación](#2-instalación)
* [3. Uso](#3-uso)
* [4. Opciones](#4-opciones)
* [5. Requisitos](#5-requisitos)
* [6. Diagrama de flujo](#6-diagrama-de-flujo)
* [7. Test unitarios](#7-tests-unitarios)


***
## 1. Descripción

Markdown Links Stats es una herramienta de línea de comandos (CLI) y una librería en JavaScript que permite leer y analizar archivos en formato [Markdown](https://es.wikipedia.org/wiki/Markdown) para verificar los links que contengan y reportar algunas estadísticas. Es especialmente útil para desarrolladores que trabajan con archivos Markdown que contienen enlaces a sitios web.

La herramienta te permitirá obtener información sobre los enlaces encontrados, como la URL, el texto anclado y la ruta del archivo donde se encontraron los enlaces. Además, podrás validar los enlaces realizando peticiones HTTP para comprobar su estado (ok o fail), así como mostrar estadísticas de los links.

## 2. Instalación

Para poder utilizar la librería "markdownlinks-stats" en tu proyecto, sigue estos pasos:

* Asegúrate de tener Node.js instalado en tu computadora. Puedes descargar la última versión estable desde el sitio oficial: [Node](https://nodejs.org/)

* Crea un nuevo directorio en tu proyecto si aún no tienes uno, o asegúrate de estar ubicado en la carpeta raíz de tu proyecto.
* Abre una terminal o línea de comandos en tu sistema operativo.
* Ejecuta el siguiente comando para instalar la librería "markdownlinks-stats" en tu sistema:

`npm i markdownlinks-stats`

Esto instalará las siguientes librerías y herramientas utilizadas por markdownlinks-stats:

* `axios:` Para hacer peticiones HTTP y obtener el contenido de los archivos Markdown.
* `string-gradient:` Para dar estilos a algunas salidas en la terminal.
* `babel` Para transpilar el código de ES6+ a ES5 y asegurar la compatibilidad con diferentes versiones de Node.js.
* `boxen y chalk:`   Para dar un formato visual más agradable en algunas salidas de la terminal.

¡Listo! Ahora ya tienes la librería "markdownlinks-stats" instalada en tu proyecto. Puedes comenzar a usarla para analizar y obtener información sobre los enlaces presentes en tus archivos Markdown.

## 3. Uso

Una vez que has instalado la librería "markdownlinks-stats" en tu proyecto, puedes comenzar a utilizarla desde la línea de comandos o desde tu propio código JavaScript.
### Uso desde la línea de comandos

Para usar "markdownlinks-stats" desde la línea de comandos, simplemente abre una terminal o línea de comandos en la ubicación de tu proyecto y ejecuta el siguiente comando:

`npx markdownlinks-stats <archivo.md o directorio>`

Reemplaza <archivo.md o directorio> con la ruta al archivo o directorio que deseas analizar. "markdownlinks-stats" analizará los archivos Markdown en esa ubicación y te mostrará información sobre los enlaces encontrados, incluyendo la URL, el texto del enlace y el estado de la URL.

Adicionalmente, puedes agregar las siguientes opciones para obtener información adicional:

* `--validate:` Realiza una petición HTTP a cada URL encontrada para verificar si el enlace está roto o es válido. Además de mostrar la información básica de los enlaces, se añadirá el estado de la URL y un mensaje indicando si está roto o no.

* `--stats:` Muestra un resumen estadístico de los enlaces encontrados. Incluye el número total de enlaces y el número de enlaces únicos.

* `--validate --stats:` Combina las opciones de validación y estadísticas para obtener un resumen que incluya el total de enlaces, enlaces únicos y enlaces rotos.

## 4. Opciones

"markdownlinks-stats" cuenta con algunas opciones que puedes utilizar para personalizar el análisis de los enlaces en tus archivos Markdown.

### 4.1. Opción --validate

Al agregar esta opción, "markdownlinks-stats" realizará una petición HTTP a cada URL encontrada para verificar si el enlace está roto o es válido. Esta opción es útil para asegurarte de que todos los enlaces en tus archivos Markdown estén funcionando correctamente.

* Ejemplo de uso:

`npx markdownlinks-stats <directorio o archivo> --validate`

![Validate](https://github.com/paolandre/DEV007-md-links/assets/129551206/82083a38-90ec-42df-8dc1-3eeda3bfe5ac)

### 4.2. Opción --stats

La opción --stats muestra un resumen estadístico de los enlaces encontrados en tus archivos Markdown. Incluye el número total de enlaces y el número de enlaces únicos. Esta opción es útil para obtener una visión general de la cantidad de enlaces presentes en tus archivos.

* Ejemplo de uso:

`npx markdownlinks-stats <directorio o archivo> --stats`

![stats](https://github.com/paolandre/DEV007-md-links/assets/129551206/59fcc122-4270-435b-ab03-0fc3dd90d936)
![stats directorio](https://github.com/paolandre/DEV007-md-links/assets/129551206/3bdc821a-5b2b-4c8e-8745-d111515d3406)

### 4.3. Combinación de opciones

Puedes combinar las opciones --validate y --stats para obtener un resumen que incluya el total de enlaces, enlaces únicos y enlaces rotos.

* Ejemplo de uso:

`npx markdownlinks-stats <directorio o archivo> --stats --validate`

![dos opciones](https://github.com/paolandre/DEV007-md-links/assets/129551206/55b53026-6c9d-4e75-9e30-53858ca3c206)

### 4.4. Opción --help

Si en algún momento necesitas recordar las opciones disponibles y su uso, puedes utilizar la opción --help para mostrar la ayuda en la terminal.

* Ejemplo de uso:

`npx markdownlinks-stats --help`

![help](https://github.com/paolandre/DEV007-md-links/assets/129551206/b1cae20d-74b0-4b9a-8606-0fd5745c1f5f)

### 4.5. Sin opciones

Si no quieres validar los enlaces, ni quieres ver sus estadisticas, pero quieres ver información básica de los enlaces, puedes usar solo el nombre de la ruta.

* Ejemplo de uso:

`npx markdownlinks-stats <directorio o archivo.md>`

![sin opciones](https://github.com/paolandre/DEV007-md-links/assets/129551206/41fb3873-8820-40f9-8add-210598e72c03)

### 4.6. Opción no valida

También recibirás un mensaje si tu opción es invalida.

![Opcion no valida](https://github.com/paolandre/DEV007-md-links/assets/129551206/ec337a8f-ce9e-4f69-98fb-6d03456ac22c)

Con estas opciones, puedes personalizar el análisis de "markdownlinks-stats" según tus necesidades y obtener la información que requieras sobre los enlaces en tus archivos Markdown.

## 5. Requisitos

Antes de utilizar la librería "markdownlinks-stats", asegúrate de cumplir con los siguientes requisitos:

* Node.js: "markdownlinks-stats" es una herramienta de línea de comandos (CLI) que se ejecuta con Node.js. Asegúrate de tener Node.js instalado en tu computadora. Puedes descargar la última versión estable desde el sitio oficial: [Node](https://nodejs.org/)

* Sistema operativo: "markdownlinks-stats" es compatible con sistemas operativos Windows, macOS y Linux. Puedes utilizarlo en cualquiera de estos sistemas sin problemas.

* Archivos Markdown: La herramienta "markdownlinks-stats" está diseñada para analizar archivos Markdown (.md). Asegúrate de tener uno o varios archivos Markdown en tu proyecto para utilizar la herramienta de manera efectiva.

* Acceso a Internet: Si decides utilizar la opción --validate para verificar la validez de los enlaces, asegúrate de tener acceso a Internet para realizar las peticiones HTTP y obtener el estado de los enlaces.

## 6. Diagrama de flujo

El diagrama de flujo ha sido una herramienta valiosa para el desarrollo de "markdownlinks-stats", permitiendo una comprensión clara del flujo de trabajo. Este diagrama de flujo representa la estructura general de "markdownlinks-stats":

### 6.1 API

![API](https://github.com/paolandre/DEV007-md-links/assets/129551206/6968546a-d40a-4d1d-902a-4b385d6eb62e)


### 6.2 CLI

![CLI](https://github.com/paolandre/DEV007-md-links/assets/129551206/d0d4a7f3-c18a-4314-8f5c-5f84866a8ee3)


## 7. Tests unitarios

Para garantizar el correcto funcionamiento de "markdownlinks-stats" y asegurar que cada una de sus funcionalidades trabaja como se espera, se han implementado pruebas unitarias exhaustivas utilizando el framework de pruebas Jest:

![Tests](https://github.com/paolandre/DEV007-md-links/assets/129551206/99425bb4-3360-4029-975a-07ea7a7d77f6)




