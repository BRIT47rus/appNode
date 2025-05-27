import express, { Request, Response, NextFunction } from 'express';
const app = express();

const host = '127.0.0.1';
const port = 5000;
app.get('/', (req, res) => {
    res.send('Answer');
});

app.listen(port, () => {
    console.log('Server started');
});
