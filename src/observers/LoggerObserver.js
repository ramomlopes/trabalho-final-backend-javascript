class LoggerObserver {

    update(dados) {
        console.log(`[Log Observer] Status do chamado ${dados.id} alterado para ${dados.status_novo}`);
    }

}

module.exports = LoggerObserver;