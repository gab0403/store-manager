const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require('../../../models/productsModel');

const connection = require("../../../helpers/connection");

describe('Retorna os produtos do banco de dados', () => {
  before(() => {
    const responseObj = [
      {
        id: 1,
        name: "Martelo de Thor",
      },
      {
        id: 2,
        name: "Traje de encolhimento",
      },
      {
        id: 3,
        name: "Escudo do Capitão América",
      },
    ]; 
      sinon.stub(connection, "execute").resolves(responseObj);
    });
   
  after(() => {
    connection.execute.restore();
  });

  it('Quando retorna um objeto', async () => {
    const response = await productsModel.getProducts();
    expect(response).to.be.a('object');
  });
});


describe("Retorna os produtos do banco de dados pesquisados pelo id", () => {
  before(() => {
    const execute = [{
      id: 1,
      name: "Martelo de Thor",
    }];
    sinon.stub(connection, "execute").resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it("Retorna tal produto do id pesquisado", async () => {
    const response = await productsModel.getProductsById(1);
    expect(response).to.be.a('object');
    expect(response).to.have.a.property("id");
    expect(response.id).to.be.equal(1);
  });
});

