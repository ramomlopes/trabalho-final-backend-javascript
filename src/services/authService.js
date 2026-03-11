const authRepositorie = require('../repositories/authRepositorie');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

function gerarToken(usuario) {
    
    const payload = {
        id: usuario.id,
        nome: usuario.nome,
        cargo: usuario.cargo
    };

    return jwt.sign(payload, JWT_SECRET, {expiresIn:'1h'});
}

const authService = {

    async login(email, senha) {
        const usuarioModel = { email, senha }; 

        const usuario = await authRepositorie.buscarUsuarioPorCredenciais(usuarioModel);

        if (!usuario) throw new Error('Usuario não encontrado');

        const token = gerarToken(usuario);

        return {
            usuario,
            token
        }
    }

}

module.exports = authService;