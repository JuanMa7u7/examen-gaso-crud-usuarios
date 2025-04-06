import express from 'express';
import authController from '../controllers/authController.js';
const route = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: Correo electronico del usuario
 *        password:
 *          type: string
 *          description: Contraseña del usuario
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: juan@ma.com
 *        password: Abcd1234!
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    LoginToken:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          description: Token de autenticacion del usuario
 *          example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJZekV6TUdkb01ISm5PSEJpT0cxaWJEaHlOVEE9IiwicmVzcG9uc2VfdHlwZSI6ImNvZGUiLCJzY29wZSI6ImludHJvc2NwZWN0X3Rva2VucywgcmV2b2tlX3Rva2VucyIsImlzcyI6ImJqaElSak0xY1hwYWEyMXpkV3RJU25wNmVqbE1iazQ0YlRsTlpqazNkWEU9Iiwic3ViIjoiWXpFek1HZG9NSEpuT0hCaU9HMWliRGh5TlRBPSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0Ojg0NDMve3RpZH0ve2FpZH0vb2F1dGgyL2F1dGhvcml6ZSIsImp0aSI6IjE1MTYyMzkwMjIiLCJleHAiOiIyMDIxLTA1LTE3VDA3OjA5OjQ4LjAwMCswNTQ1In0.IxvaN4ER-PlPgLYzfRhk_JiY4VAow3GNjaK5rYCINFsEPa7VaYnRsaCmQVq8CTgddihEPPXet2laH8_c3WqxY4AeZO5eljwSCobCHzxYdOoFKbpNXIm7dqHg_5xpQz-YBJMiDM1ILOEsER8ADyF4NC2sN0K_0t6xZLSAQIRrHvpGOrtYr5E-SllTWHWPmqCkX2BUZxoYNK2FWgQZpuUOD55HfsvFXNVQa_5TFRDibi9LsT7Sd_az0iGB0TfAb0v3ZR0qnmgyp5pTeIeU5UqhtbgU9RnUCVmGIK-SZYNvrlXgv9hiKAZGhLgeI8hO40utfT2YTYHgD2Aiufqo3RIbJA
 */

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Autentifica al usuario y le genera un token a partir de los privilegios que tiene asignados
 *    tags: [auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      201:
 *        description: El usuario fue creado con exito
 *        content:
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/LoginToken'
 *      401:
 *        description: El usuario o la contraseña no son validas
 *      500:
 *        description: Error al autenticar la sesion
 */
route.post('/', authController.login);

export default route;