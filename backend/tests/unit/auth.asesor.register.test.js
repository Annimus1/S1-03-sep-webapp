import request from 'supertest';
import app from '../../src/server';
import mongoose from 'mongoose';

const REGISTER_URL = '/api/v1/auth/register-adviser';
const validUser = {
    email: 'usuario.inexistente@kredia.com',
    password: 'clave_completamente_erronea_123',
    nombres: 'nombres',
    apellidos: 'apellidos'
};


beforeAll(async () => {
    const MONGO_TEST_URI = process.env.MONGO_TEST_URI || 'mongodb://127.0.0.1:27017/myapp_test';
    await mongoose.connect(MONGO_TEST_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('POST /api/v1/auth/register-adviser', () => {

    it('Debería retornar 400 y un error de validación si el cuerpo de la peticion es vacio', async () => {

        const response = await request(app)
            .post(REGISTER_URL)
            .send();

        expect(response.statusCode).toBe(400);

        // 3. Afirmar la estructura de la respuesta de error
        expect(response.body).toHaveProperty('status', 'error');
        expect(response.body).toHaveProperty('message', 'email, nombres, apellidos y password son obligatorios.');
    });

    it('Debería retornar 422 si falta el campo email', async () => {
        const response = await request(app)
            .post(REGISTER_URL)
            .send({ password: "1234", nombres: "nombre", appellidos: "apellidos" });

        expect(response.statusCode).toBe(422);
    });

    it('Debería retornar 422 si falta el campo password', async () => {
        const response = await request(app)
            .post(REGISTER_URL)
            .send({ email: 'test@mail.com' });

        expect(response.statusCode).toBe(422);
    });

    it('Debería retornar 422 si falta el campo nombres', async () => {
        const response = await request(app)
            .post(REGISTER_URL)
            .send({ email: 'test@mail.com', password: "1234567890" });

        expect(response.statusCode).toBe(422);
    });

    it('Debería retornar 422 si falta el campo apellidos', async () => {
        const response = await request(app)
            .post(REGISTER_URL)
            .send({ email: 'test@mail.com', password: "1234567890", nombres: "nombre" });

        expect(response.statusCode).toBe(422);
    });

    it('Debería retornar 422 si el email no es del dominio kredia.com', async () => {
        const response = await request(app)
            .post(REGISTER_URL)
            .send({ email: 'test@mail.com', password: "1234567890", nombres: "nombre", apellidos: "apellidos" });

        expect(response.statusCode).toBe(422);
    });

    it('Debería retornar 201 cuando un asesor es creado', async () => {
        const response = await request(app)
            .post(REGISTER_URL)
            .send(validUser);

        expect(response.statusCode).toBe(201);
    });

    it('Debería retornar 422 cuando se intenta crear un asesor con credenciales ya usadas', async () => {
        const response = await request(app)
            .post(REGISTER_URL)
            .send(validUser);

        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty('message', 'No se pudo completar el registro. Verifique los datos ingresados.');
    });


});