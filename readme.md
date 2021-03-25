# Finances Backend

## Sobre

Backend da aplicação Finances em Node.js para gestão de transações com envio de arquivos por formulário. Este é o sexto desafio proposto no bootcamp GoStack da [Rocketseat](https://github.com/Rocketseat).

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/en/)
- Banco de dados [PostgreSQL](https://www.postgresql.org/)
- Mapedor de objetos relacionais [TypeORM](https://typeorm.io/#/)

## Requisitos

Para executar o projeto é necessário ter os seguintes requisitos instalados no sistema:

- [Node.js](https://nodejs.org/en/) 12.x ou superior
- [Yarn](https://yarnpkg.com/) 1.21 ou superior
- Banco de dados [PostgreSQL](https://www.postgresql.org/) 11.x ou superior

## Executando o projeto

### Clonando o projeto

```bash
$ git clone https://github.com/paulojrr/Finances-backend.git
$ cd Finances-backend
```

### Scripts para execução do projeto

Dentro do diretório do projeto pela primeira vez, você deve se certificar que o serviço PostgreSQL está sendo executado e deve criar um banco de dados chamado `gostack_desafio06`. No arquivo `./ormconfig.json` é possivel alterar as configurações de porta, usuario e senha do PostgreSQL de acordo com o seu contexto.

```json
{
  "type": "postgres",
  "host": "address_of_your_host",
  "port": number_of_postgres_port,
  "username": "your_postgres_user",
  "password": "your_password",
  "database": "gostack_desafio06",
  "entities": ["./src/models/*.ts"],
  "migrations": ["./src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
```

Com as configurações feitas de forma correta, pode-se utilizar o comando `yarn` para instalar as dependências, então os seguintes scripts podem ser executados:

#### `yarn typeorm migration:run`

Configura os relacionamentos criados no TypeORM no PostgreSQL.<br />
Você poderá visualizar quaisquer erros no console.

#### `yarn dev:server`

Executa o backend em modo de desenvolvimento.<br />
Você poderá visualizar quaisquer erros no console.

#### `yarn test`

Executa os scripts de testes realizados.<br />
PS: Para este comando é necessário ter criado o banco de dados `gostack_desafio06_tests`. Você poderá visualizar quaisquer erros no console.

<h3 align="center">
  Enunciado do desafio proposto
</h3>

## Sobre o desafio

Nesse desafio, foi dado continuidade ao desenvolvimento da aplicação de gestão de transações, treinando Node.js junto ao TypeScript, mas dessa vez incluindo o uso de banco de dados com o TypeORM e envio de arquivos com o Multer!

A aplicação armazena transações financeiras de entrada e saída e permite o cadastro e a listagem dessas transações, além de permitir a criação de novos registros no banco de dados a partir do envio de um arquivo csv.

### Funcionalidades da aplicação

- **`POST /transactions`**: A rota deve receber `title`, `value`, `type`, e `category` dentro do corpo da requisição, sendo o `type` o tipo da transação, que deve ser `income` para entradas (depósitos) e `outcome` para saídas (retiradas). Ao cadastrar uma nova transação, ela deve ser armazenada dentro do seu banco de dados, possuindo os campos `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`.

* **`GET /transactions`**: Essa rota deve retornar uma listagem com todas as transações que você cadastrou até agora, junto com o valor da soma de entradas, retiradas e total de crédito. Essa rota deve retornar um objeto o seguinte formato:

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salário",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Freela",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Pagamento da fatura",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Cadeira Gamer",
      "value": 1200,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Recreation",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```

- **`DELETE /transactions/:id`**: A rota deve deletar uma transação com o `id` presente nos parâmetros da rota;

* **`POST /transactions/import`**: A rota deve permitir a importação de um arquivo com formato `.csv` contendo as mesmas informações necessárias para criação de uma transação `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`, onde cada linha do arquivo CSV deve ser um novo registro para o banco de dados, e por fim retorne todas as `transactions` que foram importadas para seu banco de dados. O arquivo csv, deve seguir o seguinte [modelo](./assets/file.csv)

### Específicação dos testes

Para esse desafio temos os seguintes testes:

- **`should be able to create a new transaction`**: Para que esse teste passe, sua aplicação deve permitir que uma transação seja criada, e retorne um json com a transação criado.

* **`should create tags when inserting new transactions`**: Para que esse teste passe, sua aplicação deve permitir que ao criar uma nova transação com uma categoria que não existe, essa seja criada e inserida no campo category_id da transação com o `id` que acabou de ser criado.

- **`should not create tags when they already exists`**: Para que esse teste passe, sua aplicação deve permitir que ao criar uma nova transação com uma categoria que já existe, seja atribuído ao campo category_id da transação com o `id` dessa categoria existente, não permitindo a criação de categorias com o mesmo `title`.

* **`should be able to list the transactions`**: Para que esse teste passe, sua aplicação deve permitir que seja retornado um array de objetos contendo todas as transações junto ao balanço de income, outcome e total das transações que foram criadas até o momento.

- **`should not be able to create outcome transaction without a valid balance`**: Para que esse teste passe, sua aplicação não deve permitir que uma transação do tipo `outcome` extrapole o valor total que o usuário tem em caixa (total de income), retornando uma resposta com código HTTP 400 e uma mensagem de erro no seguinte formato: `{ error: string }`.

* **`should be able to delete a transaction`**: Para que esse teste passe, você deve permitir que a sua rota de delete exclua uma transação, e ao fazer a exclusão, ele retorne uma resposta vazia, com status 204.

- **`should be able to import transactions`**: Para que esse teste passe, sua aplicação deve permitir que seja importado um arquivo csv, contendo o seguinte [modelo](./assets/file.csv). Com o arquivo importado, você deve permitir que seja criado no banco de dados todos os registros e categorias que estavam presentes nesse arquivo, e retornar todas as transactions que foram importadas.
