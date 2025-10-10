export default {
    // Dice a Jest que use el entorno de Node.js
    testEnvironment: 'node', 
    
    // Dice a Jest dónde buscar tus archivos de prueba
    testMatch: ['**/tests/**/*.test.js'], 
    
    // Esto mapea las importaciones de módulo para que Jest sepa dónde encontrar los archivos
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },

    setupFiles: ['<rootDir>/jest.setup.js']
};