// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Task API",
//       version: "1.0.0",
//     },
//   },
//   apis: ["./src/routes/*.js"], 
// };

// const swaggerSpec = swaggerJsdoc(options);

// module.exports = { swaggerUi, swaggerSpec };

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "A simple task management API without a database.",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };