const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const fs = require("fs");

// Read the OpenAPI specification from the JSON file
const openApiSpecPath = path.join(__dirname, "../../openapi.json");
let swaggerSpec;

try {
  const openApiSpec = fs.readFileSync(openApiSpecPath, "utf8");
  swaggerSpec = JSON.parse(openApiSpec);

  // Update the server URL for development
  swaggerSpec.servers = [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
    {
      url: "https://api.analytics-tracker.com",
      description: "Production server",
    },
  ];
} catch (error) {
  console.error("Error reading OpenAPI specification:", error);

  // Fallback configuration using swagger-jsdoc
  const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Analytics Tracker API",
        version: "1.0.0",
        description:
          "A comprehensive analytics API for tracking and retrieving user events",
      },
      servers: [
        {
          url: "http://localhost:5000",
          description: "Development server",
        },
      ],
    },
    apis: ["./routes/*.js", "./controllers/*.js"], // Path to the API files
  };

  swaggerSpec = swaggerJsdoc(options);
}

// Swagger UI options
const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    docExpansion: "none",
    filter: true,
    showRequestDuration: true,
    syntaxHighlight: {
      theme: "arta",
    },
    tryItOutEnabled: true,
  },
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #3b82f6 }
    .swagger-ui .scheme-container { background: #f8fafc; padding: 10px; border-radius: 4px; }
  `,
  customSiteTitle: "Analytics Tracker API Documentation",
  customfavIcon: "/favicon.ico",
};

module.exports = {
  swaggerSpec,
  swaggerUi,
  swaggerOptions,
};
