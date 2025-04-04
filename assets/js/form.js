$("#botao-multiplicar").on( "click", function() {
    fazerAcontecer()
} );

$('#atualizar').on( "click", function() {
    location.reload();
} );

$("#botao-refazer").on( "click", function() {
    $('.resultado-diagonal-direita').remove()
    $('.resultado-diagonal-cima').remove()

    $('#resultado .algarismo').remove()

    $('.destaque-emcima.destaque-embaixo').each(function() {
        $(this).removeClass('destaque-embaixo')
        $(this).removeClass('destaque-emcima')
        $(this).removeAttr("time-cima")
        $(this).removeAttr("time-embaixo")
    })

    refazerAcontecer()

    $("#botao-refazer").hide()
})

const fazerAcontecer = () => {
    let operando1 = $("#operando1").val();
    let operando2 = $("#operando2").val();

    if (operando1.length > 20 || operando2.length > 20) {
        alert("Entendemos que números de até 20 algarismos são suficientes para uma boa experiência.");
        return;
    }

    if (operando1.length == 0 || operando2.length == 0) {
        alert("Os operandos devem ter no mínimo 1 algarismo.");
        return;
    }

    //Um array de inteiros
    let algarismosOperando1 = operando1.split('').map(caractere => parseInt(caractere)) 
    let algarismosOperando2 = operando2.split('').map(caractere => parseInt(caractere))

    ajustarParaOperando1(algarismosOperando1, algarismosOperando2)

    
    setTimeout(function()  {
       ajustarParaOperando2(algarismosOperando2)
    }, 100);

    
    setTimeout(function()  {
        animar(algarismosOperando1.length, operando2.length)
        resultar(operando1, operando2)
    }, 200);

    setTimeout(function()  {
        $("#botao-refazer").show()
    }, 3700 + (`${parseInt(operando1) * parseInt(operando2)}`.split('').length) * 3000);

   $("#botao-multiplicar").prop("disabled",true);
   $("#operando1").prop("disabled", "true")
   $("#operando2").prop("disabled", "true")
}

const refazerAcontecer = () => {
    let operando1 = $("#operando1").val();
    let operando2 = $("#operando2").val();

    //Um array de inteiros
    let algarismosOperando1 = operando1.split('').map(caractere => parseInt(caractere)) 
    let algarismosOperando2 = operando2.split('').map(caractere => parseInt(caractere))

    animar(algarismosOperando1.length, algarismosOperando2.length)
    resultar(operando1, operando2)
    
    setTimeout(function()  {
        $("#botao-refazer").show()
    }, 7000 + (`${parseInt(operando1) * parseInt(operando2)}`.split('').length) * 3000);

   $("#botao-multiplicar").prop("disabled",true);
}

