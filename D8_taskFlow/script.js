

const texto = document.getElementById('texto');
const botao = document.getElementById('botao');
const lista = document.getElementById('lista');
const limpar = document.getElementById('limpar');

let adcLista = [];  //onde fica a array da lista  


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
    adcLista.forEach((item, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = item.texto;
        span.onclick = () => toggleFeita(index);

        if(item.feita){
            span.classList.add("feita");
        }

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => editar(index);

        const btnApagar = document.createElement("button");
            btnApagar.textContent = "Apagar";
            btnApagar.onclick = () => apagar(index);
        
            li.appendChild(span);
            li.appendChild(btnEditar);
            li.appendChild(btnApagar);

            lista.appendChild(li);

    });
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

carregar();