# CRUD Mundo

Gerenciamento de Continentes, Países e Cidades — TypeScript, Express, EJS e MySQL

O CRUD Mundo é uma aplicação web completa (frontend e backend) construída com TypeScript, combinando um backend em Node.js/Express e uma interface renderizada com EJS.
A plataforma oferece recursos para cadastrar, editar, listar e remover Continentes, Países e Cidades, incluindo busca, paginação e controles administrativos.

O projeto também utiliza dados externos da REST Countries e conta com visualização geográfica por meio de Leaflet, tornando o gerenciamento mais completo e informativo.

## Requisitos
- [Node.js 22+](https://nodejs.org/en/download)
- [MySQL](https://dev.mysql.com/downloads/mysql)

## Tecnologias Utilizadas

### Backend

-   TypeScript
-   Node.js + Express
-   MySQL

### Frontend

-   EJS
-   Bootstrap

### APIs Externas

-   Leaflet (Mapa interativo para o Dashboard)
-   REST Countries API (Carregamento de informaçoes de países e suas bandeiras)

## Informações Importantes

-   Na primeira execução, o banco de dados inicia sem registros.
    Portanto, Continentes, Países e Cidades precisam ser inseridos manualmente por meio da própria aplicação.

-   Ao criar um novo país, é necessário informar o nome em inglês, para que a API externa retorne os dados corretamentes.

-   A exclusão possui efeito cascata: deletar um continente também remove seus países e cidades atreladas (e o mesmo vale para países → cidades).


## Estrutura do projeto
``` text
crud-mundo/
├── database/
│   ├── database.ts
│   ├── database.sql
│   └── create-database.ts
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── index.js
│       ├── geo.js
│       ├── admin/
│       │   ├── cities.js
│       │   └── countries.js
│       └── dashbord/
│           └── map.js
├── types/
│   ├── entities.d.ts
│   └── express-session.d.ts
├── views/
│   ├── partials/
│   │   ├── sidebar.ejs
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   ├── admin/
│   │   │   ├── cities.ejs
│   │   │   ├── continents.ejs
│   │   │   └── countries.ejs
│   │   └── dashboard/
│   │       ├── general.ejs
│   │       ├── map.ejs
│   │       ├── cities.ejs
│   │       ├── continents.ejs
│   │       └── countries.ejs
│   ├── index.ejs
│   ├── layout.ejs
│   ├── login.ejs
│   └── geo.ejs
├── routes/
│   ├── geo.ts
│   ├── auth.ts
│   ├── index.ts
│   ├── dashbord/
│   │   ├── cities.ts
│   │   ├── continents.ts
│   │   ├── countries.ts
│   │   └── general.ts
│   └── admin/
│       ├── cities.ts
│       ├── continents.ts
│       └── countries.ts
├── services/
│   ├── external/
│   │   ├── map.service.ts
│   │   └── restCountries.service.ts
│   ├── dashbord/
│   │   ├── cities.service.ts
│   │   ├── continents.service.ts
│   │   ├── countries.service.ts
│   │   └── general.service.ts
│   └── admin/
│       ├── cities.service.ts
│       ├── continents.service.ts
│       └── countries.service.ts
├── app.ts
├── .env.template
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── structure.md
``` 
A organização do projeto segue uma separação clara entre responsabilidades, facilitando manutenção, escalabilidade e entendimento geral da aplicação. Abaixo está um resumo das principais pastas e seus propósitos:

### database/
Contém tudo relacionado ao banco de dados.
- database.sql: script para criação das tabelas.
- database.ts: conexão e configuração inicial do MySQL.
- create-database.ts: script auxiliar para criar o banco pela aplicação.

### public/
Arquivos estáticos acessados diretamente pelo navegador.
- css/: estilos globais (ex.: style.css).
- js/: scripts do frontend, separados por páginas e módulos.

### types/
Arquivos de definição de tipos para o TypeScript.
- Tipos customizados usados pelas entidades e pela sessão do Express.

### views/
Templates EJS responsáveis pela renderização server-side.
- partials/: componentes reutilizáveis como navbar, sidebar e footer.
- Subpastas para admin e dashboard, organizando cada seção.
- Páginas principais: `index.ejs`, `login.ejs` e `geo.ejs`.
- Arquivo base: `layout.ejs`.

### routes/
Define as rotas da aplicação.
Separadas por área:
- Rotas gerais (index.ts, auth.ts, geo.ts)
- Rotas do dashboard
- Rotas administrativas (CRUD completo)

### services/
Camada de lógica de negócio.
Dividida em:
- external/: serviços que consomem APIs externas (REST Countries e Map).
- dashbord/: operações de leitura exibidas no dashboard.
- admin/: regras de CRUD para Continentes, Países e Cidades.

### Arquivos da raiz
- app.ts: ponto principal da aplicação Express.
- package.json: dependências e scripts
- tsconfig.json: configuração do TypeScript.
- .env.template: modelo das variáveis de ambiente.
- README.md e structure.md: documentação do projeto.


## Como Rodar o Projeto

### 1. Clonar o repositório

``` bash
git clone https://github.com/HumbertoIshii/crud-mundo.git
cd crud-mundo
```

### 2. Baixar as dependencias do projeto

``` bash
npm install
```

### 3. Banco de Dados

Faça uma copia do arquivo `.env.template` como `.env`.

``` bash
cp .env.template .env
```

Configure o `.env` com seu MySQL.

``` bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_NAME=crud_mundo
SESSION_SECRET=segredo_super_secreto
PORT=3000
```

Abra um terminal do MySQL.

``` bash
mysql -u seu_usuario -p
```
Ou utilize alguma uma ferramenta como [MySQL Workbench](https://dev.mysql.com/downloads/workbench) para criar um novo Database

``` sql
CREATE DATABASE crud_mundo
```
Rode o comando abaixo para gerar as tabelas no Banco de Dados e inserir um usuario Admin:

``` bash
npm run create-db 
```

### 3. Inicie o Projeto

``` bash
npm run dev
```

### 4. Acessar a aplicação

    http://localhost:3000/


## Preview do Projeto