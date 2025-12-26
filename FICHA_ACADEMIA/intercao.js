const adicionar = document.getElementById('adicionar');
const texto = document.getElementById('texto');
const exercicios = document.getElementById('exercicios')

let listaEx = [];
let indiceEdicao = null;

const dadosSalvos = localStorage.getItem("exercicios");

//enter aciona o adicionar
texto.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        adicionar.click();
    }
});

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
            feita: false,
            carga:"",
            series:"",
            reps:""
        });
    }

    salvar()
    render();
}

function render(){
    exercicios.innerHTML = "";

    listaEx.forEach((item, index) =>{
        const li = document.createElement("li");

        //organizando li
        const nomeEx = document.createElement("span");
        nomeEx.innerText = item.texto;
        nomeEx.className = "nome-ex"

        //clicar em cima para riscar
        if(item.feita){
            nomeEx.classList.add("feito");
        }

        nomeEx.onclick = () =>{
            listaEx[index].feita = !listaEx[index].feita;

            salvar();
            render();
        };

        li.appendChild(nomeEx);


        //input para a carga do treino
        const inputCarga = document.createElement("input");
        inputCarga.type = "number";
        inputCarga.placeholder = "Kg";
        inputCarga.value = item.carga;

        //input séries
        const inputSeries = document.createElement("input");
        inputSeries.type = "number";
        inputSeries.placeholder = "séries";
        inputSeries.value = item.series || "";

        //input reps
        const inputReps = document.createElement("input");
        inputReps.type = "number";
        inputReps.placeholder = "reps";
        inputReps.value = item.reps;

        //area de dados
        const areaDados = document.createElement("div");
        areaDados.className = "area-dados";

        //kg
        const campoKg = document.createElement("div");
        campoKg.className = "campo";
        campoKg.innerHTML = "<span>Kg</span>";
        campoKg.appendChild(inputCarga);

        //campo séries
        const campoSeries = document.createElement("div");
        campoSeries.className = "campo";
        campoSeries.innerHTML = "<span>Séries</span>";
        campoSeries.appendChild(inputSeries);

        //campo de repeticoes
        const campoReps = document.createElement("div");
        campoReps.className = "campo";
        campoReps.innerHTML = "<span>Reps</span>";
        campoReps.appendChild(inputReps);

        //container séries + reps
        const campoSerieReps = document.createElement("div");
        campoSerieReps.className = "campo-series-reps";
        campoSerieReps.appendChild(campoSeries);
        campoSerieReps.appendChild(campoReps);

        //montagem
        areaDados.appendChild(campoKg);
        areaDados.appendChild(campoSerieReps);

        li.appendChild(areaDados);

        inputCarga.addEventListener("input", () =>{   
            listaEx[index].carga = inputCarga.value;
            salvar();
        });

        inputSeries.addEventListener("input", () => {
            listaEx[index].series = inputSeries.value;
            salvar();
        })

        inputReps.addEventListener("input", () => 
        {
            listaEx[index].reps = inputReps.value;
            salvar();
        })

        exercicios.appendChild(li);

        //div para botoes
        const areaBotoes = document.createElement("div");
        areaBotoes.className = "areaBotoes";

        if(indiceEdicao === null){ //confere
        const  btnApagar = document.createElement("button");
        btnApagar.innerText = "Apagar";

        areaBotoes.appendChild(btnApagar);

        btnApagar.onclick = () =>{
            listaEx.splice(index, 1);
            salvar();
            render();
        }
    }

        const btnEditar = document.createElement('button');
        btnEditar.innerText = "Editar";
        areaBotoes.appendChild(btnEditar);

        btnEditar.onclick = () =>{
            texto.value = item.texto;
            indiceEdicao = index;
            adicionar.innerText = "salvar";
            render();
        }

        li.appendChild(areaBotoes);

    });

}


function salvar(){
    localStorage.setItem("exercicios", JSON.stringify(listaEx));
}


//design

//foco em mobile
