import express, { Express } from 'express';
import { Server } from 'http';
export class App {
    port: number;

    app: Express;
    constructor() {
        this.app = express();
        this.port = 5000;
    }
    useRoutes() {
        this.app.use('/users', (req, res) => {
            res.send('hello');
        });
    }

    public async init() {
        this.useRoutes();
        const server: Server = this.app.listen(this.port);
        console.log('Server started ', this.port);
    }
}
