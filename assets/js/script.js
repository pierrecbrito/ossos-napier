
/**
 * Faz com que as colunas dos números que não estejam envolvidos sumam, duplica se necessário e assim como ordena a sequência dos algarismos por coluna.
 * 
 * @param {*} operando - array com os algarismos do operando da esquerda na multiplicação
 */
const ajustarParaOperando1 = (operando) => {
    const algarismos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

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
                    if(index == 0) {
                        $(`tr[linha="h"]`).append($(this).clone())
                    } else {
                        $(`tr[linha="${ index - 1}"]`).append($(this).clone())
                    }
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
            
            let novaCelula = celulas[0].clone()
            novaCelula.addClass('ordenado')
            $(`tr[linha="h"]`).append(novaCelula)
            celulas[0].remove()

            for(let i = 1; i < 9; ++i) {
                novaCelula = celulas[i].clone()
                novaCelula.addClass('ordenado')
                $(`tr[linha="${i - 1}"]`).append(novaCelula)
                celulas[i].remove()
           }
            
    })
    
}

const ajustarParaOperando2 = (operando) => {
    const algarismos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const linhasDeAlgarismosASeremExcluidas = algarismos.filter((algarismo) => !operando.includes(algarismo))//Algarismos que não pertencem ao operando 
    linhasDeAlgarismosASeremExcluidas.forEach(algarismo => $(`tr[linha = "${algarismo}"]`).hide(2000))//Esconde as colunas indesejadas

    
    //Duplicar os devidos duplicados
    let duplicados = []
    operando.forEach(algarismo => {
        let aparicoes = 0
        operando.forEach(algarismo2 => {
            if(algarismo == algarismo2) 
                ++aparicoes
        })

        if(aparicoes > 1 && !duplicados.includes(algarismo)) {
            let linha = $(`tr[linha = "${algarismo}"]`)       
            $(`#tabela`).append(linha.clone())
            duplicados.push(algarismo)
        }
    })


    //Ordenar
    /* 
        Pega sempre a próxima coluna correspondente do algarismo e põe no final na ordem do operando
    */
   
    operando.forEach(algarismo => {
    
            let linhas =  $(`tr[linha = "${algarismo}"]:not(.ordenado)`)

            //linha que será a próxima a ser adiciona na sequência dos algarismos do operando
            let linhaASerAdicionada = []
            linhas.each(function( index ) { 
                const buscaLinha = linhas.filter(linha => $(linha).attr("linha") == $(this).attr("linha"))
                if(buscaLinha.length == 0) {
                    linhaASerAdicionada.push($(this))
                }
            });
               
            let novaLinha = linhaASerAdicionada[0].clone()
            novaLinha.addClass('ordenado')
            $(`#tabela`).append(novaLinha)
            linhaASerAdicionada[0].remove()
            
    })
    
    
}