import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Twitter-like API',
        description: 'API documentation for the backend side of the Twitter clone.',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/index.js'];

// Generate the swagger documentation
swaggerAutogen()(outputFile, endpointsFiles, doc);
