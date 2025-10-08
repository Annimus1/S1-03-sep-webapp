import mongoose from 'mongoose';
import request from 'supertest';
import User from '../../src/models/user.model.js';
import app from '../../src/server.js'; // tu Express app

const api = request(app);

beforeAll(async () => {
  const MONGO_TEST_URI = process.env.MONGO_TEST_URI || 'mongodb://127.0.0.1:27017/myapp_test';
  await mongoose.connect(MONGO_TEST_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('POST /api/auth/register', () => {
  const validUser = {
    email: 'test@example.com',
    password: '12345678',
    nombreComercial: 'Mi PyME',
    nombre: 'Juan Perez',
    personalDNI: '12345678',
    CUIT: '20304050607',
    Cargo: 'CEO',
    empresarialCUIT: '30708090123',
    tipoSocietario: 'SRL',
    domicilioFiscal: 'Calle Falsa 123',
    domicilioComercial: 'Calle Real 456',
    actividadEconomicaPrincipal: 'Servicios',
    fechaConstitucion: '2020-01-01',
    numeroRegistro: 'REG12345'
  };

  it('debería crear un usuario correctamente', async () => {
    const res = await api.post('/api/auth/register').send(validUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('email', validUser.email);
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('debería rechazar si el email ya existe', async () => {
    await api.post('/api/auth/register').send(validUser);
    const res = await api.post('/api/auth/register').send(validUser);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('debería rechazar si falta un campo obligatorio', async () => {
    const { email, ...partialUser } = validUser;
    const res = await api.post('/api/auth/register').send(partialUser);
    expect(res.statusCode).toBe(422);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'email' })
      ])
    );
  });

  it('debería rechazar contraseña < 8 caracteres', async () => {
    const res = await api.post('/api/auth/register').send({ ...validUser, password: '123' });
    expect(res.statusCode).toBe(422);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'password' })
      ])
    );
  });
});
