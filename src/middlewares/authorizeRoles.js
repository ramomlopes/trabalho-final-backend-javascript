function authorizeRoles(...cargosPermitidos) {

    return (req, res, next) => {
        
        if (!req.user) {
            console.log('Usuario nao autenticado.');
            return res.status(401).json({ erro: 'Usuario nao autenticado.' });
        }

        const cargoAutorizado = cargosPermitidos.includes(req.user.cargo);

        if (!cargoAutorizado) {
            console.log(`Cargo bloqueado: ${req.user.cargo}. Cargos Permitidos ${cargosPermitidos.join(', ')}.`);
            return res.status(403).json({erro: 'Cargo nao permitido para esta rota.'});
        }

        console.log(`Cargo ${req.user.cargo} liberado para a rota.`);
        return next();
    }
    
}

module.exports = authorizeRoles;