# Node User CRUD MongoDB API

Examen Práctico: Creación de una API RESTful para Gestión de Usuarios desarrollado en Node.JS, Express y MongoDB con autentificacion de privilegios del usuario por medio de JWT.

## Instalacion

Utilizar el gestor de paquetes [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) e instalar [Node.js](https://nodejs.org/en) para poder utilizar el proyecto.

Clonar el repositorio
```bash
git clone https://github.com/JuanMa7u7/examen-gaso-crud-usuarios.git
```

Generar un archivo **.env** y almacenarlo en la raiz del proyecto con la siguiente informacion:
```bash
#Puero eschucha del servidor Node.js
PORT=5100
#Direccion de la base de datos
DB_SERVER=localhost
#Puerto escucha de la base de datos
DB_PORT=27017
#Nombre del modelo de la base de datos 
DB_MODEL=examen-gaso
#Frase para la generacion del JWT (Puede ser cualquiera pero entre mas extensa mejor)
JWT_SECRET=this-is-an-awesome-secret-key
```
Levantar el servidor Node.js

```bash
npm install
npm run dev
```

## Uso

Una vez este arriba el servidor Node.js, se puede acceder a la documentacion a traves del siguiente endpoint: **/api-doc**

## License

[ISC](https://opensource.org/license/isc-license-txt)