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

Markdown Links Validator es una herramienta de línea de comandos (CLI) y una librería en JavaScript que permite leer y analizar archivos en formato [Markdown](https://es.wikipedia.org/wiki/Markdown) para verificar los links que contengan y reportar algunas estadísticas. Es especialmente útil para desarrolladores que trabajan con archivos Markdown que contienen enlaces a sitios web.

La herramienta te permitirá obtener información sobre los enlaces encontrados, como la URL, el texto anclado y la ruta del archivo donde se encontraron los enlaces. Además, podrás validar los enlaces realizando peticiones HTTP para comprobar su estado (ok o fail), así como mostrar estadísticas de los links.

## 2. Instalación

Para poder utilizar la librería "md-links" en tu proyecto, sigue estos pasos:

* Asegúrate de tener Node.js instalado en tu computadora. Puedes descargar la última versión estable desde el sitio oficial: https://nodejs.org/

* Crea un nuevo directorio en tu proyecto si aún no tienes uno, o asegúrate de estar ubicado en la carpeta raíz de tu proyecto.

* Abre una terminal o línea de comandos en tu sistema operativo.

* Ejecuta el siguiente comando para instalar la librería "md-links" de manera global en tu sistema:

`npm install -g md-links-validator-stats`

Esto te permitirá usar la herramienta "md-links" en cualquier proyecto y desde cualquier ubicación en tu computadora.

Si prefieres instalar la librería solo en tu proyecto actual, puedes ejecutar el siguiente comando en la carpeta raíz de tu proyecto:

`npm i md-links-validator-stats`

Esto instalará las siguientes librerías y herramientas utilizadas por md-links:

* `axios:` Para hacer peticiones HTTP y obtener el contenido de los archivos Markdown.
* `string-gradient:` Para dar estilos a algunas salidas en la terminal.
* `babel` Para transpilar el código de ES6+ a ES5 y asegurar la compatibilidad con diferentes versiones de Node.js.
* `boxen y chalk:`   Para dar un formato visual más agradable en algunas salidas de la terminal.

¡Listo! Ahora ya tienes la librería "md-links" instalada en tu proyecto. Puedes comenzar a usarla para analizar y obtener información sobre los enlaces presentes en tus archivos Markdown.

## 3. Uso

Una vez que has instalado la librería "md-links" en tu proyecto, puedes comenzar a utilizarla desde la línea de comandos o desde tu propio código JavaScript.
### Uso desde la línea de comandos

Para usar "md-links" desde la línea de comandos, simplemente abre una terminal o línea de comandos en la ubicación de tu proyecto y ejecuta el siguiente comando:

* `md-links <path-to-file-or-directory>`

Reemplaza <path-to-file-or-directory> con la ruta al archivo o directorio que deseas analizar. "md-links" analizará los archivos Markdown en esa ubicación y te mostrará información sobre los enlaces encontrados, incluyendo la URL, el texto del enlace y el estado de la URL.

Adicionalmente, puedes agregar las siguientes opciones para obtener información adicional:

* `--validate:` Realiza una petición HTTP a cada URL encontrada para verificar si el enlace está roto o es válido. Además de mostrar la información básica de los enlaces, se añadirá el estado de la URL y un mensaje indicando si está roto o no.

* `--stats:` Muestra un resumen estadístico de los enlaces encontrados. Incluye el número total de enlaces y el número de enlaces únicos.

* `--validate --stats:` Combina las opciones de validación y estadísticas para obtener un resumen que incluya el total de enlaces, enlaces únicos y enlaces rotos.

##### Ejemplos:

* Analizar un archivo específico:

`md-links example.md`

* Analizar un directorio:

`md-links docs`

* Analizar un directorio o archivo con opciones de validación y estadísticas:

`md-links docs --validate --stats`

## 4. Opciones

"md-links" cuenta con algunas opciones que puedes utilizar para personalizar el análisis de los enlaces en tus archivos Markdown.

### 4.1. Opción --validate

Al agregar esta opción, "md-links" realizará una petición HTTP a cada URL encontrada para verificar si el enlace está roto o es válido. Esta opción es útil para asegurarte de que todos los enlaces en tus archivos Markdown estén funcionando correctamente.

* Ejemplo de uso:

`md-links <path> --validate>`

### 4.2. Opción --stats

La opción --stats muestra un resumen estadístico de los enlaces encontrados en tus archivos Markdown. Incluye el número total de enlaces y el número de enlaces únicos. Esta opción es útil para obtener una visión general de la cantidad de enlaces presentes en tus archivos.

* Ejemplo de uso:

`md-links <path> --stats`

### 4.3. Combinación de opciones

Puedes combinar las opciones --validate y --stats para obtener un resumen que incluya el total de enlaces, enlaces únicos y enlaces rotos.

* Ejemplo de uso:

`md-links <path> --validate --stats`

### 4.4. Opción --help

Si en algún momento necesitas recordar las opciones disponibles y su uso, puedes utilizar la opción --help para mostrar la ayuda en la terminal.

* Ejemplo de uso:

`md-links --help`

Con estas opciones, puedes personalizar el análisis de "md-links" según tus necesidades y obtener la información que requieras sobre los enlaces en tus archivos Markdown.

Recuerda que puedes utilizar estas opciones tanto desde la línea de comandos como desde tu propio código JavaScript al importar "md-links" como un módulo.

## 5. Requisitos

Antes de utilizar la librería "md-links", asegúrate de cumplir con los siguientes requisitos:

* Node.js: "md-links" es una herramienta de línea de comandos (CLI) que se ejecuta con Node.js. Asegúrate de tener Node.js instalado en tu computadora. Puedes descargar la última versión estable desde el sitio oficial: [Node.js](https://nodejs.org/)

* Sistema operativo: "md-links" es compatible con sistemas operativos Windows, macOS y Linux. Puedes utilizarlo en cualquiera de estos sistemas sin problemas.

* Archivos Markdown: La herramienta "md-links" está diseñada para analizar archivos Markdown (.md). Asegúrate de tener uno o varios archivos Markdown en tu proyecto para utilizar la herramienta de manera efectiva.

* Acceso a Internet: Si decides utilizar la opción --validate para verificar la validez de los enlaces, asegúrate de tener acceso a Internet para realizar las peticiones HTTP y obtener el estado de los enlaces.

## 6. Diagrama de flujo

El diagrama de flujo ha sido una herramienta valiosa para el desarrollo de "md-links", permitiendo una comprensión clara del flujo de trabajo. Este diagrama de flujo representa la estructura general de "md-links":

### 6.1 API

### 6.2 CLI


## 7. Tests unitarios

Para garantizar el correcto funcionamiento de "md-links" y asegurar que cada una de sus funcionalidades trabaja como se espera, se han implementado pruebas unitarias exhaustivas utilizando el framework de pruebas Jest:



