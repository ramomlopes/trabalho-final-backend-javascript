const sqlite3 = require('sqlite3').verbose();

class Database {
    
    static #instance = null;
    #db;

    constructor() {

        if (Database.#instance) return Database.#instance;

        this.#db = new sqlite3.Database('./src/database/database.db', (err) => {
            if (err) return console.error('Erro ao conectar:', err.message);
            
            console.log('Conectado ao SQLite');

            this.createTables();
        });

        Database.#instance = this;
    }

    getConnection() {
        return this.#db;
    }

    createTables() {

        const USUARIOS_SCHEMA = `CREATE TABLE IF NOT EXISTS usuarios (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                nome TEXT NOT NULL,
                                email TEXT NOT NULL,
                                senha TEXT NOT NULL,
                                cargo TEXT NOT NULL) `;
        
        const CATEGORIAS_SCHEMA = `CREATE TABLE IF NOT EXISTS categorias (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                nome TEXT NOT NULL) `;
                        
        const CHAMADOS_SCHEMA = `CREATE TABLE IF NOT EXISTS chamados (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                descricao TEXT NOT NULL,
                                cep TEXT NOT NULL,
                                cidade TEXT NOT NULL,
                                uf TEXT NOT NULL,
                                status TEXT NOT NULL,
                                prioridade TEXT NOT NULL,
                                data_criacao TEXT NOT NULL,
                                data_conclusao TEXT,
                                usuario_id INTEGER NOT NULL,
                                categoria_id INTEGER NOT NULL,
                                FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                                FOREIGN KEY (categoria_id) REFERENCES categorias(id) )`;
                            
        const HISTORICO_STATUS_SCHEMA = `CREATE TABLE IF NOT EXISTS historico_status (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        status_anterior TEXT,
                                        status_novo TEXT NOT NULL,
                                        data_alteracao TEXT,
                                        chamado_id INTEGER NOT NULL,
                                        FOREIGN KEY (chamado_id) REFERENCES chamados(id) )`;
        
        const schemas = [ USUARIOS_SCHEMA, CATEGORIAS_SCHEMA, CHAMADOS_SCHEMA, HISTORICO_STATUS_SCHEMA ];

        schemas.forEach(schema => {
            this.#db.run(schema, (err) => {
                if (err) return console.error(`Erro ao criar tabela (${schema}). Erro: ${err}`);
            });
        });
        
        console.log('Tabelas criadas com sucesso!\n');
    }
}

module.exports = new Database();