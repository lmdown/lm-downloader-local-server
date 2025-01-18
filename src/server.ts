import pino from "pino";
import { Express } from "express-serve-static-core";
const  http = require('http');
import express from 'express';
import { initAppStoreModule } from "./app-store";
import { initSelfManageModule } from "./self-manage";
import headers from './headers'
const logger = pino({ name: "server start" });
const app: Express = express();

http.createServer(app);

app.use(express.json());
app.use(headers)

initAppStoreModule(app)
initSelfManageModule(app)

app.get('/api/health-check', (req, res) => {
  res.send({msg:"lmd server ok"});
})

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost'
}))
app.use(function (req, res) {
  res.send('404 not found.');
});

export { app, logger };
