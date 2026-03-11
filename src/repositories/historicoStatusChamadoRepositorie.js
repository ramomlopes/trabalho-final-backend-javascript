const db = require('../database/Database').getConnection();

const historicoStatusChamadoRepositorie = {

    atualizar(dados) {

        const sql = `INSERT INTO historico_status
                    (status_anterior, status_novo, data_alteracao, chamado_id)
                    VALUES (?, ?, ?, ?)`;
        
        db.run(sql, [dados.status_anterior, dados.status_novo, dados.data_alteracao, dados.id], (err) => {
            if (err) throw new Error(`Falha ao inserir dados em historico_status: ${err.message}`);
        });
    }
}

module.exports = historicoStatusChamadoRepositorie;