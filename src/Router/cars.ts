import { Router } from 'express';
import CarsController from '../controllers/CarsController';
import CarService from '../services/CarService';
import CarModel from '../models/CarModel';

const routeCar = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarsController(carService);

routeCar.post('/', (req, res) => carController.create(req, res));
routeCar.get('/:id', (req, res) => carController.readOne(req, res));

export default routeCar;