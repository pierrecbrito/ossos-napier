const getCelulasVisiveis = () => {
    let resultado = [] 
    $("td.cruzada").each(function(index) { 
        if($(this).is(":visible")) {
            resultado.push($(this))
        }    
    }) 

    return resultado
}

/**
 * Transforma todas células disponíveis organizada em matriz.
 * @param {} quantidadeDeColunas 
 * @returns 
 */
const formarMatriz = (quantidadeDeColunas) => {
    let celulasVisiveis = getCelulasVisiveis()
    let matriz = [[]]
    let linha = 0;
    let coluna = 0;
    let indicador = 1;

    for (let index = 0; index < celulasVisiveis.length; index++) {
        matriz[linha][coluna] = celulasVisiveis[index]
        coluna++;

        if(indicador % quantidadeDeColunas == 0 && index != 0 && index != celulasVisiveis.length - 1) {
            matriz.push([])
            linha++;
            coluna = 0;
        }
        
        indicador++;
    }

    return matriz;
}


const animar = (quantidadeDeColunas) => {
    const matriz = formarMatriz(quantidadeDeColunas)
    let tempoInicialDaColuna = 2000;
    let tempoDaCelula = 2000;

    for (let coluna = matriz[0].length - 1; coluna >= 0; coluna--) {
        for (let linha = matriz.length - 1; linha >= 0; linha--) {
 
            setTimeout(function()  {
                $(matriz[linha][coluna]).addClass('destaque-embaixo')
            }, tempoDaCelula);

            setTimeout(function()  {
                $(matriz[linha][coluna]).addClass('destaque-emcima')
            }, tempoDaCelula + 2000);

            tempoDaCelula += 2000;
        }

        tempoInicialDaColuna += 2000;
        tempoDaCelula = tempoInicialDaColuna
    }
}