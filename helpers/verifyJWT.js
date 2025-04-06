import jwt from 'jsonwebtoken';

const verifyJWT = (request, response) => {
    const token = request.headers['authorization'];
    if (!token) {
        response.status(403).send('Acceso denegado');
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
        if (error) {
            response.status(401).send('Acceso denegado');
            return;
        }
        request.userTKN = data;
    });
}

export default verifyJWT;