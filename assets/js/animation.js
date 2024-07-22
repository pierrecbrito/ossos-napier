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


const animar = (quantidadeDeColunas, quantidadeDeLinhas) => {
    const matriz = formarMatriz(quantidadeDeColunas)
    let tempoInicialDaColuna = 3000;
    let tempoDaCelula = 3000;

    for (let coluna = matriz[0].length - 1; coluna >= 0; coluna--) {
        for (let linha = matriz.length - 1; linha >= 0; linha--) {
 
            setTimeout(function()  {
                $(matriz[linha][coluna]).addClass('destaque-embaixo')
            }, tempoDaCelula);

            $(matriz[linha][coluna]).attr('time-embaixo', `${tempoDaCelula}`)
            $(matriz[linha][coluna]).attr('time-cima', `${tempoDaCelula + 3000}`)

            setTimeout(function()  {
                $(matriz[linha][coluna]).addClass('destaque-emcima')
                
            }, tempoDaCelula + 3000);

            tempoDaCelula += 3000;
        }

        tempoInicialDaColuna += 3000;
        tempoDaCelula = tempoInicialDaColuna
    }

    animarSomaDasDiagonais(quantidadeDeLinhas)
}

const animarSomaDasDiagonais = (quantidadeDeLinhas) => {
    let tempoDaDiagonaDaVez = 3000;
    let diagonalIndex = 1;

    const intervalo = setInterval(function() {
        let somaInferiores = 0
        let somaSuperiores = 0

        $(`td[time-embaixo='${tempoDaDiagonaDaVez}'] .numero-inferior`).each(function(){
            somaInferiores += parseInt($(this).text().trim())
        })

        $(`td[time-cima='${tempoDaDiagonaDaVez}'] .numero-superior`).each(function(){
            somaInferiores += parseInt($(this).text().trim())
        })

        if($(`td[time-embaixo='${tempoDaDiagonaDaVez}'] .numero-inferior`).length == 0 && $(`td[time-cima='${tempoDaDiagonaDaVez}'] .numero-superior`).length == 0) {
            pararIntervalo()
        } else {
            let somaDiagonal = somaInferiores + somaSuperiores

            if(diagonalIndex++ <= quantidadeDeLinhas) {  
                let somaElemento = $(`<span class="resultado-diagonal-direita">${somaDiagonal}</span>`)
                somaElemento.offset({top: $(`td[time-embaixo='${tempoDaDiagonaDaVez}']`).first().offset().top, left: $(`td[time-embaixo='${tempoDaDiagonaDaVez}']`).first().offset().left + 95})
                $('#container-principal').append(somaElemento)
            } else {
                let somaElemento = $(`<span class="resultado-diagonal-cima">${somaDiagonal}</span>`)
                somaElemento.offset({top: $(`td[time-cima='${tempoDaDiagonaDaVez}']`).first().offset().top - 30, left: $(`td[time-cima='${tempoDaDiagonaDaVez}']`).first().offset().left + 45})
                $('#container-principal').append(somaElemento)
            }
        }

        tempoDaDiagonaDaVez += 3000;
       
    }, 3025)

    const pararIntervalo = () => clearInterval(intervalo)
}

const resultar = (operando1, operando2) => {
    operando1 = parseInt(operando1)
    operando2 = parseInt(operando2)

    let resultado = operando1 * operando2
    resultado = `${resultado}`.split('')

    let tempo = 4000;

    resultado.reverse().forEach((algarismo) => {
        setTimeout(function()  {
            $('#resultado').prepend(`<span class='algarismo'>${algarismo}</span>`)
        }, tempo);
        tempo += 3000;
    })
}