let num1 = document.getElementById('num1');
let num2 = document.getElementById('num2');
const botao = document.getElementById('botao');
let resultado = document.getElementById('result');
const zerar = document.getElementById('zerar');

zerar.onclick = () =>{
    num1.value = 0;
    num2.value = 0;
    resultado.innerHTML='';

    const radios = document.querySelectorAll('input[name="operacao"]');
    radios.forEach(radio => radio.checked = false);
}



botao.onclick = () =>{
    const operacao = document.querySelector('input[name="operacao"]:checked');

    if(!operacao){
        resultado.innerHTML = 'selecione uma operação';
        return;
    }

    const numA = Number(num1.value);
    const numB = Number(num2.value);
    let res;

    if(operacao.value === 'som'){
        res = numA + numB;
    } else if(operacao.value ==='sub'){
        res = numA - numB;
    }else if(operacao.value === 'mult'){
        res = numA * numB;
    }else if(operacao.value === 'div'){
        res = numA / numB;
    }

    resultado.innerHTML = res;


}