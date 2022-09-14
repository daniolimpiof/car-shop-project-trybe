import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const CarMongoseSchema = new Schema<ICar>({
  doorsQty: Number,
  seatsQty: Number,
});

class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel<ICar>('Car', CarMongoseSchema)) {
    super(model);
  }
}

export default CarModel;