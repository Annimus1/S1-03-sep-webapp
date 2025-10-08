export default {
    // Dice a Jest que use el entorno de Node.js
    testEnvironment: 'node', 
    
    // Dice a Jest dónde buscar tus archivos de prueba
    testMatch: ['**/tests/**/*.test.js'], 
    
    // Esto mapea las importaciones de módulo para que Jest sepa dónde encontrar los archivos
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    
    // Si usas el mock de bcrypt, debes indicarle a Jest que use un transformador
    // Si sigue fallando, puedes intentar usar 'babel-jest' o simplemente NO mockear por ahora.
};