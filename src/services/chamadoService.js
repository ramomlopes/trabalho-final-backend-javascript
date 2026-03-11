const chamadoRepositorie = require('../repositories/chamadoRepositorie');
const ChamadoFactory = require('../factories/ChamadoFactory');
const historicoStatusRepositorie = require('../repositories/historicoStatusChamadoRepositorie');

let observers = [];

const chamadoService = {

    addObservador(observer) {
        observers.push(observer);
    },

    notify(dados) {
        observers.forEach(observer => observer.update(dados));
    },

    regraAtualizacaoStatusChamado(status) {

        const atualizaStatus = {
            'ABERTO': 'EM_ATENDIMENTO',
            'EM_ATENDIMENTO': 'CONCLUIDO'
        }

        return atualizaStatus[status] || null;
    },

    async cadastro(chamado) {

        try {
            const urlViaCep = `https://viacep.com.br/ws/${chamado.cep}/json/`;

            const response = await fetch(urlViaCep);
            if (!response.ok) throw new Error(`Falha ao conectar com o ViaCEP`);
            
            const dadosViaCep = await response.json();
            if (dadosViaCep.erro) throw new Error('CEP não encontrado');

            const categoria = await chamadoRepositorie.verificarCategoria(chamado.categoria_id);
            if (!categoria) throw new Error('Categoria inexistente');

            const prioridade = ChamadoFactory.processar(categoria);
            if (!prioridade) throw new Error(`Não foi catalogado uma prioridade para esta categoria: ${categoria}`);
            
            const data = new Date().toISOString().split('T')[0];

            chamado.status = 'ABERTO';
            chamado.prioridade = prioridade;
            chamado.cidade = dadosViaCep.localidade;
            chamado.uf = dadosViaCep.uf;
            chamado.data_criacao = data;

            if (!chamado) throw new Error('Não chegou nenhuma informação de chamado para cadastro');
            
            chamadoRepositorie.criarChamado(chamado);

        } catch (error) {
            throw new Error(error.message);            
        }
    },

    async atualizar(chamado) {

        try {
            const urlViaCep = `https://viacep.com.br/ws/${chamado.cep}/json/`;
            
            const response = await fetch(urlViaCep);
            if (!response.ok) throw new Error(`Falha ao conectar com o ViaCEP`);
            
            const dadosViaCep = await response.json();
            if (dadosViaCep.erro) throw new Error('CEP não encontrado');

            const categoria = await chamadoRepositorie.verificarCategoria(chamado.categoria_id);
            if (!categoria) throw new Error('Categoria inexistente');

            const prioridade = ChamadoFactory.processar(categoria);
            if (!prioridade) throw new Error(`Não foi catalogado uma prioridade para esta categoria: ${categoria}`);

            chamado.prioridade = prioridade;
            chamado.cidade = dadosViaCep.localidade;
            chamado.uf = dadosViaCep.uf;

            if (!chamado) throw new Error('Não chegou nenhuma informação de chamado para atualização');
            
            chamadoRepositorie.atualizarChamado(chamado);

        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    async atualizarStatus(id) {

        try {

            const statusChamado = await chamadoRepositorie.verificarStatus(id);
            if (statusChamado === 'CONCLUIDO') throw new Error('Chamado já está concluído');

            const novoStatus = this.regraAtualizacaoStatusChamado(statusChamado);
            chamadoRepositorie.atualizarStatusChamado(novoStatus, id);

            const data_alteracao = new Date().toISOString().split('T')[0];
            
            const dados = {
                status_anterior: statusChamado,
                status_novo: novoStatus,
                data_alteracao,
                id
            }

            historicoStatusRepositorie.atualizar(dados);
            this.notify(dados);
            
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deletar(id) {

        if (!id) throw new Error('Não chegou nenhum id de chamado para deletar');

        try {
            chamadoRepositorie.deletarChamado(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = chamadoService;