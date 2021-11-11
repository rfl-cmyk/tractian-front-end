export const tradStatus = status => {
    var estado = [{ est: '', cor: '' }];

    switch (status) {
        case 'inAlert':
            estado.est = 'Em Parada';
            estado.cor = 'red';
            break;
    
        case 'inOperation':
            estado.est = 'Em Operação';
            estado.cor = 'green';
            break;
        
        default: 
            estado.est = 'Em Alerta';
            estado.cor = 'yellow';
            break;
    }

    return estado;
}

export const tradModel = status => {
    var modelo = '';

    if(status === 'motor') {
        modelo = 'Motor'
    } else {
        modelo = 'Ventilador'
    }

    return modelo;
}