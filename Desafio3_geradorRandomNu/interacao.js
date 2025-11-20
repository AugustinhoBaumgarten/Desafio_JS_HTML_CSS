function botao(){
    var numero = document.getElementById('cxNumero')

    var aleatorio = Math.floor(Math.random()*101)

    numero.value = aleatorio

    console.log(aleatorio)
}