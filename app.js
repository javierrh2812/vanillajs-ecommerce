import express from "express";
import cors from "cors";
import logger from "morgan";
import apiRoutes from "./src/routes/index.js";
import exposeService from "./src/service/index.js";

const app = express();
var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//los estaticos solo se serviran desde esta ruta
app.use("/", express.static("public"));

//ruta api principal 
// se inyecta prisma desde un middleware
app.use("/api", exposeService, apiRoutes);


//cuando no se encuetre ningun patron, se envia un mensaje de error
app.use((_, res, __) => {
  console.log("error");
  return res.status(404).send(`<body> <div style="display:grid;place-items:center">
      <h1>404</h1>
      <h2>Page not found</h2>
      <a href="/">Go to Homepage</a>
      </div>
  </body> `);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("🚀 server running on port 3000"));
