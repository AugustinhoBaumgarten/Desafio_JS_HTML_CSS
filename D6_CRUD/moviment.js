const nome = document.getElementById('nome');
const botao = document.getElementById('botao');
const lista = document.getElementById('lista');

let nomes = [];//array onde os nomes vao ficar, essa é a lista mesmo

botao.onclick = () =>{
    const valor = nome.value.trim();
    if(valor === ""){
        return;
    }

    nomes.push(valor);
    nome.value = "";

    render();
};

function render(){
    lista.innerHTML = "";

    nomes.forEach((n, i) =>{
        const li = document.createElement("li");

        li.innerHTML = `${n}
        <button onclick="editar(${i})">Editar</>
        <button onclick="remover(${i})">Excluir</button>`;

        lista.appendChild(li);
    });
}
function remover(i){
    nomes.splice(i, 1);
    render();
}

function editar(i){
    const novo = prompt("Novo nome:", nomes[i]);

    if(novo === null || novo.trim() === "") return;

    nomes[i] = novo.trim();
    render();
}