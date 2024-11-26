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

### yarn init

-   Inicialização

### yarn add express

-   Facilita criação de API REST

### yarn add -D typescript @type/express ts-node-dev

-   Instala typescript como desenvolvimento, a tipagem do express para vscode e o ts-node-dev para rodar arquivos pelo CMD

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

yarn add http-status-codes
yarn add -D @types/http-status-codes

```typescript
import { StatusCodes } from 'http-status-codes';

[...]

return res.status(StatusCodes.NOT_ACCEPTABLE).json({})
```

##### .env

yarn add dotenv

import 'dotenv/config';

-   PORT=3333
-   process.env.PORT

##### Compilar TS para JS (tsc)

yarn tsc --init

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

npm add yup

-   Vincular a interface ao YUP para melhor controle das regras de validação

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

