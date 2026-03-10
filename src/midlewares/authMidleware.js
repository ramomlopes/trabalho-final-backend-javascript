const jwt = require('jsonwebtoken');

function authMidleware(req, res, next) {

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        console.error('FATAL ERROR: JWT_SECRET não encontrado no ambiente!');
        process.exit(1);
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log('Autenticação negada por ausência do header Authorization');
        return res.status(401).json({erro: 'Token não enviado'});
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        console.log ('Formato de token invalido, esperado Bearer Token');
        return res.status(401).json({erro: 'Formato de token inválido'});
    }

    try {
        
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;

        console.log (`Usuario: ${payload.nome} auntenticado como ${payload.cargo}`);
        return next();

    } catch(erro) {

        console.log(`Token Rejeitado Motivo: ${erro.message}`);
        return res.status(403).json({erro: 'Token invalido ou expirado'});
        
    }
    
}

module.exports = authMidleware;