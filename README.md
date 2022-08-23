# Projeto Store Manager

## O que foi desenvolvido:

 Está API utiliza a arquitetura MSC (model-service-controller).

  * A API construída é um sistema de gerenciamento de vendas no formato dropshipping onde é possível criar, visualizar, deletar e atualizar produtos e vendas. Foi utilizado o banco de dados MySQL para a gestão de dados. Além disso, a API é RESTful.

  ## Diagrama de Entidade-Relacionamento

  ![DER](./images/erStoreManager.png)

## Tabelas

 ### A tabela `products` tem o seguinte formato: *(O id será gerado automaticamente)*

  ![Tabela Produtos](./images/tableproducts.png)

 ### A tabela `sales` tem o seguinte formato: *(O id e date são gerados automaticamente)*

  ![Tabela Vendas](./images/tablesales.png)


 ### A tabela `sales_products`, é a tabela que faz o relacionamento `N:N` entre `products` e `sales` e tem o seguinte formato: *(O produto e a venda são deletados automaticamente)*

  ![Tabela Vendas-Produtos](./images/tablesalesproducts.png)
  
---

## Para executar os testes de unidade:
  ```sh
    npm run test:mocha
  ```

 ## Tecnologias utilizadas:
![Express](https://img.shields.io/badge/-EXPRESS-green?style=for-the-badge&logo=express&logoColor=white)
![MOCHA](https://img.shields.io/badge/-MOCHA-brown?style=for-the-badge&logo=mocha&logoColor=white)
![CHAI](https://img.shields.io/badge/-CHAI-red?style=for-the-badge&logo=mocha&logoColor=white)
![SINON](https://img.shields.io/badge/-SINON-green?style=for-the-badge&logo=mocha&logoColor=white)
