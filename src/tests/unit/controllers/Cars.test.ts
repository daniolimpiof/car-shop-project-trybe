import chai from 'chai';
const { expect } = chai;
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import {
  carMock,
  carMockWithId,
  carMockForChange,
  carMockForChangeId,
  // carMockInvalid
} from '../../mocks/carMocks';
import CarModel from '../../../models/CarModel';
import CarsController from '../../../controllers/CarsController';
import CarService from '../../../services/CarService';


describe('Testando a camada de controller', () => {
  const model = new CarModel();
  const service = new CarService(model);
  const controller = new CarsController(service);
  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(service, 'create').resolves(carMockWithId);
    sinon.stub(service, 'read').resolves([carMockWithId]);
    sinon.stub(service, 'readOne').resolves(carMockWithId);
    sinon.stub(service, 'update').resolves(carMockWithId);
    sinon.stub(service, 'delete').resolves(carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  })

  describe('Criar carros', () => {
    it('Em caso de sucesso', async () => {
      req.body = carMock;
      await controller.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
  /* describe('Listar carros', () => {
    it('Em caso de sucesso', async () => {
      await controller.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
    });
  }); */
  /* describe('Listar carro por id', () => {
    it('Em caso de sucesso', async () => {
      req.params = { id: carMockWithId._id };
      await controller.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  }); */
  describe('Atualizar carro', () => {
    it('Em caso de sucesso', async () => {
      req.params = { id: carMockWithId._id };
      req.body = carMockForChange;
      await controller.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockForChangeId)).to.be.true;
    });
  });
  describe('Deletar carro', () => {
    it('Em caso de sucesso', async () => {
      req.params = { id: carMockWithId._id };
      await controller.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});