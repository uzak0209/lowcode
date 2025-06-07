import { Request, Response } from 'express';
const express = require('express');
const app = express();

interface HelloRequest extends Request {}
interface HelloResponse extends Response {}

app.get('/', (req: HelloRequest, res: HelloResponse) => {
    res.send('Hello from Express server!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});