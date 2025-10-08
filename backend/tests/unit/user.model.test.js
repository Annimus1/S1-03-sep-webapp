// tests/unit/user.model.test.js

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import UserModel from '../../src/models/user.model.js';
import bcrypt from 'bcrypt'; 

// Cargar variables de entorno (para MONGO_TEST_URI)
dotenv.config();

// --------------------------------------------------------------------------
// 🔑 CONFIGURACIÓN DE CONEXIÓN A LA BASE DE DATOS DE PRUEBA
// --------------------------------------------------------------------------

// Aumentamos el timeout a 10 segundos para permitir el hashing y la conexión a MongoDB.
const LONG_TIMEOUT = 10000; 

beforeAll(async () => {
    const uri = process.env.MONGO_TEST_URI;
    if (!uri) {
        throw new Error("MONGO_TEST_URI no está definido. Revisa tu archivo .env.");
    }
    
    // Conexión
    await mongoose.connect(uri);
}, LONG_TIMEOUT);

afterAll(async () => {
    // Desconexión
    await mongoose.connection.close();
});

afterEach(async () => {
    // Limpiar la colección después de cada prueba
    await UserModel.deleteMany({});
});

// 1. TEST DE PRE-SAVE
describe('Modelo de Usuario PyMEs -> Security Hooks (Hashing)', () => {
    
    // 💡 El timeout se aplica a este 'it' para permitir el hashing real
    it('debería hashear la contraseña antes de guardar un nuevo usuario', async () => {
        const PLAIN_PASSWORD = 'MiPasswordSecreta123';
        
        // Objeto de datos COMPLETO (Asegúrate de incluir TODOS los campos requeridos)
        const userData = { 
            email: 'test@empresa.com',
            password: PLAIN_PASSWORD,
            nombre: 'Juan Perez',
            personalDNI: '12345678',
            empresarialCUIT: '30712345678',
            Cargo: 'CEO',
            CUIT: '12345678',
            nombreComercial: 'Test Corp',
            tipoSocietario: 'SA',
            domicilioFiscal: 'Calle Falsa 123',
            domicilioComercial: 'Calle Comercial 456',
            actividadEconomicaPrincipal: '6499', // ¡Campo que fallaba antes!
            fechaConstitucion: new Date(),
            numeroRegistro: 'ABC123456',
            role: 'user',        
            certificadoPyME: '2500034A',
            Documentacion: ['test'],
        }

        const user = new UserModel(userData);
        await user.save();

        // 1. La contraseña NO debe ser texto plano
        expect(user.password).not.toBe(PLAIN_PASSWORD); 
        
        // 2. El hash resultante debe ser un hash válido de bcrypt
        expect(user.password.length).toBeGreaterThan(50); // Los hashes de bcrypt son largos
        
        // 3. Opcional: Usar bcrypt.compare para una verificación completa del hook
        const isMatch = await bcrypt.compare(PLAIN_PASSWORD, user.password);
        expect(isMatch).toBe(true);

    }, LONG_TIMEOUT);
});

// 2. TESTS DE VALIDACIÓN
describe('Modelo de Usuario PyMEs -> Validation', () => {
    const SHORT_TIMEOUT = 5000; 
    
    // Objeto base con todos los campos requeridos y únicos para evitar errores de validación.
    const baseUserData = { 
        password: 'PasswordUnica123',
        nombre: 'Empresa Base S.A.',
        personalDNI: '99999999',
        empresarialCUIT: '20999999990',
        Cargo: 'Gerente',
        CUIT: '20999999990',
        nombreComercial: 'Test Corp Unicidad',
        tipoSocietario: 'SA',
        domicilioFiscal: 'Av. Test 100',
        domicilioComercial: 'Calle Logica 200',
        actividadEconomicaPrincipal: '6499',
        fechaConstitucion: new Date(),
        numeroRegistro: 'ABC999999',
        role: 'user',        
        certificadoPyME: '2500034A',
        Documentacion: ['doc1'],
    };

    it('debería fallar si el email ya existe (unicidad)', async () => {
        const EMAIL_DUPLICADO = 'duplicado@empresa.com';
        
        // 1. Crear y guardar el primer usuario (éxito)
        const firstUser = { ...baseUserData, email: EMAIL_DUPLICADO };
        await UserModel.create(firstUser); 
        
        // 2. Crear datos para el segundo usuario.
        // 🔑 CLAVE: Duplicamos el EMAIL, pero aseguramos que los otros campos 'unique' sean DIFERENTES.
        const secondUser = { 
            // Duplica el campo de prueba
            email: EMAIL_DUPLICADO, 
            
            // Asegura la unicidad de los otros campos
            personalDNI: '88888888', 
            empresarialCUIT: '20888888880',
            numeroRegistro: 'ABC888888',
            
            // Resto de los campos no únicos pueden ser los mismos del baseUserData
            password: 'OtraPassword',
            nombre: 'Segunda S.A.',
            Cargo: 'SubGerente',
            CUIT: '20888888880',
            nombreComercial: 'Test Falla Unicidad',
            tipoSocietario: 'SRL',
            domicilioFiscal: 'Dir Falla 1',
            domicilioComercial: 'Dir Falla 2',
            actividadEconomicaPrincipal: '6499',
            fechaConstitucion: new Date(),
            role: 'user',        
            certificadoPyME: '2500034B',
            Documentacion: ['doc2'],
        };

        // 3. Intentar guardar el segundo usuario y esperar que el proceso falle.
        // Jest espera que la promesa sea rechazada (toThrow).
        await expect(UserModel.create(secondUser)).rejects.toThrow();

        // 4. Verificación específica del código de error de MongoDB.
        try {
            await UserModel.create(secondUser);
        } catch (error) {
            // El código 11000 es el error de índice duplicado de MongoDB.
            expect(error.code).toBe(11000); 
        }

    }, SHORT_TIMEOUT);
});

it('debería fallar si el campo role tiene un valor fuera del enum permitido', async () => {
    const invalidRoleData = { 
        // ... (Todos los campos requeridos y válidos) ...
        email: 'invalid@role.com',
        password: 'Pass123',
        // ❌ ROL INVÁLIDO
        role: 'super_admin_invalido', 
    };
    
    // Ajustar el objeto de datos para incluir todos los campos requeridos
    const data = { 
        ...invalidRoleData, 
        // Asegúrate de que los otros campos requeridos estén aquí si no usas un baseUserData
        nombre: 'Role Fail S.A.',
        personalDNI: '11111111',
        empresarialCUIT: '20111111110',
        Cargo: 'Gerente',
        CUIT: '20111111110',
        nombreComercial: 'Role Test',
        tipoSocietario: 'SA',
        domicilioFiscal: 'A 123',
        domicilioComercial: 'B 456',
        actividadEconomicaPrincipal: '6499',
        fechaConstitucion: new Date(),
        numeroRegistro: 'ABC111111',
        certificadoPyME: '2500034C',
        Documentacion: ['doc1'],
    };

    const user = new UserModel(data);
    
    // Esperar que falle con un ValidationError
    await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError);
});