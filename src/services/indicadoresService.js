const filtroChamado = require('../repositories/indicadoresRepositorie');

const indicadoresService = {

    async categoriaRecorrente() {
        try {
            return await filtroChamado.categoriaRecorrente();
        } catch (error) {
            throw new Error(`Falha ao pegar chamado por categoria: ${err.message}`);
        }
    },

    async totalPorStatus() {
        try {
            return await filtroChamado.totalChamadosPorStatus();
        } catch (error) {
            throw new Error(`Falha ao pegar total de chamados por status: ${err.message}`);
        }
    },

    async mediaConclusaoChamado() {
        try {
            return await filtroChamado.tempoMedioDeConclusaoDoChamado();
        } catch (error) {
            throw new Error(`Falha ao pegar dados para tempo medio de conclusao: ${err.message}`);
        }
    }

}

module.exports = indicadoresService;