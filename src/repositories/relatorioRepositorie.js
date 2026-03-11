const db = require('../database/Database').getConnection();

const relatorioRepositorie = {

    filtrarCategoria(categoria) {

        const sql = `SELECT
                        ch.id,
                        ch.descricao,
                        ch.status,
                        ch.data_criacao,
                        c.nome AS categoria
                    FROM chamados ch
                    INNER JOIN categorias c ON ch.categoria_id = c.id
                    WHERE c.nome = ?
                    ORDER BY ch.data_criacao DESC`;

        return new Promise((resolve, reject) => {
            db.all(sql, [categoria], (err, row) => {
                if (err) return reject(err.message);
                if (!row) return resolve(null);

                resolve(row);
            });
        });
    }, 

    filtrarStatus(status) {

        const sql = `SELECT
                        id,
                        descricao,
                        prioridade,
                        data_criacao
                    FROM chamados
                    WHERE status = ?
                    ORDER BY data_criacao ASC`;

        return new Promise((resolve, reject) => {
            db.all(sql, [status], (err, row) => {
                if (err) return reject(err.message);
                if (!row) return resolve(null);

                resolve(row);
            });
        });
    },

    filtrarPeriodo(inicial, final) {

        const sql = `SELECT * FROM chamados
                    WHERE julianday(data_criacao)
                    BETWEEN julianday(?) AND julianday(?)
                    ORDER BY data_criacao DESC`;

        return new Promise((resolve, reject) => {
            db.all(sql, [inicial, final], (err, row) => {
                if (err) return reject(err.message);
                if (!row) return resolve(null);

                resolve(row);
            });
        });
    }

}

module.exports = relatorioRepositorie;