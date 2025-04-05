import userModel from "../models/userModel.js";
import sanitizeRequest from "../helpers/sanitizeRequest.js";
import validateEmailFormat from "../helpers/validateEmailFormat.js";
import validatePasswordSecurity from "../helpers/validatePasswordSecurity.js";

class UserController {

    constructor() {

    }

    async create(request, response) {
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

    async delete(request, response) {
        try {
            response.status(206).json({ status: 'delete-ok' });
        } catch (e) {
            response.status(500).send(e);
        }
    }

    async getAll(request, response) {
        try {
            response.status(201).json({ status: 'getall-ok' });
        } catch (e) {
            response.status(500).send(e);
        }
    }

    async getOne(request, response) {
        try {
            response.status(201).json({ status: 'getone-ok' });
        } catch (e) {
            response.status(500).send(e);
        }
    }
}

export default new UserController;