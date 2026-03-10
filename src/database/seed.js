const database = require('./Database');
const bcrypt = require('bcrypt');
const ChamadoFactory = require('../factories/ChamadoFactory');

function preencherBancoDeDados() {

    const db = database.getConnection();

    db.serialize(() => {

        const sqlUsers = `INSERT INTO usuarios (nome, email, senha, cargo) VALUES (?, ?, ?, ?)`;

        const users = [
            { nome: 'Ramom', email: 'ramom@gmail.com.br', senha: 'ramom1234', cargo: 'usuario' },
            { nome: 'Pedro', email: 'pedro@gmail.com.br', senha: 'pedro1234', cargo: 'usuario' },  
            { nome: 'Paulo', email: 'paulo@gmail.com.br', senha: 'paulo1234', cargo: 'usuario' },  
            { nome: 'Ana', email: 'ana@gmail.com.br', senha: 'ana1234', cargo: 'usuario' },  
            { nome: 'Maria', email: 'maria@gmail.com.br', senha: 'maria1234', cargo: 'usuario' },  
            { nome: 'Onca', email: 'onca@gmail.com.br', senha: 'onca1234', cargo: 'admin' },  
            { nome: 'Serjao', email: 'serjao@gmail.com.br', senha: 'serjao1234', cargo: 'editor' },  
        ];
    
        users.forEach(async user => {
            const hash = await bcrypt.hash(user.senha, 10);
            
            db.run(sqlUsers, [user.nome, user.email, hash, user.cargo], (err) => {
                if (err) return console.error('Erro na inserção de dados de USUARIO:', err.message);
            });
        });

        const sqlCategoria = `INSERT INTO categorias (nome) VALUES (?)`;

        const categorias = { 
            1 : 'falta de energia', 
            2 : 'Vazamento',
            3 : 'Queda de arvore',
            4 : 'Pavimentacao', 
            5 : 'Sinalizacao de transito',
            6 : 'Poluicao sonora',
            7 : 'Foco de dengue',
        };

        Object.values(categorias).forEach(categoria => {
            db.run(sqlCategoria, [categoria.toUpperCase()], (err) => {
                if (err) return console.error('Erro na inserção de dados de CATEGORIA:', err.message);
            });
        });

        const sqlChamados = `INSERT INTO chamados (descricao, cep, cidade, uf, status, prioridade, data_criacao, data_conclusao, usuario_id, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const chamados = [
            { descricao: 'Faltou energia no bairro todo', cep: '38930000', cidade: 'Medeiros', uf: 'MG', status: 'ABERTO', data_criacao: '2026-02-05', data_conclusao: null, usuario_id: 1, categoria_id: 1 },
            { descricao: 'Sem enegia por mais de 2 horas', cep: '38930000', cidade: 'Medeiros', uf: 'MG', status: 'ABERTO', data_criacao: '2026-02-05', data_conclusao: null, usuario_id: 2, categoria_id: 1 },
            { descricao: 'Estou com suspeitas de um possível vazamento em minha residência', cep: '38900000', cidade: 'Bambuí', uf: 'MG', status: 'ABERTO', data_criacao: '2026-02-10', data_conclusao: null, usuario_id: 3, categoria_id: 2 },
            { descricao: 'Caiu uma árvore em frente a minha garagem', cep: '77024900', cidade: 'Palmas', uf: 'TO', status: 'EM_ATENDIMENTO', data_criacao: '2026-02-22', data_conclusao: null, usuario_id: 4, categoria_id: 3 },
            { descricao: 'A rua do Serjao está com muitos buracos', cep: '69900060', cidade: 'Rio Branco', uf: 'AC', status: 'EM_ATENDIMENTO', data_criacao: '2026-03-01', data_conclusao: null, usuario_id: 5, categoria_id: 4 },
            { descricao: 'Precisa de sinalização, está tendo acidentes', cep: '01001000', cidade: 'São Paulo', uf: 'SP', status: 'CONCLUIDO', data_criacao: '2026-01-04', data_conclusao: '2026-01-18', usuario_id: 3, categoria_id: 5 },
            { descricao: 'Encontrei um terreno com possíveis focos de dengue', cep: '01001000', cidade: 'São Paulo', uf: 'SP', status: 'ABERTO', data_criacao: '2026-02-12', data_conclusao: null, usuario_id: 2, categoria_id: 7 },
            { descricao: 'Realização de obras com muito barulho em horário não permitido', cep: '01001000', cidade: 'São Paulo', uf: 'SP', status: 'EM_ATENDIMENTO', data_criacao: '2026-01-23', data_conclusao: null, usuario_id: 4, categoria_id: 6 },
            { descricao: 'Meu vizinho está ligando o som muito alto toda noite', cep: '01001000', cidade: 'São Paulo', uf: 'SP', status: 'CONCLUIDO', data_criacao: '2026-03-07', data_conclusao: '2026-03-12', usuario_id: 2, categoria_id: 6 },
        ];

        chamados.forEach(c => {
            const categoria = categorias[c.categoria_id];
            const prioridade = ChamadoFactory.processar(categoria.toUpperCase());
            c.prioridade = prioridade;
            db.run(sqlChamados, [c.descricao, c.cep, c.cidade, c.uf, c.status, c.prioridade, c.data_criacao, c.data_conclusao, c.usuario_id, c.categoria_id], (err) => {
                if (err) return console.error('Erro na inserção de dados de CHAMADOS:', err.message);
            });
        });

        const sqlHistoricos = `INSERT INTO historico_status (status_anterior, status_novo, data_alteracao, chamado_id) VALUES (?, ?, ?, ?)`;

        const historicos = [
            { status_anterior: 'ABERTO', status_novo: 'EM_ATENDIMENTO', data_alteracao: '2026-01-05', chamado_id: 6 },
            { status_anterior: 'EM_ATENDIMENTO', status_novo: 'CONCLUIDO', data_alteracao: '2026-01-18', chamado_id: 6 },
            { status_anterior: 'ABERTO', status_novo: 'EM_ATENDIMENTO', data_alteracao: '2026-01-26', chamado_id: 8 },
            { status_anterior: 'ABERTO', status_novo: 'EM_ATENDIMENTO', data_alteracao: '2026-02-24', chamado_id: 4 },
            { status_anterior: 'ABERTO', status_novo: 'EM_ATENDIMENTO', data_alteracao: '2026-03-02', chamado_id: 5 },
            { status_anterior: 'ABERTO', status_novo: 'EM_ATENDIMENTO', data_alteracao: '2026-03-10', chamado_id: 9 },
            { status_anterior: 'EM_ATENDIMENTO', status_novo: 'CONCLUIDO', data_alteracao: '2026-03-12', chamado_id: 9 },
        ];

        historicos.forEach(h => {
            db.run(sqlHistoricos, [h.status_anterior, h.status_novo, h.data_alteracao, h.chamado_id], (err) => {
                if (err) return console.error('Erro na inserção de dados de HISTORICO_STATUS:', err.message);
            });
        });

    });
}

preencherBancoDeDados();

module.exports = preencherBancoDeDados;