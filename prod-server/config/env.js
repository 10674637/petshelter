import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import path from 'path';
import url from 'url';

var __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export function setEnviroment(app) {
  if (process.env.NODE_ENV != 'production') {
    setDevEnv(app);
  } else {
    setProEnv(app);
  }
}

function setDevEnv(app) {
  process.env.NODE_ENV = 'development';
  process.env.DB_URL = 'mongodb+srv://petshelter:12345@petshelter.ghiyp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  process.env.TOKEN_SECRET = 'my-development-secret';
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(cors());
}

function setProEnv(app) {
  process.env.DB_URL = 'mongodb+srv://petshelter:12345@petshelter.ghiyp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  process.env.TOKEN_SECRET = 'my-production-secret';
  app.use(bodyParser.json());
  app.use(morgan('combined'));
  app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
}