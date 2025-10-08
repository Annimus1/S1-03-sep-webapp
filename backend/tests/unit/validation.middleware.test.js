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
  test('Debe rechazar si falta el email', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ password: '12345678', empresa: 'MiEmpresa' });

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
      .send({ email: 'user@mail.com', password: '123', empresa: 'MiEmpresa' });

    expect(res.statusCode).toBe(422);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'password' })
      ])
    );
  });

  test('Debe rechazar si falta el nombre de la empresa', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'user@mail.com', password: '12345678' });

    expect(res.statusCode).toBe(422);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'empresa' })
      ])
    );
  });

  test('Debe aceptar un request válido', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'test@mail.com', password: '12345678', empresa: 'MiEmpresa' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'OK' });
  });
});
