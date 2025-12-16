const botao = document.getElementById('botao');
const msg = document.getElementById('msg');

botao.onclick = () =>{
    const cor = document.querySelector('input[name="cor"]:checked');

    if(!cor){
        msg.innerHTML = 'Nenhuma cor selecionada';
        return;
    }

    if(cor.value === "preto"){
        msg.innerHTML = 'COR PRETO SELECIONADA';
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    }else if(cor.value === "azul"){
        msg.innerHTML = 'COR AZUL SELECIONADA';
        document.body.style.backgroundColor = 'blue';
        document.body.style.color = 'white';
    }else if(cor.value === "vermelho"){
        msg.innerHTML = 'COR VERMELHO SELECIONADA';
        document.body.style.backgroundColor = 'red';
        document.body.style.color = 'white';
    }

};