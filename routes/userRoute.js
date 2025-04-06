import express from 'express';
import userController from '../controllers/userController.js';
const route = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    UserPost:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Nombre del usuario
 *        email:
 *          type: string
 *          description: Correo electronico del usuario
 *        password:
 *          type: string
 *          description: Contraseña del usuario
 *        role:
 *          type: string
 *          description: Rol de priviliegios del usuario
 *      required:
 *        - name
 *        - email
 *        - password
 *      example:
 *        name: Juan
 *        email: juan@ma.com
 *        password: Abcd1234!
 *        role: admin
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserGet:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Nombre del usuario
 *          example: Juan
 *        email:
 *          type: string
 *          description: Correo electronico del usuario
 *          example: juan@ma.com
 *        password:
 *          type: string
 *          description: Contraseña del usuario
 *          example: Abcd123!
 *        creation_date:
 *          type: string
 *          description: Fecha de creacion del usuario
 *          example: 2025-04-04 20:29:15
 *        role:
 *          type: object
 *          description: Priviliegios del usuario
 *          properties:
 *            name:
 *              type: string
 *              description: Nombre del rol
 *              example: admin  
 *            create:
 *              type: boolean
 *              description: Privilegio de creacion  
 *            read:
 *              type: boolean
 *              description: Privilegio de lectura  
 *            update:
 *              type: boolean
 *              description: Privilegio de actualizacion  
 *            delete:
 *              type: boolean
 *              description: Privilegio de eliminacion  
 */

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Crea un nuevo usuario
 *    tags: [users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/UserPost'
 *    responses:
 *      201:
 *        description: El usuario fue creado con exito
 *      403:
 *        description: El usuario solicitante no cuenta con privilegios suficientes para operar la funcionalidad
 *      500:
 *        description: Error al crear el usuario
 */
route.post('/', userController.create);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: Obtiene un usuario a partir de su id
 *    tags: [users]
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del usuario
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: El usuario solicitado
 *        content:
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/UserGet'
 *      403:
 *        description: El usuario solicitante no cuenta con privilegios suficientes para operar la funcionalidad
 *      500:
 *        description: Error al obtener el usuario
 */
route.get('/:id', userController.getOne);

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Obtiene todos los usuarios registrados
 *    tags: [users]
 *    parameters:
 *      - name: name
 *        in: query
 *        description: Filtro para buscar por el nombre del usuario
 *        schema:
 *          type: string
 *      - name: email
 *        in: query
 *        description: Filtro para buscar por el correo electronico del usuario
 *        schema:
 *          type: string
 *      - name: date
 *        in: query
 *        description: Filtro para buscar por la fecha de creacion del usuario
 *        schema:
 *          type: string
 *      - name: sort
 *        in: query
 *        description: Filtro para ordenar los resultados de forma ascendente indicando el dato por el cual ordenar (name, email, date)
 *        schema:
 *          type: string
 *      - name: limit
 *        in: query
 *        description: Filtro para limitar la cantidad de registros a obtener
 *        schema:
 *          type: integer
 *      - name: page
 *        in: query
 *        description: Filtro para paginar la consulta (es necesario el parametro limit para poder realizar la paginacion)
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Todos los usuarios registrados
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/UserGet'
 *      403:
 *        description: El usuario solicitante no cuenta con privilegios suficientes para operar la funcionalidad
 *      500:
 *        description: Error al obtener los usuarios
 */
route.get('/', userController.getAll);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Actualiza por completo un usuario
 *    tags: [users]
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del usuario
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/UserPost'
 *    responses:
 *      200:
 *        description: El usuario fue actualizado con exito
 *      403:
 *        description: El usuario solicitante no cuenta con privilegios suficientes para operar la funcionalidad
 *      500:
 *        description: Error al actualizar el usuario
 */
route.put('/:id', userController.update);

/**
 * @swagger
 * /users/{id}:
 *  patch:
 *    summary: Actualiza parcialmente un usuario
 *    tags: [users]
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del usuario
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/UserPost'
 *    responses:
 *      200:
 *        description: El usuario fue actualizado con exito
 *      403:
 *        description: El usuario solicitante no cuenta con privilegios suficientes para operar la funcionalidad
 *      500:
 *        description: Error al actualizar el usuario
 */
route.patch('/:id', userController.patch);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: Crea un nuevo usuario
 *    tags: [users]
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del usuario
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      206:
 *        description: El usuario fue eliminado con exito
 *      403:
 *        description: El usuario solicitante no cuenta con privilegios suficientes para operar la funcionalidad
 *      500:
 *        description: Error al eliminar el usuario
 */
route.delete('/:id', userController.delete);

export default route;