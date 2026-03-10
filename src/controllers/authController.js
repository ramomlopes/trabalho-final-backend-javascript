const authService = require('../services/authService');

const authController = {

    async login(req, res) {

        const {email, senha} = req.body;
        if (!email || !senha) return res.status(400).json({ erro: 'Email e Senha são obrigatórios' });

        try {
            const login = await authService.login(email, senha);
            if (!login) return res.status(401).json({ erro: 'Credenciais inválidas' });
            console.log(`LOGIN REALIZADO: Token emitido para ${login.usuario.nome}, Cargo: ${login.usuario.cargo}`);

            return res.json ({
                mensagem: 'Login realizado com Sucesso',
                token: login.token
            });
            
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }
}

module.exports = authController;