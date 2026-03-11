class ChamadoFactory {
    
    static processar(categoria) {

        const nivelPrioridade = {
            'FALTA DE ENERGIA': 'ALTA',
            'VAZAMENTO': 'MEDIA',
            'QUEDA DE ARVORE': 'ALTA',
            'PAVIMENTACAO': 'BAIXA',
            'SINALIZACAO DE TRANSITO': 'BAIXA',
            'POLUICAO SONORA': 'MEDIA',
            'FOCO DE DENGUE': 'ALTA',
        }

        return nivelPrioridade[categoria] || null;
    }
}

module.exports =  ChamadoFactory;