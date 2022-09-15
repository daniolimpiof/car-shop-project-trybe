import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const result = await this._service.create(req.body);
    return res.status(201).json(result);
  }
  public async read(_req: Request, res: Response<ICar[]>) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }
  public async readOne(req: Request, res: Response<ICar>) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }
  public async update(req: Request, res: Response<ICar>) {
    const { params, body } = req;
    const result = await this._service.update(params.id, body);
    return res.status(200).json(result);
  }
  public async delete(req: Request, res: Response<ICar>) {
    const result = await this._service.delete(req.params.id);
    return res.status(204).json(result);
  }
}