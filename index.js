import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

//-----------------creating a server----------------------

const port = 3000;
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`server are connected on port---> http://localhost:${port}`);
});

//-----------------END-creating a server----------------------

import router from "./routes/index.js";
app.use("/", router);

//---------connection to a database----------------------

mongoose
  .connect(
    "mongodb+srv://jemish0581:Shivay99@cluster0.5ijjgyt.mongodb.net/products?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      logger: console.log,
      loggerLevel: "debug",
    }
  )
  .then(() => {
    console.warn("Database connected successfully...");
  });
//---------END-connection to a database----------------------
