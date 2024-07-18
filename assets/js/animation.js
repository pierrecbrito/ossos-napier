const getCelulasVisiveis = () => {
    let resultado = [] 
    $("td").each(function(index) { 
        if($(this).is(":visible")) {
            resultado.push($(this))
        }    
    }) 

    return resultado
}