const db = require('../database/Database').getConnection();
const bcrypt = require('bcrypt');

const authRepositorie = {

    buscarUsuarioPorCredenciais(usuario) {

        const sql = 'SELECT id, nome, email, senha, cargo FROM usuarios WHERE email = ?';
        
        return new Promise((resolve, reject) => {
            db.get(sql,[usuario.email], (err, row) => {

                if (err) return reject(err.message);
                if (!row) return resolve(null);

                const senhaValida = bcrypt.compare(usuario.senha, row.senha);
                senhaValida ? resolve(row) : resolve(null);
            });
        });
    }
}

module.exports = authRepositorie;