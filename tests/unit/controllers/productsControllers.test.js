const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe("quando retorna os produtos", async () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService,'getProducts').resolves(true);
    });

    after(() => {
      productsService.getProducts.restore();
    });

    it("é chamado o status com o código 200", async () => {
      await productsController.getProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

describe("quando retorna os produtos pelo id", async () => {
  const response = {};
  const request = {};

  before(() => {
    request.params = [
      {
        id: 1,
      },
    ];

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, "getProductsById").resolves(true);
  });

  after(() => {
    productsService.getProductsById.restore();
  });

  it("é chamado o status com o código 200", async () => {
    await productsController.getProductsById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});

describe('Quando a requisição não é feita com sucesso', () => {
  const response = {};
  const request = {};    
    before(() => {
        request.params = [
          {
            id: 1,
          },
        ];

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, "getProductsById").resolves(false);
      });

      after(() => {
        productsService.getProductsById.restore();
      });

      it("é chamado o status com o código 404", async () => {
        await productsController.getProductsById(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('é chamado o send com a mensagem "Product not found"', async () => {
        await productsController.getProductsById(request, response);
        expect(
          response.json.calledWith({ message: "Product not found" })
        ).to.be.equal(true);
      });
});

describe("quando é adiconado um novo produto com sucesso", async () => {
  const response = {};
  const request = {};

  before(() => {
    request.body = [
      {
        name: "ProdutoX",
      },
    ];

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, "addProducts").resolves(true);
  });

  after(() => {
    productsService.addProducts.restore();
  });

  it("é chamado o status com o código 201", async () => {
    await productsController.addProducts(request, response);
    expect(response.status.calledWith(201)).to.be.equal(true);
  });
});