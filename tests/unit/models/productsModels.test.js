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

describe('Insere um novo produto', async () => {
  const insertProduct = {
    name: "ProdutoX",
  };

  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, "execute").resolves(execute);
  })
 
  after(async () => {
    connection.execute.restore();
  });

  it('Quando o produto é inserido com sucesso', async () => {
    const response = await productsModel.addProducts(insertProduct);
    expect(response).to.be.a('object');
    expect(response).to.have.a.property("id");
  });
})

describe('Atualiza um produto', async () => {
  before(() => {
    const execute = [
      {
        name: "Martelo do Batman",
      },
    ];
    sinon.stub(connection, "execute").resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it("Quando o produto é atualizado com sucesso", async () => {
    const response = await productsModel.updateProducts({ name: "Martelo do Batman" });
    expect(response).to.be.a("object");
  });
  
});

describe('Deleta um produto', async () => {
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
 
  it('Quando o produto é deletado com sucesso', async () => {
    const response = await productsModel.deleteProducts(1);
    expect(response.length === 2).to.be.equal(false);
  });
});

describe('Retorna os produtos do banco de dados pesquisados pelo nome', () => {
  before(() => {
    const execute = [{
      id: 1,
      name: "Martelo de Thor",
    }];
    sinon.stub(connection, "execute").resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  })
  it("Retorna tal produto do nome pesquisado", async () => {
    const response = await productsModel.searchProducts("Martelo de Thor");
    expect(response).to.be.a('object');
    expect(response).to.have.a.property("id");
    expect(response.id).to.be.equal(1);
  });
});