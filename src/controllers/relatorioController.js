const relatorioService = require('../services/relatorioService')

const relatorioController = {

    async filtroCategoria(req, res) {

        const categoria = req.params.categoria.toUpperCase();

        try {
            const relatorio = await relatorioService.filtroCategoria(categoria);

            return res.status(200).json({ 
                mensagem: `Categoria: ${categoria}`,
                filtragem_por_categoria: relatorio
            });
        } catch (error) {
            res.status(400).json({ erro: error.message });            
        }
    },

    async filtroStatus(req, res) {

        const status = req.params.status.toUpperCase(); 

        try {
            const relatorio = await relatorioService.filtroStatus(status);

            return res.status(200).json({ 
                mensagem: `Status: ${status}`,
                filtragem_por_status: relatorio
            });
        } catch (error) {
            res.status(400).json({ erro: error.message });            
        }
    },

    async filtroPeriodo(req, res) {

        const inicial = req.params.inicial;
        const final = req.params.final;

        try {
            const relatorio = await relatorioService.filtroPeriodo(inicial, final);

            return res.status(200).json({ 
                mensagem: `Período: ${inicial} até ${final}`,
                filtragem_por_status: relatorio
            });
        } catch (error) {
            res.status(400).json({ erro: error.message });            
        }
    }

}

module.exports = relatorioController;