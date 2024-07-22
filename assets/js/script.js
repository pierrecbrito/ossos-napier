
/**
 * Faz com que as colunas dos números que não estejam envolvidos sumam, duplica se necessário e assim como ordena a sequência dos algarismos por coluna.
 * 
 * @param {*} operando - array com os algarismos do operando da esquerda na multiplicação
 */
const ajustarParaOperando1 = (operando, operando2) => {
    const algarismos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const colunasDeAlgarismosASeremExcluidas = algarismos.filter((algarismo) => !operando.includes(algarismo))//Algarismos que não pertencem ao operando 
    colunasDeAlgarismosASeremExcluidas.forEach(algarismo => $(`td[localizacao $= "-${algarismo}"]`).hide(1000))//Esconde as colunas indesejadas

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

    //Cabeçalho
    let linha = $(`tr[linha="h"]`)
    //Colunas
    for (let index2 = 0; index2 < operando.length; index2++) {
        let celula =  $(`td[localizacao $= "h-${operando[index2]}"]:not(.ordenado)`)
        novaCelula = celula.clone()
        novaCelula.addClass('ordenado')
        linha.append(novaCelula)
        celula.remove()
    }

    //Linhas
    for (let index = 0; index < operando2.length; index++) {
        linha = operando2[index];
        //Colunas
        for (let index2 = 0; index2 < operando.length; index2++) {
            let celula =  $(`td[localizacao $= "${linha}-${operando[index2]}"]:not(.ordenado)`)
            novaCelula = celula.clone()
            novaCelula.addClass('ordenado')
            $(`tr[linha="${linha}"]`).append(novaCelula)
            celula.remove()
        }
    }
    
}

const ajustarParaOperando2 = (operando) => {
    const algarismos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const linhasDeAlgarismosASeremExcluidas = algarismos.filter((algarismo) => !operando.includes(algarismo))//Algarismos que não pertencem ao operando 
    linhasDeAlgarismosASeremExcluidas.forEach(algarismo => $(`tr[linha = "${algarismo}"]`).hide(1000))//Esconde as colunas indesejadas

    
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
        let novaLinha = linhas.first().clone()
        novaLinha.addClass('ordenado')
        $(`#tabela`).append(novaLinha)
        linhas.first().remove()
            
    })
    
    
}