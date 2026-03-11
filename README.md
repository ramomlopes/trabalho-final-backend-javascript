# Guia para rodar o projeto

### 1. Instalação de dependências

Com o projeto aberto, cole o seguinte conteúdo no terminal do VsCode:

```
npm install sqlite3 express bcrypt dotenv
```

### 2. Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e cole o seguinte conteúdo:

```
PORT=3001
JWT_SECRET=palavra-secreta
```

### 3. Inserts iniciais

Cole o seguinte conteúdo no terminal para povoar o banco de dados com inserts iniciais:

```
npm run seed
```

### 4. Executar o projeto

Para executar o projeto, digite o seguinte comando no terminal:

```
npm start
```
