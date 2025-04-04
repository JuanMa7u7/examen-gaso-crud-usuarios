import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoute.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/usuarios', userRoutes);

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor activo en el puerto ${PORT}`));
} catch (e) {
    console.error(e);
}