$("#botao-multiplicar").on( "click", function() {
    let operando1 = $("#operando1").val();
    let operando2 = $("#operando2").val();

    //Um array de inteiros
    let algarismosOperando1 = operando1.split('').map(caractere => parseInt(caractere)) 
    let algarismosOperando2 = operando2.split('').map(caractere => parseInt(caractere))

    ajustarParaOperando1(algarismosOperando1, algarismosOperando2)

    setTimeout(function()  {
       ajustarParaOperando2(algarismosOperando2)
    }, 1500);

    setTimeout(function()  {
        animar(algarismosOperando1.length, operando2.length)
        resultar(operando1, operando2)
    }, 3500);

   $("#botao-multiplicar").prop("disabled",true);

} );

$('#atualizar').on( "click", function() {
    location.reload();
} );
