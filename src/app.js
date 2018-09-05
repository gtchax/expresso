import express from "express";
// import bodyParser from 'body-parser';
import { dbConnect } from './database'

const app = express();
dbConnect()
app.set("port", 4000);

const server = app.listen(app.get("port"), () => {
  console.log(`App is running on port ${server.address().port}`);
});

// ESM syntax is supported.
export {};
