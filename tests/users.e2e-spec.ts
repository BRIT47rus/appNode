import { AuthGuard } from './../src/common/auth.guard';
import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;
beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e ', () => {
	it('Register - error', async () => {
		const res = await request(application.app).post('/users/register').send({
			email: 'v@v.ru',
			password: '1',
		});
		expect(res.statusCode).toBe(422);
	});
	it('Login - success', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'v@v.ru',
			password: '1',
		});
		expect(res.body.jwt).not.toBeUndefined();
	});
	it('Login - error', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'v@v.ru',
			password: '3',
		});
		expect(res.statusCode).toBe(401);
	});
	// it('Info - success', async () => {
	// 	const login = await request(application.app).post('/users/login').send({
	// 		email: 'v@v.ru',
	// 		password: '1',
	// 	});
	// 	const res = await request(application.app)
	// 		.get('/users/info')
	// 		.set('Authorization', `Bearer ${login.body.jwt}`);

	// 	expect(res.body.email).toBe('payload.email');
	// });
});

afterAll(() => {
	application.close();
});
