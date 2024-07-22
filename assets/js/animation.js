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
        matriz[linha][coluna++] = celulasVisiveis[index]
    
        if(indicador % quantidadeDeColunas == 0 && index != 0 && index !=  (celulasVisiveis.length - 1)) {
            matriz.push([])
            linha++;
            coluna = 0;
        }

        ++indicador;
        
    }

    return matriz;
}


const animar = (quantidadeDeColunas) => {
    const matriz = formarMatriz(quantidadeDeColunas)
    let tempoInicialDaColuna = 3000;
    let tempoDaCelula = 3000;

    for (let coluna = matriz[0].length - 1; coluna >= 0; coluna--) {
        for (let linha = matriz.length - 1; linha >= 0; linha--) {
 
            setTimeout(function()  {
                $(matriz[linha][coluna]).addClass('destaque-embaixo')
            }, tempoDaCelula);

            setTimeout(function()  {
                $(matriz[linha][coluna]).addClass('destaque-emcima')
            }, tempoDaCelula + 3000);

            tempoDaCelula += 3000;
        }

        tempoInicialDaColuna += 3000;
        tempoDaCelula = tempoInicialDaColuna
    }
}

const resultar = (operando1, operando2) => {
    operando1 = parseInt(operando1)
    operando2 = parseInt(operando2)

    let resultado = operando1 * operando2
    resultado = `${resultado}`.split('')

    let tempo = 3500;

    resultado.reverse().forEach((algarismo) => {
        setTimeout(function()  {
            $('#resultado').prepend(`<span class='algarismo'>${algarismo}</span>`)
        }, tempo);
        tempo += 3500;
    })
}