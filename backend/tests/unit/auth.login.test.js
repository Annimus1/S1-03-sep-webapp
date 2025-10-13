import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/server';

const LOGIN_URL = '/api/v1/auth/login';
const validUser = {
    email: 'test@example.com',
    password: '12345678',
    nombreComercial: 'Mi PyME',
    nombres: 'Juan',
    apellidos: 'Pérez',
    personalDNI: '12345678',
    CUIT: '20304050607',
    Cargo: 'CEO',
    empresarialCUIT: '30708090123',
    tipoSocietario: 'SRL',
    domicilioFiscal: 'Calle Falsa 123',
    domicilioComercial: 'Calle Real 456',
    actividadEconomicaPrincipal: 'Servicios',
    fechaConstitucion: '2020-01-01',
    numeroRegistro: 'REG12345',
    pep:true
};


beforeAll(async () => {
    const MONGO_TEST_URI = process.env.MONGO_TEST_URI || 'mongodb://127.0.0.1:27017/myapp_test';
    await mongoose.connect(MONGO_TEST_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('POST /api/v1/auth/login', () => {
    
    it('debería crear un usuario correctamente', async () => {
        const res = await request(app).post('/api/v1/auth/register').send(validUser);
        expect(res.statusCode).toBe(201);
    });

    it('Debería retornar 400 y un error de validación si el cuerpo de la peticion es vacio', async () => {

        const response = await request(app)
            .post(LOGIN_URL)
            .send();

        expect(response.statusCode).toBe(400);

        // 3. Afirmar la estructura de la respuesta de error
        expect(response.body).toHaveProperty('status', 'error');
        expect(response.body).toHaveProperty('message', 'email y password obligatorios.');
    });

    it('Debería retornar 422 si falta el campo password', async () => {
        const response = await request(app)
            .post(LOGIN_URL)
            .send({ email: 'test@mail.com' });

        expect(response.statusCode).toBe(422);
    });

    it('Debería retornar 422 si falta el campo password', async () => {
        const response = await request(app)
            .post(LOGIN_URL)
            .send({ email: 'test@mail.com' });

        expect(response.statusCode).toBe(422);
    });

    it('Debería retornar 200 si el inicio de sesion es exitoso.', async () => {
        const response = await request(app)
            .post(LOGIN_URL)
            .send({
                email: 'test@example.com',
                password: '12345678',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.user).toHaveProperty('token');
        expect(response.body.user.token).toEqual(expect.any(String)); 

    });

    test('Debería retornar 401 si se envian credenciales invalidas', async () => {
        const invalidCredentials = {
            email: 'usuario.inexistente@test.com', // Email que asumimos no está en la DB
            password: 'clave_completamente_erronea_123'
        };

        const response = await request(app)
            .post(LOGIN_URL)
            .send(invalidCredentials);

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('message', 'Credenciales invalidas.');
    });
});