import express from 'express';

const userRouter = express.Router();

userRouter.use((req, res, next) => {
    console.log('Обработчик users');
    next();
});
userRouter.get('/', (req, res) => {
    res.send('USERS');
});
userRouter.post('/login', (req, res) => {
    res.send('login');
});
userRouter.post('/register', (req, res) => {
    res.send('register');
});
export { userRouter };
