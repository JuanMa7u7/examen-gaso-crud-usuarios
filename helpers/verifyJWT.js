import jwt from 'jsonwebtoken';

const verifyJWT = (request, response) => {
    const token = request.headers['authorization'];
    if (!token) {
        return response.status(403).send('Acceso denegado');
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
        if (error) {
            return response.status(401).send('Acceso denegado');
        }
        request.userTKN = data;
    });
}

export default verifyJWT;