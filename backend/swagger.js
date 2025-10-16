// src/swagger.js

import swaggerJSDoc from 'swagger-jsdoc';

// Opciones de configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Créditos KYC/AML',
            version: '1.0.0',
            description: 'Documentación de la API Backend para la gestión de usuarios, roles y solicitudes de crédito. Utiliza JWT para la autenticación.',
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:3001/api/v1',
                description: 'Servidor de Desarrollo/Local',
            },
        ],
    },
    // Rutas que contienen la documentación JSDoc (Controladores, Rutas o Servidor)
    apis: [
        './src/routes/*.js',
        './src/server.js',
        './src/middlewares/*.js' 
    ],
};

// Generar la especificación Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;