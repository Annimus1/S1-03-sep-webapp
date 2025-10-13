import express from 'express';
import request from 'supertest';
import { validateRegister } from '../../src/middlewares/validation.middleware.js';

const app = express();
app.use(express.json());

// Montamos la ruta de prueba simulando el endpoint real
app.post('/api/register', validateRegister, (req, res) => {
  res.status(200).json({ message: 'OK' });
});

describe('Middleware validateRegister', () => {
  const validRequest = {
    email: 'test@mail.com',
    password: '12345678',
    nombres: 'Juan',
    apellidos: 'Pérez',
    personalDNI: '12345678',
    CUIT: '20304050607',
    Cargo: 'CEO',
    nombreComercial: 'Mi PyME',
    empresarialCUIT: '30708090123',
    tipoSocietario: 'SRL',
    domicilioFiscal: 'Calle Falsa 123',
    domicilioComercial: 'Calle Real 456',
    actividadEconomicaPrincipal: 'Servicios',
    fechaConstitucion: '2020-01-01',
    numeroRegistro: 'REG12345',
    certificadoPyME: true,
    pep: false
  };

  test('Debe rechazar si falta el email', async () => {
    const { email, ...partialRequest } = validRequest;
    const res = await request(app)
      .post('/api/register')
      .send(partialRequest);

    expect(res.statusCode).toBe(422);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'email' })
      ])
    );
  });

  test('Debe rechazar si la contraseña es demasiado corta', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ ...validRequest, password: '123' });

    expect(res.statusCode).toBe(422);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'password' })
      ])
    );
  });

  test('Debe rechazar si falta un campo obligatorio', async () => {
    const { nombreComercial, ...partialRequest } = validRequest;
    const res = await request(app)
      .post('/api/register')
      .send(partialRequest);

    expect(res.statusCode).toBe(422);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'nombreComercial' })
      ])
    );
  });

  test('Debe aceptar un request válido', async () => {
    const res = await request(app)
      .post('/api/register')
      .send(validRequest);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'OK' });
  });
});
