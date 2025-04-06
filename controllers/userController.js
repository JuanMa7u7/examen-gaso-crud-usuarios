import userModel from "../models/userModel.js";
import verifyJWT from "../helpers/verifyJWT.js";
import sanitizeRequest from "../helpers/sanitizeRequest.js";
import validateEmailFormat from "../helpers/validateEmailFormat.js";
import validatePasswordSecurity from "../helpers/validatePasswordSecurity.js";

class UserController {

    constructor() {

    }

    async create(request, response) {
        verifyJWT(request, response);
        if (request.userTKN.permissions.create != true) {
            response.status(403).send('Acceso denegado');
            return;
        }
        try {
            sanitizeRequest(request);
            const BODY = request.body;
            // SE VALIDA EL CUERPO DE LA PETICION
            if (typeof BODY.name == 'undefined')
                throw new Error('El campo nombre es obligatorio.');
            if (typeof BODY.name != 'string')
                throw new Error('El campo nombre debe de ser una cadena de texto.');
            if (typeof BODY.email == 'undefined')
                throw new Error('El campo email es obligatorio.');
            if (typeof BODY.email != 'string')
                throw new Error('El campo email debe de ser una cadena de texto.');
            if (validateEmailFormat(BODY.email) == false)
                throw new Error('El email no tiene un formato correcto.');
            if (typeof BODY.password == 'undefined')
                throw new Error('El campo password es obligatorio.');
            if (typeof BODY.password != 'string')
                throw new Error('El campo password debe de ser una cadena de texto.');
            if (validatePasswordSecurity(BODY.password) == false)
                throw new Error('La contraseña no cumple con los requisitos de seguridad (mínimo 8 caracteres, mayúsculas, minúsculas y símbolos).');
            if (typeof BODY.role != 'string')
                BODY.role = 'user'

            const data = await userModel.create(BODY);
            if (data.success == true)
                response.status(201).send('El usuario fue creado de forma correcta.');
            else
                throw new Error('Error al crear el usuario.');
        } catch (e) {
            response.status(500).send(e.message);
        }
    }

    async update(request, response) {
        verifyJWT(request, response);
        if (request.userTKN.permissions.update != true) {
            response.status(403).send('Acceso denegado');
            return;
        }
        try {
            sanitizeRequest(request);
            const { id } = request.params;
            const BODY = request.body || {};
            // SE VALIDA EL CUERPO DE LA PETICION
            if (typeof BODY.name != 'undefined')
                if (typeof BODY.name != 'string')
                    throw new Error('El campo nombre debe de ser una cadena de texto.');
            if (typeof BODY.email != 'undefined') {
                if (typeof BODY.email != 'string')
                    throw new Error('El campo email debe de ser una cadena de texto.');
                if (validateEmailFormat(BODY.email) == false)
                    throw new Error('El email no tiene un formato correcto.');
            }
            if (typeof BODY.password != 'undefined') {
                if (typeof BODY.password != 'string')
                    throw new Error('El campo password debe de ser una cadena de texto.');
                if (validatePasswordSecurity(BODY.password) == false)
                    throw new Error('La contraseña no cumple con los requisitos de seguridad (mínimo 8 caracteres, mayúsculas, minúsculas y símbolos).');
            }
            if (typeof BODY.role != 'undefined') {
                if (typeof BODY.role != 'string')
                    throw new Error('El campo role debe de ser una cadena de texto.');
            }

            const data = await userModel.update(id, BODY);
            if (data.success == true)
                response.status(200).send('El usuario se actualizo de forma correcta.');
            else
                throw new Error('Error al actualizar el usuario.');
        } catch (e) {
            response.status(500).send(e.message);
        }
    }

    async patch(request, response) {
        verifyJWT(request, response);
        if (request.userTKN.permissions.update != true) {
            response.status(403).send('Acceso denegado');
            return;
        }
        try {
            sanitizeRequest(request);
            const { id } = request.params;
            const BODY = request.body || {};
            // SE VALIDA EL CUERPO DE LA PETICION
            if (typeof BODY.name != 'undefined')
                if (typeof BODY.name != 'string')
                    throw new Error('El campo nombre debe de ser una cadena de texto.');
            if (typeof BODY.email != 'undefined') {
                if (typeof BODY.email != 'string')
                    throw new Error('El campo email debe de ser una cadena de texto.');
                if (validateEmailFormat(BODY.email) == false)
                    throw new Error('El email no tiene un formato correcto.');
            }
            if (typeof BODY.password != 'undefined') {
                if (typeof BODY.password != 'string')
                    throw new Error('El campo password debe de ser una cadena de texto.');
                if (validatePasswordSecurity(BODY.password) == false)
                    throw new Error('La contraseña no cumple con los requisitos de seguridad (mínimo 8 caracteres, mayúsculas, minúsculas y símbolos).');
            }
            if (typeof BODY.role != 'undefined') {
                if (typeof BODY.role != 'string')
                    throw new Error('El campo role debe de ser una cadena de texto.');
            }

            const data = await userModel.patch(id, BODY);
            if (data.success == true)
                response.status(200).send('El usuario se actualizo de forma correcta.');
            else
                throw new Error('Error al actualizar el usuario.');
        } catch (e) {
            response.status(500).send(e.message);
        }
    }

    async delete(request, response) {
        verifyJWT(request, response);
        if (request.userTKN.permissions.delete != true) {
            response.status(403).send('Acceso denegado');
            return;
        }
        try {
            sanitizeRequest(request);
            const { id } = request.params;
            const data = await userModel.delete(id);
            if (data.success == true)
                response.status(206).send('El usuario fue eliminado de forma correcta.');
        } catch (e) {
            response.status(500).send(e.message);
        }
    }

    async getAll(request, response) {
        verifyJWT(request, response);
        if (request.userTKN.permissions.read != true) {
            response.status(403).send('Acceso denegado');
            return;
        }
        try {
            sanitizeRequest(request);
            const dataFilters = {
                name: request.query.name,
                email: request.query.email,
                creation_date: request.query.date
            }
            const page = parseInt(request.query.page);
            const limit = parseInt(request.query.limit);
            const sort = request.query.sort;

            const data = await userModel.getAll({ data: dataFilters, page, limit, sort });
            response.status(200).json(data);
        } catch (e) {
            response.status(500).send(e.message);
        }
    }

    async getOne(request, response) {
        verifyJWT(request, response);
        if (request.userTKN.permissions.read != true) {
            response.status(403).send('Acceso denegado');
            return;
        }
        try {
            sanitizeRequest(request);
            const { id } = request.params;
            const data = await userModel.getOne(id);
            response.status(200).json(data);
        } catch (e) {
            response.status(500).send(e.message);
        }
    }
}

export default new UserController;