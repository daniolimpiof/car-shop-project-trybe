import { ICar } from './../../interfaces/ICar';

const carMock: ICar = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
};

const carMockWithId: ICar & { _id: string } = {
    _id: "5f9f1b9f9b9b9b9b9b9b9b9b",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
};

const carMockForChange: ICar = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
};

const carMockForChangeId: ICar  & { _id: string } = {
    _id: "5f9f1b9f9b9b9b9b9b9b9b9b",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
};

const carMockInvalid: any = {
	model: 'Ferrari',
}

export {
    carMock,
    carMockWithId,
    carMockForChange,
    carMockForChangeId,
    carMockInvalid
};