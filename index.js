import app from './app.js';
import 'dotenv/config';

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor activo en el puerto ${PORT}`));
} catch (e) {
    console.error(e);
}