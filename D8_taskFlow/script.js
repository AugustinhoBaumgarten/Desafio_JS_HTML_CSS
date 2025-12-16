

const texto = document.getElementById('texto');
const botao = document.getElementById('botao');
const lista = document.getElementById('lista');

let adcLista = [];  //onde fica a array da lista  

botao.onclick = () =>{
    const valorTexto = texto.value.trim();

    if(valorTexto === "") return;

    adcLista.push(valorTexto);

    render();

};

function render(){
    lista.innerHTML = "";
    adcLista.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
        ${item}
        <button onclick="editar(${index})">Editar</button>
        <button onclick = "apagar(${index})">apagar</button>`;

        lista.appendChild(li);

    });
}

function apagar(i){
    adcLista.splice(i, 1);
    render();
}

function editar(i){
    const nova = prompt("Novo nome: ", adcLista[i]);
    
    if(!nova || nova.trim() === "") return;


    adcLista[i] = nova.trim();
    render();
}





// agora fazer excluir e editar item segue o moviment.js do fruit