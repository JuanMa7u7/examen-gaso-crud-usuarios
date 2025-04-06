import app from '../app.js';
import request from 'supertest';

describe('POST /auth', () => {
    const ENDPOINT = '/auth';
    const BODY = {
        email: "juan@ma.com",
        password: "Abcd1234!"
    };
    test('La respuesta debe regresar un codigo de estatus HTTP 200', async () => {
        const response = await request(app)
            .post(ENDPOINT)
            .send(BODY);
        expect(response.statusCode).toBe(200);
    });

    test('La respuesta debe de venir en formato JSON', async () => {
        const response = await request(app)
            .post(ENDPOINT)
            .send(BODY);
        expect(JSON.parse(response.text)).toBeInstanceOf(Object);
    });

    test('La respuesta en formato JSON debe de contener la clave "token"', async () => {
        const response = await request(app)
            .post(ENDPOINT)
            .send(BODY);
        expect(Object.keys(JSON.parse(response.text))[0]).toBe('token');
    });

    test('La clave "token" de la respuesta JSON debe de contener un valor de tipo string', async () => {
        const response = await request(app)
            .post(ENDPOINT)
            .send(BODY);
        expect(typeof JSON.parse(response.text).token).toBe('string');
    });

    test('Si no se envia un usuario y contraseña, debe de regresar un codigo de estatus HTTP 500', async () => {
        const response = await request(app)
            .post(ENDPOINT)
            .send();
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });

    test('Si se envia un usuario que no existe, debe de regresar un codigo de estatus HTTP 500', async () => {
        const response = await request(app)
            .post(ENDPOINT)
            .send({ ...BODY, email: 'no@existo.com' });
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });

    test('Si se envia una contraseña incorrecta, debe de regresar un codigo de estatus HTTP 401', async () => {
        const response = await request(app)
            .post(ENDPOINT)
            .send({ ...BODY, password: 'badPassword' });
        console.error(response.text);
        expect(response.statusCode).toBe(401);
    });

});