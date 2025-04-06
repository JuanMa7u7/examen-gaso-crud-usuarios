import app from '../app.js';
import request from 'supertest';

const getToken = async (body) => {
    const response = await request(app)
        .post('/auth')
        .send(body);
    return response;
}

const createUser = async (body, token) => {
    const response = await request(app)
        .post(ENDPOINT)
        .set('Authorization', token)
        .send(body);
    return response;
}

const getUserByID = async (id, token) => {
    const getUserResponse = await request(app)
        .get(`${ENDPOINT}/${id}`)
        .set('Authorization', token)
        .send();
    return getUserResponse._body;
}

const getUserByEmail = async (email, token) => {
    const getUserResponse = await request(app)
        .get(`${ENDPOINT}?email=${email}`)
        .set('Authorization', token)
        .send();
    return getUserResponse._body[0];
}

const deleteUser = async (id, token) => {
    const deleteUserResponse = await request(app)
        .delete(`${ENDPOINT}/${id}`)
        .set('Authorization', token)
        .send();
    return deleteUserResponse;
}

const USER_TEMPLATE = {
    name: "Test POST",
    email: "test@post.com",
    password: "Wchu8457!",
    role: "user",
}

const ADMIN_USER_BODY = {
    email: "juan@ma.com",
    password: "Abcd1234!"
};

const USER_BODY = {
    email: "pedro@picapiedra.com",
    password: "Zyxw0987@"
};

const ENDPOINT = '/users'


describe('GET /users', () => {

    const FILTERS = {
        name: 'and',
        email: '@pica',
        date: '2025',
        sort: 'name',
        limit: 2,
        page: 1
    }

    test('La respuesta debe regresar un codigo de estatus HTTP 200', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await request(app)
            .get(ENDPOINT)
            .set('Authorization', responseToken._body.token)
            .send();
        expect(response.statusCode).toBe(200);
    });

    test('La respuesta debe de venir en formato JSON', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await request(app)
            .get(ENDPOINT)
            .set('Authorization', responseToken._body.token)
            .send();
        expect(JSON.parse(response.text)).toBeInstanceOf(Object);
    });

    test('La respuesta al usar el filtro "name" debe de ser en formato JSON', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await request(app)
            .get(`${ENDPOINT}?name=${FILTERS.name}`)
            .set('Authorization', responseToken._body.token)
            .send();
        console.log(response.text)
        expect(JSON.parse(response.text)).toBeInstanceOf(Object);
    });

    test('La respuesta al usar el filtro "email" debe de ser en formato JSON', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await request(app)
            .get(`${ENDPOINT}?email=${FILTERS.email}`)
            .set('Authorization', responseToken._body.token)
            .send();
        console.log(response.text)
        expect(JSON.parse(response.text)).toBeInstanceOf(Object);
    });

    test('La respuesta al usar el filtro "date" debe de ser en formato JSON', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await request(app)
            .get(`${ENDPOINT}?date=${FILTERS.date}`)
            .set('Authorization', responseToken._body.token)
            .send();
        console.log(response.text)
        expect(JSON.parse(response.text)).toBeInstanceOf(Object);
    });

    test('La respuesta al usar el filtro "sort" debe de ser en formato JSON', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await request(app)
            .get(`${ENDPOINT}?sort=${FILTERS.sort}`)
            .set('Authorization', responseToken._body.token)
            .send();
        console.log(response.text)
        expect(JSON.parse(response.text)).toBeInstanceOf(Object);
    });

    test('La respuesta al usar el filtro "limit" debe de ser en formato JSON', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await request(app)
            .get(`${ENDPOINT}?limit=${FILTERS.limit}`)
            .set('Authorization', responseToken._body.token)
            .send();
        console.log(response.text)
        expect(JSON.parse(response.text)).toBeInstanceOf(Object);
    });

    test('La respuesta al usar el filtro "page" debe de ser en formato JSON', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await request(app)
            .get(`${ENDPOINT}?limit=${5}&page=${FILTERS.page}`)
            .set('Authorization', responseToken._body.token)
            .send();
        console.log(response.text)
        expect(JSON.parse(response.text)).toBeInstanceOf(Object);
    });

    test('Al consumir el endpoint con un token no valido, debe de regresar un codigo de estatus HTTP 401', async () => {
        const response = await request(app)
            .get(ENDPOINT)
            .set('Authorization', 'badToken')
            .send();
        expect(response.statusCode).toBe(401);
    });

});

describe('GET /users:id', () => {

    const USER_ID = '67f0957b0a54fa98c0fc4174';

    test('La respuesta debe regresar un codigo de estatus HTTP 200', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await request(app)
            .get(`${ENDPOINT}/${USER_ID}`)
            .set('Authorization', responseToken._body.token)
            .send();
        expect(response.statusCode).toBe(200);
    });

    test('La respuesta debe de venir en formato JSON', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await request(app)
            .get(`${ENDPOINT}/${USER_ID}`)
            .set('Authorization', responseToken._body.token)
            .send();
        expect(JSON.parse(response.text)).toBeInstanceOf(Object);
    });

    test('Al ingresar un id que no este asociado a ningun usuario, debe de regresar un codigo de estatus HTTP 500', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await request(app)
            .get(`${ENDPOINT}/idNoValido`)
            .set('Authorization', responseToken._body.token)
            .send();
        expect(response.statusCode).toBe(500);
    });

    test('Al consumir el endpoint con un token no valido, debe de regresar un codigo de estatus HTTP 401', async () => {
        const response = await request(app)
            .get(`${ENDPOINT}/${USER_ID}`)
            .set('Authorization', 'badToken')
            .send();
        expect(response.statusCode).toBe(401);
    });
});

describe('POST /users', () => {

    test('Al crear correctamente un usuario, debe de regresar un codigo de estatus HTTP 201', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await createUser(USER_TEMPLATE, responseToken._body.token);
        const user = await getUserByEmail(USER_TEMPLATE.email, responseToken._body.token);
        console.log(user);
        await deleteUser(user._id, responseToken._body.token);
        expect(response.statusCode).toBe(201);
    });

    test('Si no se envia el campo "name", debe de regresar un codigo de estatus HTTP 500', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await createUser({ ...USER_TEMPLATE, name: undefined }, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });

    test('Si se envia el campo "name" como un tipo de dato diferente a un string, debe de regresar un codigo de estatus HTTP 500', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await createUser({ ...USER_TEMPLATE, name: 1 }, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });

    test('Si no se envia el campo "email", debe de regresar un codigo de estatus HTTP 500', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await createUser({ ...USER_TEMPLATE, email: undefined }, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });

    test('Si se envia el campo "email" como un tipo de dato diferente a un string, debe de regresar un codigo de estatus HTTP 500', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await createUser({ ...USER_TEMPLATE, email: 1 }, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });

    test('Si se envia el campo "email" en un formato no valido de correo electronico, debe de regresar un codigo de estatus HTTP 500', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await createUser({ ...USER_TEMPLATE, email: 'email@malo.' }, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });

    test('Si no se envia el campo "password", debe de regresar un codigo de estatus HTTP 500', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await createUser({ ...USER_TEMPLATE, password: undefined }, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });

    test('Si se envia el campo "password" como un tipo de dato diferente a un string, debe de regresar un codigo de estatus HTTP 500', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await createUser({ ...USER_TEMPLATE, password: 1 }, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });

    test('Si se envia el campo "password" sin cumplir los requisitos de seguridad, debe de regresar un codigo de estatus HTTP 500', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await createUser({ ...USER_TEMPLATE, password: 'p455w0rdm4l0' }, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });


    test('Si se especifica un rol inexistente para el usuario, debe de regresar un codigo de estatus HTTP 500', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await createUser({ ...USER_TEMPLATE, role: 'client' }, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });

    test('Si se especifica un email que ya se encuentra registrado, debe de regresar un codigo de estatus HTTP 500', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await createUser({ ...USER_TEMPLATE, email: 'juan@ma.com' }, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });

    test('Si se intenta consumir el endpoint autenticado con un usuario sin el privilegio "create", debe de regresar un codigo de estatus HTTP 403', async () => {
        const responseToken = await getToken(USER_BODY);
        const response = await createUser(USER_TEMPLATE, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(403);
    });

});

describe('PUT /users', () => {
    test('La respuesta debe regresar un codigo de estatus HTTP 200', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        await createUser(USER_TEMPLATE, responseToken._body.token);
        const user = await getUserByEmail(USER_TEMPLATE.email, responseToken._body.token);
        console.log(user)
        const response = await request(app)
            .put(`${ENDPOINT}/${user._id.toString()}`)
            .set('Authorization', responseToken._body.token)
            .send({ ...USER_TEMPLATE, name: 'Test PUT' });
        const userUPT = await getUserByID(user._id, responseToken._body.token);
        console.log(userUPT);
        await deleteUser(user._id, responseToken._body.token);
        expect(response.statusCode).toBe(200);
    });

    test('Si se intenta consumir el endpoint autenticado con un usuario sin el privilegio "update", debe de regresar un codigo de estatus HTTP 403', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        await createUser(USER_TEMPLATE, responseToken._body.token);
        const user = await getUserByEmail(USER_TEMPLATE.email, responseToken._body.token);
        const responseTokenUsr = await getToken(USER_BODY);
        const response = await request(app)
            .put(`${ENDPOINT}/${user._id.toString()}`)
            .set('Authorization', responseTokenUsr._body.token)
            .send({ ...USER_TEMPLATE, name: 'Test PUT' });
        await deleteUser(user._id, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(403);
    });
});

describe('PATCH /users', () => {
    test('La respuesta debe regresar un codigo de estatus HTTP 200', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        await createUser(USER_TEMPLATE, responseToken._body.token);
        const user = await getUserByEmail(USER_TEMPLATE.email, responseToken._body.token);
        console.log(user)
        const response = await request(app)
            .patch(`${ENDPOINT}/${user._id.toString()}`)
            .set('Authorization', responseToken._body.token)
            .send({ name: 'Test PATCH' });
        const userUPT = await getUserByID(user._id, responseToken._body.token);
        console.log(userUPT);
        await deleteUser(user._id, responseToken._body.token);
        expect(response.statusCode).toBe(200);
    });

    test('Si se intenta consumir el endpoint autenticado con un usuario sin el privilegio "update", debe de regresar un codigo de estatus HTTP 403', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        await createUser(USER_TEMPLATE, responseToken._body.token);
        const user = await getUserByEmail(USER_TEMPLATE.email, responseToken._body.token);
        const responseTokenUsr = await getToken(USER_BODY);
        const response = await request(app)
            .patch(`${ENDPOINT}/${user._id.toString()}`)
            .set('Authorization', responseTokenUsr._body.token)
            .send({ name: 'Test PATCH' });
        await deleteUser(user._id, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(403);
    });
});

describe('DELETE /users', () => {

    test('La respuesta debe regresar un codigo de estatus HTTP 206', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        await createUser(USER_TEMPLATE, responseToken._body.token);
        const user = await getUserByEmail(USER_TEMPLATE.email, responseToken._body.token);
        const response = await deleteUser(user._id, responseToken._body.token);
        console.log(response.text);
        expect(response.statusCode).toBe(206);
    });


    test('Si no se envia ningun id, se regresa un codigo de estatus HTTP 500', async () => {
        const responseToken = await getToken(ADMIN_USER_BODY);
        const response = await deleteUser(undefined, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(500);
    });

    test('Si se intenta consumir el endpoint autenticado con un usuario sin el privilegio "delete", debe de regresar un codigo de estatus HTTP 403', async () => {
        const responseToken = await getToken(USER_BODY);
        const response = await deleteUser(undefined, responseToken._body.token);
        console.error(response.text);
        expect(response.statusCode).toBe(403);
    });
});