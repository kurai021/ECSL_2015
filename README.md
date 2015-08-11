###Como iniciar la presentación

Solo debes tener instalado Node.js y Grunt y ejecutar:

```
$ grunt serve

```

###Los ejemplos funcionan de la siguiente forma

* Entrar a la carpeta de ejemplos y luego a servers
* Iniciar el script server.js con "node server.js"
* En el navegador debes escribir localhost:8321/nombre-ejemplo, en donde nombre-ejemplo es cualquiera de las carpetas localizadas en /servers (node_modules son las dependencias del servidor).
* salir a la carpeta de ejemplos e instalar cualquiera de los cuatro ejemplos con WebIDE, cambiar ws = new WebSocket('ws://192.168.43.189:8322'); por la IP de tu router, el puerto 8322 es necesario.