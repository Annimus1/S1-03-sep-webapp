import JWT from '../../src/services/jwt.service.js';

describe('JWT Service', () => {
    let jwtService;
    const payload = { userId: 'test123' };

    beforeAll(() => {
        process.env.SECRET_KEY = 'test_secret';
        jwtService = new JWT();
    });

    test('sign() debe retornar un JWT valido', () => {
        const token = jwtService.sign(payload);
        expect(typeof token).toBe('string');
        expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });
    
    test('verify() retorna un objeto con propiedad success verdadera para un token válido', () => {
        const token = jwtService.sign(payload);
        const result = jwtService.verify(token);
        
        expect(result).toHaveProperty('success', true);
    });

    test('verify() retorna un objeto con propiedad success false para un token no válido', () => {
        const result = jwtService.verify('token-erroneo');
        
        expect(result).toHaveProperty('success', false);
    });
});