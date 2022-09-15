import { CarWithVehicle, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';
import { ErrorTypes } from '../Middleware/erros/catalog';

class CarService implements IService<ICar> {
  private _carModel: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._carModel = model;
  }
  async create(obj: ICar): Promise<ICar> {
    const parsed = CarWithVehicle.safeParse({ ...obj });
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._carModel.create(obj);
  }
  async read(): Promise<ICar[]> {
    return this._carModel.read();
  }
  async readOne(_id: string): Promise<ICar> {
    const carOne = await this._carModel.readOne(_id);
    if (!carOne) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return carOne;
  }
  async update(_id: string, obj: ICar): Promise<ICar> {
    const parsed = CarWithVehicle.safeParse({ ...obj });
    if (!parsed.success) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }
    const resultCar = await this._carModel.update(_id, obj);
    if (!resultCar) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return resultCar;
  }
  async delete(_id: string): Promise<ICar> {
    const resultCar = await this._carModel.delete(_id);
    if (!resultCar) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return resultCar;
  }
}
export default CarService;