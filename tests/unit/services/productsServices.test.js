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

describe("Adiciona um novo produto", () => {
  before(async () => {
    const execute = {
      name: "ProdutoX",
    };

    sinon.stub(productsModel, "addProducts").resolves(execute);
  });

  after(async () => {
    productsModel.addProducts.restore();
  });

  it("quando não tem sucesso, retorna um array vazio", async () => {
    const response = await productsService.addProducts("ProdutoX");
    expect(response.length === 0).to.be.equal(false);
  });

  it("Quando tem sucesso, retorna o propriedade name", async () => {
    const response = await productsService.addProducts("ProdutoX");
    expect(response).to.have.a.property("name");
  });

  it('Não tem sucesso quando a propriedade name não é inserida', async () => {
    const response = await productsService.addProducts('');
    expect(response).to.have.a.not.property("name");
  })

});

describe("Quando o name é modificado", () => {
  before(async () => {
    const execute = {
      name: "ProdutoX",
    };

    sinon.stub(productsModel, "updateProducts").resolves(execute);
  });

  after(async () => {
    productsModel.updateProducts.restore();
  });
  
  it("quando não tem sucesso, retorna um array vazio", async () => {
    const response = await productsService.updateProducts(1, "ProdutoX");
    expect(response.length === 0).to.be.equal(false);
  });

  it('Quando tem sucesso, retorna o produto modificado', async () => {
    const response = await productsService.updateProducts(1, "ProdutoX");
    expect(response).to.have.a.property("name");
  });

  it('Quando não tem sucesso, a propriedade name não é inserida', async () => {
    const response = await productsService.updateProducts(1, '');
    expect(response).to.have.a.not.property("name");
  });

  it('A propriedade name só é modificada quando tem mais de 5 caracteres', async () => {
    const response = await productsService.updateProducts("ProdutoX");
    expect(response.length < 5).to.be.equal(false);
  });
});
 
describe('Quando um produto é deletado', () => {
  before(async () => {
    const execute = {
      name: "ProdutoX",
    };
      
    sinon.stub(productsModel, "deleteProducts").resolves(execute);
  });
  
  after(async () => {
    productsModel.deleteProducts.restore();
  });
  
  it("quando tem sucesso, retorna um objeto a menos", async () => {
    const response = await productsService.deleteProducts(1);
    expect(response.length === 2).to.be.equal(false);
  });

});
