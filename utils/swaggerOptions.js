const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Store API',
      version: '1.0.0',
      description: 'API documentation for your store backend',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // مسارات الملفات اللي فيها الRoutes وتعليقات Swagger
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
