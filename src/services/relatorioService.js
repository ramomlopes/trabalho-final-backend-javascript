const relatorioRepositorie = require('../repositories/relatorioRepositorie');

const relatorioService = {

    async filtroCategoria(categoria) {
        try {
            return await relatorioRepositorie.filtrarCategoria(categoria);
        } catch (error) {
            throw new Error(`Erro no relatório ao filtrar categoria: ${error.message}`);
        }
    },

    async filtroStatus(status) {
        try {
            return await relatorioRepositorie.filtrarStatus(status);
        } catch (error) {
            throw new Error(`Erro no relatório ao filtrar status: ${error.message}`);
        }
    },

    async filtroPeriodo(inicial, final) {
        try {
            return await relatorioRepositorie.filtrarPeriodo(inicial, final);
        } catch (error) {
            throw new Error(`Erro no relatório ao filtrar periodo: ${error.message}`);
        }
    }   
}

module.exports = relatorioService;