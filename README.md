Índice de Comandos:
1. [yarn init](#yarn-init) : Gera um arquivo package.json no diretório atual, contendo informações básicas do projeto.
2. [express](#express) : Instala o pacote express.
3. [typescript](#typescript) : Instala typescript como uma dependência para escrever código em TypeScript.
4. [http-status-codes](#http-status-codes) : Instala o pacote http-status-codes, que fornece constantes para códigos de status HTTP (como 200, 404, etc.).
5. [types-http-status-codes](#types-http-status-codes) : Instala as definições de tipos para o pacote http-status-codes para uso com TypeScript.
6. [dotenv](#dotenv) : Instala o pacote dotenv, usado para carregar variáveis de ambiente de um arquivo .env para o process.env.
7. [tsc init](#tsc-init) : Gera um arquivo tsconfig.json com configurações padrão para projetos TypeScript.
8. [yup](#yup) : Instala o pacote yup (uma biblioteca para validação de esquemas de objetos) usando o npm (alternativa ao Yarn).
9. [jest](#jest) : Instala o framework de testes jest.
10. [jest init](#jest-init) : Inicializa a configuração do Jest, uma biblioteca de testes para JavaScript e TypeScript.
10. [supertest](#supertest) : Instala o pacote supertest, usado para realizar testes de integração em aplicativos web.

## Endpoints

---

<small>v1</small>

### Cidades _(Privado)_

| **Method** | **URI**      | **Detail**                                                 |
| ---------- | ------------ | ---------------------------------------------------------- |
| `GET`      | /cidades     | Busca uma lista de cidade, com paginação e filtro por nome |
| `POST`     | /cidades     | Criar uma nova cidade                                      |
| `GET`      | /cidades/:id | Busca apenas uma cidade pelo seu id                        |
| `PUT`      | /cidades/:id | Atualiza uma cidade pelo seu id                            |
| `DELETE`   | /cidades/:id | Apaga a cidade pelo seu id                                 |

### Pessoas _(Privado)_

| **Method** | **URI**      | **Detail**                                                 |
| ---------- | ------------ | ---------------------------------------------------------- |
| `GET`      | /pessoas     | Busca uma lista de pessoa, com paginação e filtro por nome |
| `POST`     | /pessoas     | Criar uma nova pessoa                                      |
| `GET`      | /pessoas/:id | Busca apenas uma pessoa pelo seu id                        |
| `PUT`      | /pessoas/:id | Atualiza uma pessoa pelo seu id                            |
| `DELETE`   | /pessoas/:id | Apaga a pessoa pelo seu id                                 |

### Login _(Público)_

| **Method** | **URI**    | **Detail**                                                                                 |
| ---------- | ---------- | ------------------------------------------------------------------------------------------ |
| `POST`     | /entrar    | Permite um usuário existente no sistema gerar um t oken para acessar os endpoints privados |
| `POST`     | /cadastrar | Permite criar um novo usuário                                                              |

## Commands

<a id="yarn-init">yarn init</a>

- Descrição: Inicializa um novo projeto gerando um arquivo package.json no diretório atual. Esse arquivo contém informações básicas do projeto.
- Interatividade: Geralmente pede informações como nome do projeto, versão, autor, etc.

<a id="express">yarn add express</a>

- Descrição: Instala o pacote express, um framework de servidor web para Node.js que facilita a criação de API Rest.
- Resultado: Adiciona o express à seção "dependencies" do package.json.

<a id="typescript">yarn add -D typescript @type/express ts-node-dev</a>

- Descrição:
    - Instala typescript como uma dependência de desenvolvimento para escrever código em TypeScript.
    - Instala @types/express para suporte de tipagem do Express em projetos TypeScript.
    - Instala ts-node-dev, uma ferramenta para rodar projetos TypeScript com reinicialização automática em alterações.
- Resultado: Dependências adicionadas à seção "devDependencies" no package.json.

### /src

-   Raiz de todo o backend, tudo o que estiver fora, não faz código da aplicação

#### /src/server

-   Todo o código do servidor

#### /src/index.ts

-   Arquivo principal da aplicação
-   Porta de entrada da API REST (listen)

##### /src/server/Server.ts

-   Código base do servidor
-   Uma camada adentro do servidor

##### /src/routes/index.ts

-   Cria middleware para o servidor utilizando o Router do express

```typescript
import { Router } from 'express';

[...]

const router = Router();

router.get('/', (req, res) => {
    return res.send('Retorno: rota /');
});

export { router };
```

-   Utilizando res.json() para melhor entendimento de headers e configurações pelo express no frontend

##### Recebendo parâmetros pelo express

Params, query ou cookies

```typescript
router.post("/teste/:id", (req, res) => {
    console.log(req.params.id);
}
```

##### Traduz os códigos de status

<a id="http-status-codes">yarn add http-status-codes</a>

- Descrição: Instala o pacote http-status-codes, que fornece constantes para códigos de status HTTP (como 200, 404, etc.).
- Resultado: Adiciona o pacote à seção "dependencies" do package.json.

<a id="types-http-status-codes">yarn add -D @types/http-status-codes</a>

- Descrição: Instala as definições de tipos para o pacote http-status-codes para uso com TypeScript.
- Resultado: Adiciona o pacote à seção "devDependencies" no package.json.

```typescript
import { StatusCodes } from 'http-status-codes';

[...]

return res.status(StatusCodes.NOT_ACCEPTABLE).json({})
```

##### .env

<a id="dotenv">yarn add dotenv</a>

- Descrição: Instala o pacote dotenv, usado para carregar variáveis de ambiente de um arquivo .env para o process.env.
- Resultado: Adiciona o pacote à seção "dependencies" do package.json.

import 'dotenv/config';

-   PORT=3333
-   process.env.PORT

##### Compilar TS para JS (tsc)

<a id="tsc-init">yarn tsc --init</a>

- Descrição: Gera um arquivo tsconfig.json com configurações padrão para projetos TypeScript.
- Resultado: Cria o arquivo tsconfig.json no diretório atual.

Cria-se o tsconfig.json, que é o arquivos de configuração do compilador

Alterar, no tsconfig, o "outDir" para definir onde mover os novos arquivos JS
Mantendo a arquitetura de diretórios

    "outDir": "./build",

<small>Obs: Adicionar /build ao gitignore</small>

Definir a pasta onde estão os TS que queremos compilar

    "rootDir": "./src",

##### src/server/Controllers, Database, Shared

Criando diretórios

Controllers = Controladores de rotas, processador de dados, o que acontece em cada rota
Database = Configurações do banco de dados
Shared = Compartilhado para o projeto inteiro (em todas as controllers, etc)

##### src/server/shared/middleware

Validação, autenticação

##### src/server/shared/services

Acessos externos (utilidades externas, API de terceiros, função de critografia)

##### Criação de controller

-   Separar os controllers por métodos dentro de diretórios
    Ex: Diretório "cidades" apenas controllers referente

src/controllers/cidades/Create.ts

```typescript
export const create = (req: Request, res: Response) => {
    return res.send("Message from controller: Created!");
};
```

<small>req: Request, res: Response (importar do Express)</small>

src/controllers/cidades/index.ts
Encapsula os métodos via spread

```typescript
import * as create from "./Create";

export const CidadesController = {
    ...create,
};
```

-   src/controllers/index.ts

```typescript
export { * } from './cidades';
```

↑ Exporta tudo de cidades

↓ Emporta no routes/index.ts v

```typescript
import { CidadesController } from "./../controllers";
```

E assim usar o CidadesController.create, que é método exportado em cascata

Resumo:
Controllers são exportados de src/controllers/cidades/Create.ts
Importados para src/controllers/cidades/index.ts
Encapsulados e exportados novamente
Reexporatados diretamente em src/controllers/index.ts
Encapsulamento importado em /src/routes/index.ts
E utilizado o método

##### Modelagem e tipagem das variáveis do Request

-   src/controllers/cidades/Create.ts

```typescript
interface ICidade {
    name: string;
    lastName?: string; //?: não obrigatório
}

export const create = (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body.name);
};
```

<small>Passando a variável de interface como o terceiro parâmetro do Request, utilizando <> para que o Request seja o especificado</small>

##### Validação de dados (Biblioteca YUP)

<a href="https://npmjs.com/package/yup">npmjs.com/package/yup</a>

<a id="yup">npm add yup</a>

- Descrição: Instala o pacote yup (uma biblioteca para validação de esquemas de objetos) usando o npm (alternativa ao Yarn).
- Resultado: Adiciona yup à seção "dependencies" do package.json.

Vincular a interface ao YUP para melhor controle das regras de validação

```typescript
interface ICidade {
    name: string;
}

const dataValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
    name: yup.string().required().min(3),
});

let validatedData: ICidade | undefined = undefined;
try {
    validatedData = await dataValidation.validate(req.body);
} catch (err) {
    const yupError = err as yup.ValidationError;

    return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        errors: {
            default: yupError.message,
        },
    });
}
```

validatedData = await dataValidation.validate(req.body, { abortEarly: false });

<small>AbortEarly: false = Não para antes de validar todos os dados enviados, para retornar ao usuário todos os erros de uma vez (Obj)</small>

##### Validação

Validação de vários campos de uma vez, e retornar no Response

```typescript
try {
    validatedData = await dataValidation.validate(req.body, {
        abortEarly: false,
    });
} catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
        if (error.path === undefined) return;
        errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
        errors,
    });
}
```

###### Tradução dos erros do YUP

-   /src/server/shared/services/YupTranslation.ts

```typescript
import { setLocale } from "yup";

setLocale({
    mixed: {
        required: "Este campo é obrigatório",
        notType: "Formato digitado é invalido",
        defined: "Este campo precisa ter um valor definido",
        oneOf: "Deve ser um dos seguintes valores: ${values}",
        notOneOf: "Não pode ser um dos seguintes valores: ${values}",
    },
    string: {
        lowercase: "Deve estar em maiúsculo",
        uppercase: "Deve estar em minúsculo",
        url: "Deve ter um formato de URL válida",
        max: "Deve ter no máximo ${max} caracteres",
        min: "Deve ter pelo menos ${min} caracteres",
        email: "Formato de e-mail digitado não é valido",
        length: "Deve ter exatamente ${length} caracteres",
        uuid: "Valor digitado não confere a um UUID valido",
        trim: "Não deve conter espaços no início ou no fim.",
        matches: "O valor deve corresponder ao padrão: ${regex}",
    },
    number: {
        min: "Deve ser no mínimo ${min}",
        max: "Deve ser no máximo ${max}",
        integer: "Deve ser um número inteiro",
        lessThan: "Deve ser menor que ${less}",
        moreThan: "Deve ser maior que ${more}",
        positive: "Deve ser um número positivo",
        negative: "Deve ser um número negativo",
    },
    date: {
        min: "Deve ser maior que a data ${min}",
        max: "Deve ser menor que a data ${max}",
    },
    array: {
        min: "Deve ter no mínimo ${min} itens",
        max: "Deve ter no máximo ${max} itens",
        length: "Deve conter exatamente ${length} itens",
    },
    object: {
        noUnknown: "Deve ser passado um valor definido",
    },
});
```

-   /src/server/Server.ts

```typescript
import "./shared/services/YupTranslation";
```

<small>Realizar a importação do arquivo de tradução (Antes da importação das Rotas)</small>

##### Middleware

/src/shared/middlewares/Validation.ts

```typescript
// Basicamente mover o Try-Catch para o arquivo de middleware e vincular ao controller
export const validation: TValidation =
    (getAllSchemas) => async (req, res, next) => {
        const schemas = getAllSchemas((schema) => schema);
        const errorsResult: Record<string, Record<string, string>> = {};

        Object.entries(schemas).forEach(([key, schema]) => {
            try {
                schema.validateSync(req[key as TProperty], {
                    abortEarly: false,
                });
            } catch (err) {
                const yupError = err as ValidationError;
                const errors: Record<string, string> = {};

                yupError.inner.forEach((error) => {
                    if (error.path === undefined) return;
                    errors[error.path] = error.message;
                });

                errorsResult[key] = errors;
            }
        });

        if (Object.entries(errorsResult).length === 0) {
            return next();
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                errors: errorsResult,
            });
        }
    };
```

```typescript
// Enviando o Schema do objeto que queremos validar para a função do middleware, onde lá teremos o next()
export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(
        yup.object().shape({
            name: yup.string().required().min(3),
            lastName: yup.string().required().min(3),
        })
    ),
    query: getSchema<IFilter>(
        yup.object().shape({
            filter: yup.string().min(3),
        })
    ),
}));
```

##### Setup do Jest (Automatizando testes)

<a id="jest">npm install jest ts-jest @types/jest</a>

- Descrição:
    - Instala o framework de testes jest.
    - Instala ts-jest, um utilitário para integrar o Jest com TypeScript.
    - Instala @types/jest, que fornece definições de tipos para Jest, úteis em projetos TypeScript.
- Resultado: Adiciona essas dependências ao projeto, geralmente na seção "devDependencies" do package.json.

<a id="jest-init">npm jest --init</a>

- Descrição: Inicializa a configuração do Jest, uma biblioteca de testes para JavaScript e TypeScript.
- Resultado: Cria um arquivo de configuração (jest.config.js ou .json) para o Jest.

/jest.configs.ts

```typescript
//Descomentar e deixar apenas json
    coverageReporters: [
        "json",
    ],

[...]

//Criar o arquivo abaixo
    setupFilesAfterEnv: [
        './tests/jest.setup.ts'
    ],

[...]

    testMatch: [
        '<rootDir>/tests/**/*.test.ts'
    ],

[...]

    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
```

<small>Adicionar '/coverage' ao .gitignore</small>

<a id="supertest">yarn add -D supertest @types/supertest</a>

- Descrição:
    - Instala o pacote supertest, usado para realizar testes de integração em aplicativos web.
    - Instala as definições de tipos de supertest para uso com TypeScript.
- Resultado: Ambos os pacotes são adicionados à seção "devDependencies" no package.json.

Testa o servidor inteiro do Express

```typescript
///tests/jest.setup.ts
import supertest from "supertest";
import { server } from "../src/server/Server";

export const testServer = supertest(server);
```

```typescript
//tsconfig.json (Exclude para ignorar a compilação dos testes)
"exclude": [
    "./jest.config.ts",
    "./node_modules",
    "./tests",
    "./build",
  ]
```

##### Criação do primeiro teste para cidades

```typescript
// tests/cidades/Create.test.ts
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
    it("Cria registro", async () => {
        const res1 = await testServer
            .post("/cidades")
            .send({ name: "São Vicente" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Recebeu 201 (Created), esperava 400  (Created)
        expect(typeof res1.body).toEqual('number');
    });
    it("Tenta criar um registro com nome muito curto", async () => {
        const res1 = await testServer
            .post("/cidades")
            .send({ name: "Sã" });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); // Recebeu 201 (Created), esperava 400  (Bad Request)
        expect(res1.body).toHaveProperty('errors.body.name');
    });
    it("Tenta criar um registro com número", async () => {
        const res1 = await testServer
            .post("/cidades")
            .send({ name: 123 });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); // Recebeu 201 (Created), esperava 400  (Bad Request)
        expect(res1.body).toHaveProperty('errors.body.name');
    });
});
```

    npm run test
    ( "test": "jest" )

Ao rodar os testes, o jest simula que a rota é chamada e o dado fictício é enviado (via .send)

## Deploy

### Configuração do Deploy

