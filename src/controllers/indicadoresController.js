const indicadoresService = require('../services/indicadoresService');

const indicadoresController = {

    async mostrarIndicadores(req, res) {
        try {
            const categoriaRecorrente = await indicadoresService.categoriaRecorrente();
            const totalPorStatus = await indicadoresService.totalPorStatus();
            const tempoMedioConclusao = await indicadoresService.mediaConclusaoChamado();

            const horas = tempoMedioConclusao.tempo_medio_horas;
            const dias = horas/24;

            return res.status(200).json({
                mensagem: 'INDICADORES DE CHAMADOS',
                categoria_mais_recorrente: categoriaRecorrente,
                total_por_status: totalPorStatus,
                tempo_medio_conclusao: `${horas} horas ou ${dias} dias`
            });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }
}

module.exports = indicadoresController;