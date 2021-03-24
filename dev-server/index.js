import express from 'express'
const app = express()
const port = 3000

import { registerRoutes } from './routes.js';
import { setEnviroment } from './config/env.js';
import { connectToDB } from './config/db.js';

setEnviroment(app);
connectToDB();
registerRoutes(app);

app.get('/', (req, res) => {
  if(process.env.NODE_ENV !== 'production') {
    return res.send(
      'Running server in development mode.'
    )
  }
  else{
    return res.sendFile('http://index.html', { root: __dirname + '/../dist/'});
  }
})

app.listen(port, () => {
  console.log(`Trang MEVN app listening at http://localhost:${port} in ` + process.env.NODE_ENV + 'model!');
});