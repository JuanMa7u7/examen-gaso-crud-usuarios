import jwt from 'jsonwebtoken';
import 'dotenv/config';
import authModel from "../models/authModel.js";
import sanitizeRequest from "../helpers/sanitizeRequest.js";

class AuthController {

    constructor() {

    }

    async login(request, response) {
        try {
            sanitizeRequest(request);
            const email = request.body.email || '';
            const password = request.body.password || '';
            const user = await authModel.login(email);
            if (!user) {
                response.status(401).send('Email o contraseña no validos.');
                return;
            }
            if (user.password !== password) {
                response.status(401).send('Email o contraseña no validos.');
                return;
            }

            const token = jwt.sign(
                { id: user._id, username: user.username, permissions: user.permissions },
                process.env.JWT_SECRET
            );
            response.json({ token });
        } catch (e) {
            response.status(500).send(e.message);
        }
    }
}

export default new AuthController;