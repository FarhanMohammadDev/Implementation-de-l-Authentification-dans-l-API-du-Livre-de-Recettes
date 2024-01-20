// npm init -y  &&  npm i express && npm i nodemon -D
// npx nodemon index    --->  npm start
const express = require("express");
const recipesPath = require("./routes/recipes");
const authPath = require("./routes/auth");
const usersPath = require("./routes/users");
const logger = require("./middlewares/logger")
const {notFound,errorHandler} = require("./middlewares/errors")
const  Database  = require("./configs/db");
// npm i dotenv
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3030;

// initialisation App
const app = express();

// apply Middlewares
app.use(express.json());  //convert json to javascript
app.use(logger)


// -----------------------Swagger -------------------
const swaggerJsdoc  = require("swagger-jsdoc");
const swaggerUi  = require("swagger-ui-express");

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Mini Blog API',
        description: "API endpoints for a mini blog services documented on swagger",
        contact: {
          name: "Desmond Obisi",
          email: "info@miniblog.com",
          url: "https://github.com/DesmondSanctity/node-js-swagger"
        },
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://localhost:${PORT}/`,
          description: "Local server"
        },
        {
          url: "<your live url here>",
          description: "Live server"
        },
      ]
    },
    // looks for configuration in specified directories
    apis: ['./routes/*.js'],
  }
  const swaggerSpec = swaggerJsdoc(options)

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// -----------------------Swagger -------------------




//Routes
app.use("/api/recipes",recipesPath);
app.use("/api/auth",authPath);
app.use("/api/users",usersPath);


// Error Handler Middleware 
app.use(notFound)
app.use(errorHandler)

// Connection To Database 
const db = new Database(process.env.MONGO_URL);
db.connect();

// Running The Server
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`));
