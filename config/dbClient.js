import { MongoClient } from "mongodb";
import 'dotenv/config';

class DBClient {

    constructor() {
        const queryString = `mongodb://${process.env.DB_SERVER}:${process.env.DB_PORT}/`;
        this.client = new MongoClient(queryString);
        this.connectDB();
    }

    async connectDB() {
        try {
            await this.client.connect();
            this.db = this.client.db(process.env.DB_MODEL);
            // console.log("Conectado al servidor de base de datos");
        } catch (e) {
            console.log(e);
        }
    }
}

export default new DBClient;