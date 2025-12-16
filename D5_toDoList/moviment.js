const tarefa = document.getElementById('tarefa');
const botao = document.getElementById('botao');
const lista = document.getElementById('lista');

let tarefas = []; //array onde ficam as tarefas

botao.onclick = () =>{
    const valor = tarefa.value.trim();
    if (valor === "") return;

    tarefas.push(valor);
    tarefa.value = "";
    render();
};

function render(){
    lista.innerHTML = "";

    tarefas.forEach((t, index) => {
        const li = document.createElement("li");
        li.innerHTML = ` ${t} 
        <button onclick = "editar(${index})">editar</button>
        <button onclick="deletar(${index})">Excluir</button>`;
        lista.appendChild(li);
    });
}
function deletar(i){
    tarefas.splice(i, 1);
    render();
}
function editar(i){
    const novo = prompt("Edite a tarefa: ", tarefas[i]);
    if (novo !== null && novo.trim() !== ""){
        tarefas[i] = novo.trim();
        render();
    }
}