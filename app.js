import express from 'express';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerSpec = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Node User CRUD MongoDB API",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`
            }
        ]
    },
    apis: [
        `${path.join(__dirname, "routes/*.js")}`
    ]
};

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)));

export default app;