const fruta = document.getElementById('fruta');
const botao = document.getElementById('botao');
const lista = document.getElementById('lista');

let ListaFrutas = [];

//CREATE ONDE ADICIONA AS FRUTAS NA ARRAY

botao.onclick = () =>{
    const valor = fruta.value.trim();

    if(valor === "") return;

    ListaFrutas.push(valor);
    fruta.value = "";

    render();
}

//MOSTRAR FRUTAS NA TELA - READ

function render(){
    lista.innerHTML = "";

    ListaFrutas.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
        ${item}
        <button onclick="editar(${index})">Editar</button>
        <button onclick="apagar(${index})">Excluir</button>`;

        lista.appendChild(li);
    });
}

//Excluir fruta

function apagar(i){
    ListaFrutas.splice(i, 1);
    render();
}

//editar fruta

function editar(i){
    const nova = prompt("Novo nome:", ListaFrutas[i]);

    if(!nova || nova.trim() === "") return;

    ListaFrutas[i] = nova.trim();
    render();
}