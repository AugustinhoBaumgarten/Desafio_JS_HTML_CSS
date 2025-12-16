const botao = document.getElementById('botao');
const num = document.getElementById('num');
const msg = document.getElementById('mensagem');

botao.onclick = () =>{
    const valor = Number(num.value);
    if(valor % 2 == 0){
        msg.innerHTML = 'PAR';
    }else{
        msg.innerHTML = 'IMPAR';
    }
    return;
};