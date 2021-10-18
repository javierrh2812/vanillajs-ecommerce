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
app.use(express.static("public"));

app.use("/api", exposeService, apiRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("🚀 server running on port 3000"));
