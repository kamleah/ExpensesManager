const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Documentation for your RESTful API',
    },
    basePath: '/',
  },
  apis: ['./routes/*.js'], // Specify the paths to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
