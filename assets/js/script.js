
/**
 * Faz com que as colunas dos números que não estejam envolvidos sumam, duplica se necessário e assim como ordena a sequência dos algarismos por coluna.
 * 
 * @param {*} operando - array com os algarismos do operando da esquerda na multiplicação
 */
const ajustarParaOperando1 = (operando) => {
    const algarismos = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const colunasDeAlgarismosASeremExcluidas = algarismos.filter((algarismo) => !operando.includes(algarismo))//Algarismos que não pertencem ao operando 
    colunasDeAlgarismosASeremExcluidas.forEach(algarismo => $(`td[localizacao $= "-${algarismo}"]`).hide(2000))//Esconde as colunas indesejadas

    //Duplicar os devidos duplicados
    let duplicados = []
    operando.forEach(algarismo => {
        let aparicoes = 0
        operando.forEach(algarismo2 => {
            if(algarismo == algarismo2) 
                ++aparicoes
        })

        if(aparicoes > 1 && !duplicados.includes(algarismo)) {
            let coluna =  $(`td[localizacao $= "-${algarismo}"]`)
            for(let i = 1; i < aparicoes; i++) {
                coluna.each(function( index ) {
                    $(`tr[linha="${index + 1}"]`).append($(this).clone())
                });
            }   

            duplicados.push(algarismo)
        }
    })


    //Ordenar
    /* 
        Pega sempre a próxima coluna correspondente do algarismo e põe no final na ordem do operando
    */
    operando.forEach(algarismo => {
    
            let coluna =  $(`td[localizacao $= "-${algarismo}"]:not(.ordenado)`)

            //Células da próxima coluna
            let celulas = []
            coluna.each(function( index ) { 
                const celulaDaColuna = celulas.filter(celula => $(celula).attr("localizacao") == $(this).attr("localizacao"))
                if(celulaDaColuna.length == 0) {
                    celulas.push($(this))
                }
            });

           for(let i = 0; i < 9; ++i) {
                let novaCelula = celulas[i].clone()
                novaCelula.addClass('ordenado')
                $(`tr[linha="${i + 1}"]`).append(novaCelula)
                celulas[i].remove()
           }
            
    })
    
}