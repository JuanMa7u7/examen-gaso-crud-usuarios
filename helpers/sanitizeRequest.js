import mongoSanitize from 'express-mongo-sanitize';

const sanitizeRequest = (request) => {
    mongoSanitize.sanitize(request.body);
    mongoSanitize.sanitize(request.query);
    mongoSanitize.sanitize(request.params);
}

export default sanitizeRequest;