import express from 'express';
import 'dotenv/config';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor activo en el puerto ${PORT}`));
} catch (e) {
    console.error(e);
}