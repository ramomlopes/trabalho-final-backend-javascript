const db = require('../database/Database').getConnection();

const chamadoRepositorie = {

    verificarCategoria(categoria_id) {
        
        return new Promise((resolve, reject) => {
            const sql = 'SELECT nome FROM categorias WHERE id = ?';

            db.get(sql, [categoria_id], (err, row) => {
                if (err) return reject(err);
                if (!row) return resolve(null);

                resolve(row.nome);
            });
        });
    },

    verificarStatus(id) {

        return new Promise((resolve, reject) => {
            const sql = 'SELECT status FROM chamados WHERE id = ?';

            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                if (!row) return resolve(null);

                resolve(row.status);
            });
        });
    },

    criarChamado(chamado) {
        const sql = 'INSERT INTO chamados (descricao, cep, cidade, uf, status, prioridade, data_criacao, usuario_id, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        db.run(sql, [chamado.descricao, chamado.cep, chamado.cidade, chamado.uf, chamado.status, chamado.prioridade, chamado.data_criacao, chamado.usuario_id, chamado.categoria_id], (err) => {
            if (err) throw new Error(`Erro ao cadastrar chamado: ${err.message}`);
        });
    },

    atualizarChamado(chamado) {
        const sql = 'UPDATE chamados SET descricao = ?, cep = ?, cidade = ?, uf = ?, prioridade = ?, usuario_id = ?, categoria_id = ? WHERE id = ?';

        db.run(sql, [chamado.descricao, chamado.cep, chamado.cidade, chamado.uf, chamado.prioridade, chamado.usuario_id, chamado.categoria_id, chamado.id], (err) => {
            if (err) throw new Error(`Erro ao atualizar chamado: ${err.message}`);
        });
    },

    atualizarStatusChamado(novoStatus, id) {    
        const sql = 'UPDATE chamados SET status = ? WHERE id = ?';

        db.run(sql, [novoStatus, id], (err) => {
            if (err) throw new Error(`Erro ao atualizar status do chamado: ${err.message}`);
        });
    },

    deletarChamado(id) {
        const sql = 'DELETE FROM chamados WHERE id = ?';

        db.run(sql, [id], (err) => {
            if (err) throw new Error(`Erro ao deletar chamado: ${err.message}`);
        });
    },
}

module.exports = chamadoRepositorie;