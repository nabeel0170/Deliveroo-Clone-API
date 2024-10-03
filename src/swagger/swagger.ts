import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Your API description',
    },
    servers: [
      {
        url: 'http://localhost:8000/', // Your API server URL
      },
    ],
    security: [
      {
        ApiKeyAuth: [], // Use the defined security scheme below
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header', // The API key will be sent in the header
          name: 'api-key', // The name of the header
        },
      },
    },
  },
  apis: ['./src/routes/userRoutes.ts', './src/routes/restaurantRoutes.ts'], // Path to your API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
