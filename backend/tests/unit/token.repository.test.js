import { createClient } from 'redis';
import CacheSingleton from '../../src/database/CacheSingleton.js'; // 🔑 Importa el Singleton
import TokenRepository from '../../src/repositories/token.repository';

// VARIABLES GLOBALES

beforeAll(async () => {
    const REDIS_TEST_URI = process.env.REDIS_TEST_URI;

    if (!REDIS_TEST_URI) {
        console.error("❌ Error: REDIS_TEST_URI no está definida. Necesaria para tests.");
        process.exit(1);
    }

    // 🔑 CLAVE: Sobreescribir la variable de entorno que el CacheSingleton usa
    // para que se conecte a la DB de prueba.
    process.env.REDIS_URI = REDIS_TEST_URI;

    // **Si tu CacheSingleton ya se inicializó al importarse**,
    // necesitas reiniciar su cliente para que use la nueva URI.
    // **¡Esta es una suposición necesaria si no modificas el código de producción!**
    try {
        await CacheSingleton.connect(); // Asumiendo que existe un método
    } catch (e) {
        // Si no existe, es probable que la prueba falle a menos que uses jest.setup.js
        console.warn('Advertencia: No se pudo reconfigurar el Singleton. Asumiendo carga perezosa.');
    }

    // Conectar el cliente de prueba (opcional, si necesitas hacer FLUSHDB directo)
    redisClient = createClient({ url: REDIS_TEST_URI });
    redisClient.on('error', (err) => {
        console.error('Redis Client Error:', err);
        process.exit(1);
    });
    await redisClient.connect();
});

afterAll(async () => {
    // Usar el cliente de prueba para limpiar
    await redisClient.flushDb();
    await redisClient.quit();
    await CacheSingleton.quit();
});

afterEach(async () => {
    await redisClient.flushDb();
});

// --------------------------------------------------------------------------
// TESTS DE INTEGRACIÓN
// --------------------------------------------------------------------------
describe('TokenRepository Integración (Redis Real)', () => {

    // Los tests usan la instancia TokenRepository, pero internamente llaman al mock,
    // que a su vez llama al mockRedisClient real y conectado.
    const MOCK_USER_ID = 'user_abc_123';
    const MOCK_TOKEN = 'jwt_token_hash_real';
    const MOCK_EXPIRATION = 2;

    describe('TokenRepository Integración (Redis Real)', () => {

        // Test 1: Guardar (whitelistToken) y Verificar (isTokenWhitelisted)
        it('1. debería guardar un token y verificar que está en la whitelist', async () => {
            // 1. Guardar el token
            const success = await TokenRepository.whitelistToken(MOCK_USER_ID, MOCK_TOKEN, MOCK_EXPIRATION);
            expect(success).toBe(true);

            // 2. Verificar
            const isWhitelisted = await TokenRepository.isTokenWhitelisted(MOCK_USER_ID, MOCK_TOKEN);
            expect(isWhitelisted).toBe(true);
        });

        // Test 2: Eliminar (revokeToken)
        it('2. debería eliminar un token de la whitelist (revokeToken)', async () => {
            // Setup: Asegurar que el token existe antes de intentar eliminarlo.
            await TokenRepository.whitelistToken(MOCK_USER_ID, MOCK_TOKEN, MOCK_EXPIRATION);

            // 1. Eliminar
            const revokeSuccess = await TokenRepository.revokeToken(MOCK_USER_ID);
            expect(revokeSuccess).toBe(true);

            // 2. Verificar que ya no existe
            const isWhitelisted = await TokenRepository.isTokenWhitelisted(MOCK_USER_ID, MOCK_TOKEN);
            expect(isWhitelisted).toBe(false);
        });

        // Test 3: Token Inexistente
        it('3. debería retornar false si el token NO existe en la whitelist', async () => {
            const NON_EXISTENT_ID = 'id_que_no_existe_456';

            // 1. Intentar verificar (sabemos que debe ser falso)
            const isWhitelisted = await TokenRepository.isTokenWhitelisted(NON_EXISTENT_ID, MOCK_TOKEN);

            // 2. Afirmación
            expect(isWhitelisted).toBe(false);
        });

        // Test de expiración (el que ya tenías y que es crucial)
        it('4. debería retornar false si el token ha expirado', async () => {
            await TokenRepository.whitelistToken('expiring_user', 'temp_token', MOCK_EXPIRATION);
            await new Promise(resolve => setTimeout(resolve, 3000));
            const isWhitelisted = await TokenRepository.isTokenWhitelisted('expiring_user');
            expect(isWhitelisted).toBe(false);
        }, 5000);
    });

    it('debería retornar false si el token ha expirado', async () => {
        await TokenRepository.whitelistToken('expiring_user', 'temp_token', MOCK_EXPIRATION);

        // Esperar más que el tiempo de expiración
        await new Promise(resolve => setTimeout(resolve, 3000));

        const isWhitelisted = await TokenRepository.isTokenWhitelisted('expiring_user');

        expect(isWhitelisted).toBe(false);
    }, 5000);
});