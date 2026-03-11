const db = require('../database/Database').getConnection();

const indicadoresRepositorie = {

    categoriaRecorrente() {
        const sql = `SELECT 
                        c.nome AS categoria,
                        COUNT(ch.id) AS total_chamados 
                    FROM chamados ch
                    INNER JOIN categorias c ON ch.categoria_id = c.id
                    GROUP BY c.nome
                    ORDER BY total_chamados DESC
                    LIMIT 1`

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, row) => {
                if (err) return reject(err.message);
                if (!row) return resolve(null);

                resolve(row);
            });
        });
        
    },

    totalChamadosPorStatus() {
        const sql = `SELECT
                        status,
                        COUNT(id) AS total
                    FROM chamados
                    GROUP BY status`;

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err.message);
                if (!rows) return resolve(null);

                resolve(rows);
            });
        });
    },

    tempoMedioDeConclusaoDoChamado() {
        const sql = `SELECT
                        AVG(julianday(data_conclusao) - 
                        julianday(data_criacao)) * 24 AS
                        tempo_medio_horas
                    FROM chamados
                    WHERE status = 'CONCLUIDO' AND
                    data_conclusao IS NOT NULL AND
                    data_criacao IS NOT NULL`;

        return new Promise((resolve, reject) => {
            db.get(sql, [], (err, row) => {
                if (err) return reject(err.message);
                if (!row) return resolve(null);

                const media = (row && row.tempo_medio_horas) ? parseFloat(row.tempo_medio_horas.toFixed(2)) : 0;

                resolve({ tempo_medio_horas: media });
            });
        });
    }

}

module.exports = indicadoresRepositorie;