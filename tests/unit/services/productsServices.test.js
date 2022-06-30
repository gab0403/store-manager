const sinon = require("sinon");
const { expect } = require("chai");

const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsService");

  describe('Quando retorna algum resultado', () => {

  before(() => {
    const array = [];
    sinon.stub(productsModel, 'getProducts')
      .resolves(array);
  });

  after(() => {
    productsModel.getProducts.restore();
  });

  it('quando não tem sucesso, retorna um array vazio', async () => {
    const response = await productsService.getProducts();
    expect(response.length === 0).to.be.equal(true);
  });
  });
 
 describe("Retorna os produtos do banco de dados", () => {
   before(async () => {
     const execute = [
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
     sinon.stub(productsModel, "getProducts").resolves(execute);
   });

   after(() => {
     productsModel.getProducts.restore();
   });

   it("Quando retorna um objeto", async () => {
     const response = await productsModel.getProducts();
     expect(response.length > 0).to.be.equal(true);
   });
 });

describe('Quando retorna algum resultado pesquisado pelo id', () => {
  before(async () => {
    const execute =
    {
      id: 1,
      name: "Martelo de Thor",
    }

    sinon.stub(productsModel, "getProductsById").resolves(execute);
  });
  
  after(async () => {
    productsModel.getProductsById.restore();
  });
  
  it('Quando retorna um produto pesquisado pelo id', async () => {
    const response = await productsService.getProductsById(1);
    expect(response.id).to.be.equal(1);
  });

  it('Quando retorna o produto, retorna o propriedade id', async () => {
    const response = await productsService.getProductsById(1);
    expect(response).to.have.a.property('id');
  })

  it("quando não tem sucesso, retorna um array vazio", async () => {
    const response = await productsService.getProductsById(1);
    expect(response.length === 0).to.be.equal(false);
  });
});
