$("#botao-multiplicar").on( "click", function() {
    let operando1 = $("#operando1").val();
    let operando2 = $("#operando2").val();

    //Um array de inteiros
    operando1 = operando1.split('').map(caractere => parseInt(caractere)) 
    operando2 = operando2.split('').map(caractere => parseInt(caractere))

    ajustarParaOperando1(operando1)

    setTimeout(function()  {
       ajustarParaOperando2(operando2)
    }, 1500);

    setTimeout(function()  {
        animar(operando1.length)
    }, 2000);

} );