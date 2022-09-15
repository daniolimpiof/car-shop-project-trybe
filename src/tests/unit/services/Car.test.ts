import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import {
  carMock,
  carMockWithId,
  carMockForChange,
  carMockForChangeId,
  carMockInvalid
} from '../../mocks/carMocks';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../Middleware/erros/catalog';


describe('camada de service', () => {
  const model = new CarModel();
  const service = new CarService(model);

  before(async () => {
    sinon.stub(model, 'create').resolves(carMockWithId);
    sinon.stub(model, 'read').resolves([carMockWithId]);
    sinon.stub(model, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(model, 'update')
      .onCall(0).resolves(carMockForChangeId)
      .onCall(1).resolves(null);
    sinon.stub(model, 'delete')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore();
  })

  describe('Criando o carro', () => {
    it('Em caso de criar com sucesso', async () => {
      const resultCreated = await model.create(carMock);

      expect(resultCreated).to.be.deep.equal(carMockWithId);
    });

    it('Em caso de falha', async () => {
      try {
        await model.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('Ler toda a lista de carros', () => {
    it('Testa se é possível ler todos os carros', async () => {
      const readAllResult = await service.read();
      expect(readAllResult).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('Ler apenas um carro', () => {
    it('Testa se é possível ler apenas um carro', async () => {
      const readOneResult = await service.readOne(carMockWithId._id);
      expect(readOneResult).to.be.deep.equal(carMockWithId);
    });
    it('Dispara erro se não houver _id correta', async () => {
      try {
        await service.readOne(carMockWithId._id);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });

  describe('Atualizar um carro', () => {
    it('Testa se é possível atualizar um carro', async () => {
      const updateResult = await service.update(carMockWithId._id, carMockForChange);
      expect(updateResult).to.be.deep.equal(carMockForChangeId);
    });
   /*  it('Dispara erro se não houver o body correto', async () => {
      try {
        await service.update(carMockWithId._id, carMockInvalid);
        expect(true).to.be.false;
      } catch (error: any) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
    it('Dispara erro se não houver _id correta', async () => {
      sinon.restore();
      sinon.stub(model, 'update').rejects({ message: ErrorTypes.InvalidMongoId });
      try {
        await service.update('Invalida123', carMock);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    }); */
  });

  describe('Deletar um carro', () => {
    it('Testa se é possível deletar um carro', async () => {
      const deleteResult = await service.delete(carMockWithId._id);
      expect(deleteResult).to.be.deep.equal(carMockWithId);
    });
    it('Dispara erro se não houver _id correta', async () => {
      sinon.restore();
      sinon.stub(model, 'delete').rejects({ message: ErrorTypes.InvalidMongoId });
      try {
        await service.delete('Invalida123');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });
});

// Ref: https://sinonjs.org/releases/latest/stubs/ para uso do onCAll.