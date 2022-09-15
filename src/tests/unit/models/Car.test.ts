import chai from 'chai';
const { expect } = chai;
import * as sinon from 'sinon';
import { ErrorTypes } from '../../../Middleware/erros/catalog';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import {
  carMock,
  carMockWithId,
  carMockForChange,
  carMockForChangeId,
  // carMockInvalid
} from '../../mocks/carMocks';

describe('Teste de para o CarModel', () => {
  const model = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findById').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  })

  describe('Criando um carro', () => {
    it('Testa se é possível criar o carro', async () => {
      const result = await model.create(carMock);
      expect(result).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Ler toda a lista de carros', () => {
    it('Testa se é possível ler todos os carros', async () => {
      const readAllResult = await model.read();
      expect(readAllResult).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('Ler apenas um carro', () => {
    it('Testa se é possível ler apenas um carro', async () => {
      const readOneResult = await model.readOne('5f9f1b9f9b9b9b9b9b9b9b9b');
      expect(readOneResult).to.be.deep.equal(carMockWithId);
    });
    it('Dispara erro se não houver _id correta', async () => {
      try {
        await model.readOne('');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('Atualizar um carro', () => {
    it('Testa se é possível atualizar um carro', async () => {
      const updateResult = await model.update('5f9f1b9f9b9b9b9b9b9b9b9b', carMockForChange);
      expect(updateResult).to.be.deep.equal(carMockForChangeId);
    });
    it('Dispara erro se não houver _id correta', async () => {
      try {
        await model.update('INVALIDA145', carMockForChange);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('Deletar um carro', () => {
    it('Testa se é possível deletar um carro', async () => {
      const deleteResult = await model.delete(carMockWithId._id);
      expect(deleteResult).to.be.deep.equal(carMockWithId);
    });
    it('Dispara erro se não houver _id correta', async () => {
      try {
        await model.delete('INVALIDA145');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });
});