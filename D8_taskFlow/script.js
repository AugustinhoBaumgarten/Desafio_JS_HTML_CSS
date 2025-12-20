

const texto = document.getElementById('texto');
const botao = document.getElementById('botao');
const lista = document.getElementById('lista');
const limpar = document.getElementById('limpar');
const status = document.getElementById('status');
const filtroTodas = document.getElementById('filtro-todas');
const filtroFeitas = document.getElementById('filtro-feitas');
const filtroPendentes = document.getElementById('filtro-pendentes');


let adcLista = [];  //onde fica a array da lista  
let filtroAtual = "todas";

filtroTodas.onclick = () => {
    filtroAtual = "todas";
    render();
};

filtroFeitas.onclick = () =>{
    filtroAtual = "feitas";
    render();
};

filtroPendentes.onclick = () =>{
    filtroAtual = "pendentes";
    render();
}


limpar.onclick = () =>{
    const ok = confirm("Tem certeza que deseja apagar tudo?");
    if(!ok) return;

    adcLista = [];
    localStorage.removeItem("listaTarefas");
    lista.innerHTML = "";
}



botao.onclick = () =>{
    const valorTexto = texto.value.trim();
    if(valorTexto === "") return;

    texto.value = "";

    adcLista.push({
        texto: valorTexto,
        feita: false
    });

    salvar();
    render();

};

function render(){
    lista.innerHTML = "";
    let listaFiltrada = adcLista;

    if(filtroAtual === "feitas"){
        listaFiltrada = adcLista.filter(item => item.feita);
    }

    if(filtroAtual === "pendentes"){
        listaFiltrada = adcLista.filter(item => !item.feita);
    }

    listaFiltrada.forEach((item, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = item.texto;
        span.onclick = () => toggleFeita(index);

        if(item.feita){
            span.classList.add("feita");
        }

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("btn-editar");
        btnEditar.onclick = () => editar(index);

        const btnApagar = document.createElement("button");
            btnApagar.textContent = "Apagar";
            btnApagar.classList.add("btn-apagar");
            btnApagar.onclick = () => apagar(index);

            const acoes = document.createElement("div");
            acoes.classList.add("acoes");
            acoes.appendChild(btnEditar);
            acoes.appendChild(btnApagar);


            li.appendChild(span);
            li.appendChild(acoes);

            lista.appendChild(li);

    });

            atualizarStatus();
}

function apagar(i){
    adcLista.splice(i, 1);
    
    salvar();
    render();

}

function editar(i){
    const nova = prompt("Novo nome: ", adcLista[i].texto);
    
    if(!nova || nova.trim() === "") return;
 

    adcLista[i].texto = nova.trim();
    
    salvar();
    render();
}

// salvar no localStorage

function salvar(){
    localStorage.setItem("listaTarefas", JSON.stringify(adcLista));

}

//carregar ao abrir o site

function carregar(){
    const dados = localStorage.getItem("listaTarefas");

    if(dados){
        adcLista = JSON.parse(dados)
        render();
    }
}

function toggleFeita(i){
    adcLista[i].feita = !adcLista[i].feita;
    salvar();
    render();
}

function atualizarStatus(){
    const total = adcLista.length;

    const feitas = adcLista.filter(item => item.feita).length;

    const pendentes = total - feitas;

    status.textContent = `Total: ${total} | Feitas: ${feitas} | Pendentes ${pendentes}`;
}

texto.addEventListener("keydown", (e) =>{
    if(e.key === "Enter"){
        botao.click();
    }
});






carregar();