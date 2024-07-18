const getCelulasVisiveis = () => {
    let resultado = [] 
    $("td").each(function(index) { 
        if($(this).is(":visible")) {
            resultado.push($(this))
        }    
    }) 

    return resultado
}

const animar = () => {
    let tempoInicial = 2000;
    let iterador = 1
    getCelulasVisiveis().reverse().forEach(celula => {
        setTimeout(function() {
            celula.addClass('destaque')
        }, tempoInicial * iterador++)
    })
}