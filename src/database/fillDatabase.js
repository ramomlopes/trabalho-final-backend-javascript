const database = require('./Database');

function fillDatabase() {

    const db = database.getConnection();

    db.serialize(() => {

        const sqlUsers = `INSERT INTO usuarios (nome, email, senha, cargo) VALUES (?, ?, ?, ?)`;

        const users = [
            { nome: 'Ramom', email: 'ramom@gmail.com.br', senha: 'seila123', cargo: 'usuario' },
            { nome: 'Pedro', email: 'pedro@gmail.com.br', senha: '123seila', cargo: 'usuario' },  
            { nome: 'Paulo', email: 'paulo@gmail.com.br', senha: '123456', cargo: 'usuario' },  
            { nome: 'Ana', email: 'ana@gmail.com.br', senha: '654321', cargo: 'usuario' },  
            { nome: 'Maria', email: 'maria@gmail.com.br', senha: 'teste1234', cargo: 'usuario' },  
            { nome: 'Onca', email: 'maria@gmail.com.br', senha: 'teste1234', cargo: 'admin' },  
            { nome: 'Serjao', email: 'maria@gmail.com.br', senha: 'teste1234', cargo: 'admin' },  
        ];

        users.forEach(user => {
            db.run(sqlUsers, [user.nome, user.email, user.senha, user.cargo], (err) => {
                if (err) return console.error('Erro na inserção de dados de USUARIO:', err.message);
            });
        });

        const sqlCategoria = `INSERT INTO categorias (nome) VALUES (?)`;

        const categorias = [ 'Falta de energia', 'Vazamento', 'Queda de árvore', 'Pavimentação', 'Sinalização de transito'];

        categorias.forEach(categoria => {
            db.run(sqlCategoria, [categoria], (err) => {
                if (err) return console.error('Erro na inserção de dados de CATEGORIA:', err.message);
            });
        });

        const sqlChamados = `INSERT INTO chamados (descricao, cep, cidade, uf, prioridade, status, dataAbertura, usuario_id, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const chamados = [
            { descricao: 'Faltou energia no bairro todo', cep: '38930000', cidade: 'Medeiros', uf: 'MG', prioridade: 'ALTA', status: 'ABERTO', dataAbertura: '05/02/2026', usuario_id: 1, categoria_id: 1 },
            { descricao: 'Sem enegia por mais de 2 horas', cep: '38930000', cidade: 'Medeiros', uf: 'MG', prioridade: 'ALTA', status: 'ABERTO', dataAbertura: '05/02/2026', usuario_id: 2, categoria_id: 1 },
            { descricao: 'Estou com suspeitas de um possível vazamento em minha residência', cep: '38900000', cidade: 'Bambuí', uf: 'MG', prioridade: 'BAIXA', status: 'ABERTO', dataAbertura: '10/02/2026', usuario_id: 3, categoria_id: 2 },
            { descricao: 'Caiu uma árvore em frente a minha garagem', cep: '77024900', cidade: 'Palmas', uf: 'TO', prioridade: 'MEDIA', status: 'EM_ATENDIMENTO', dataAbertura: '22/02/2026', usuario_id: 4, categoria_id: 3 },
            { descricao: 'A rua do Serjao está com muitos buracos', cep: '69900060', cidade: 'Rio Branco', uf: 'AC', prioridade: 'BAIXA', status: 'EM_ATENDIMENTO', dataAbertura: '01/03/2026', usuario_id: 5, categoria_id: 4 },
            { descricao: 'Precisa de sinalização, está tendo acidentes', cep: '01001000', cidade: 'São Paulo', uf: 'SP', prioridade: 'MEDIA', status: 'CONCLUIDO', dataAbertura: '04/01/2026', usuario_id: 3, categoria_id: 5 },
        ];

        chamados.forEach(c => {
            db.run(sqlChamados, [c.descricao, c.cep, c.cidade, c.uf, c.prioridade, c.status, c.dataAbertura, c.usuario_id, c.categoria_id], (err) => {
                if (err) return console.error('Erro na inserção de dados de CHAMADOS:', err.message);
            });
        });

        const sqlHistoricos = `INSERT INTO historico_status (status_anterior, status_novo, data_alteracao, chamado_id) VALUES (?, ?, ?, ?)`;

        const historicos = [
            { status_anterior: 'ABERTO', status_novo: 'EM_ATENDIMENTO', data_alteracao: '05/01/2026', chamado_id: 6 },
            { status_anterior: 'ABERTO', status_novo: 'EM_ATENDIMENTO', data_alteracao: '24/02/2026', chamado_id: 4 },
            { status_anterior: 'ABERTO', status_novo: 'EM_ATENDIMENTO', data_alteracao: '02/03/2026', chamado_id: 5 },
            { status_anterior: 'EM_ATENDIMENTO', status_novo: 'CONCLUIDO', data_alteracao: '06/01/2026', chamado_id: 6 },
        ];

        historicos.forEach(h => {
            db.run(sqlHistoricos, [h.status_anterior, h.status_novo, h.data_alteracao, h.chamado_id], (err) => {
                if (err) return console.error('Erro na inserção de dados de HISTORICO_STATUS:', err.message);
            });
        });

    });
}

fillDatabase();

module.exports = fillDatabase;