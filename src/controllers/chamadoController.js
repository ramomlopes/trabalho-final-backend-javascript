const chamadoService = require('../services/chamadoService');

const chamadoController = {

    async cadastrarChamado(req, res) {

        if (!req.body) return res.status(400).json({ erro: 'Nenhum corpo foi enviado na requisição' });

        const { descricao, cep, usuario_id, categoria_id } = req.body;
        const chamado = { descricao, cep, usuario_id, categoria_id };

        if (!chamado) return res.status().json({ erro: 'Informações invalidas' });

        try {
            await chamadoService.cadastro(chamado);
            return res.status(201).json({ msg: 'Chamado realizado com sucesso' });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    async atualizarChamado(req, res) {

        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ erro: 'Nenhum id foi informado' });

        if (!req.body) return res.status(400).json({ erro: 'Nenhum corpo foi enviado na requisição' });

        const { descricao, cep, usuario_id, categoria_id } = req.body;
        const chamado = { id, descricao, cep, usuario_id, categoria_id };

        if (!chamado) return res.status(400).json({ erro: 'Informações invalidas' });

        try {
            await chamadoService.atualizar(chamado);
            return res.status(201).json({ msg: 'Chamado atualizado com sucesso' });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    },

    async atualizarStatusChamado(req, res) {
        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ erro: 'Nenhum id foi informado' });

        try {
            await chamadoService.atualizarStatus(id);
            return res.status(201).json({ msg: 'Status do chamado atualizado com sucesso' });
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    },

    deletarChamado(req, res) {
        
        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ erro: 'Nenhum id foi informado' });

        try {
            chamadoService.deletar(id);
            return res.status(203).send();
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

}

module.exports = chamadoController;