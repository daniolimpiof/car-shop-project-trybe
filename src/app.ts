import express from 'express';
import 'express-async-errors';
import errorHandler from './Middleware/erros/error';
import routeCar from './Router/cars';

const app = express();
app.use(express.json());
app.use('/cars', routeCar);
app.use(errorHandler);

export default app;
