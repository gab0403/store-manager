const sinon = require("sinon");
const { expect } = require("chai");
const salesModel = require("../../../models/salesModel");

const connection = require("../../../helpers/connection");

describe("Retorna as sales", () => {
  before(() => {
    const responseObj = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2,
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2,
      },
    ];
    sinon.stub(connection, "execute").resolves(responseObj);
  });

  after(() => {
    connection.execute.restore();
  });

  it("Quando retorna um objeto", async () => {
    const response = await salesModel.getSales();
    expect(response).to.be.a("object");
  });
});

describe("Retorna as sales pesquisadas pelo id", () => {
  before(() => {
    const execute = [
      {
        date: "2022-07-07T00:01:48.000Z",
        productId: 3,
        quantity: 15,
      },
    ];
    sinon.stub(connection, "execute").resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it("Quando encontra o id pesquisado", async () => {
    const response = await salesModel.getSalesById(2);
    expect(response).to.be.a("object");
    expect(response).to.have.a.property("date");
    expect(response.productId).to.be.equal(3);
    expect(response.quantity).to.be.equal(15);
  });
});

describe("Quando deleta uma sale", async () => {
  before(() => {
    const responseObj = [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2,
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2,
      },
    ];
    sinon.stub(connection, "execute").resolves(responseObj);
  });

  after(() => {
    connection.execute.restore();
  });

  it("Quando o produto é deletado com sucesso", async () => {
    const response = await salesModel.deleteSales(1);
    expect(response.length === 2).to.be.equal(false);
  });
});

describe("Cria uma nova sale", async () => {
  const payloadSale = [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 50,
    },
  ];

  const payloadId = 1;

  before(async () => {
    sinon.stub(connection, "execute").resolves([]);
  });

  after(async () => {
    connection.execute.restore();
  });

  it("Quando a sale é inserido com sucesso", async () => {
    const response = await salesModel.addProductsSales(payloadId, payloadSale);
    expect(response).to.be.equal(1);
  });
});

describe("Atualiza sale", async () => {
  const payloadSale = [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 50,
    },
  ];

  const payloadId = 1;

  before(async () => {
    sinon.stub(connection, "execute").resolves([]);
  });

  after(async () => {
    connection.execute.restore();
  });

  it("Quando a sale é inserido com sucesso", async () => {
    const response = await salesModel.updateSales(payloadId, payloadSale);
    expect(response).to.be.equal(1);
  });
});