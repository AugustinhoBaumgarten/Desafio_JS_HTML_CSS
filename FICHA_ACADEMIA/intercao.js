const adicionar = document.getElementById('adicionar');
const texto = document.getElementById('texto');
const exercicios = document.getElementById('exercicios')

let listaEx = [];
let indiceEdicao = null;

const dadosSalvos = localStorage.getItem("exercicios");

if(dadosSalvos){
    listaEx = JSON.parse(dadosSalvos);
    render();
}

adicionar.onclick = () =>{
    const valorTexto = texto.value.trim();
    if(valorTexto === "") return;

    texto.value = "";

    if(indiceEdicao !== null){
        listaEx[indiceEdicao].texto = valorTexto;
        adicionar.innerText = "adicionar"
        indiceEdicao = null;
    }else{
        listaEx.push({
            texto: valorTexto,
            feita: false
        });
    }

    salvar()
    render();
}

function render(){
    exercicios.innerHTML = "";

    listaEx.forEach((item, index) =>{
        const li = document.createElement("li");
        li.innerText = item.texto;
        exercicios.appendChild(li);

        if(indiceEdicao === null){ //confere
        const  btnApagar = document.createElement("button");
        btnApagar.innerText = "Apagar";

        li.appendChild(btnApagar);

        btnApagar.onclick = () =>{
            listaEx.splice(index, 1);
            render()
        }
    }

        const btnEditar = document.createElement('button');
        btnEditar.innerText = "Editar";
        li.appendChild(btnEditar);

        btnEditar.onclick = () =>{
            texto.value = item.texto;
            indiceEdicao = index;
            adicionar.innerText = "salvar";
            render();
        }


    });

}


function salvar(){
    localStorage.setItem("exercicios", JSON.stringify(listaEx));
}


//design
//feito / nao feito (ja vem como false)
// adicionar com enter
// adicionar ao lado a carga utilizada e numero de repetições para cada exercicio, podendo editar botao edit
//riscar feitas e nao feitas
//foco em mobile
