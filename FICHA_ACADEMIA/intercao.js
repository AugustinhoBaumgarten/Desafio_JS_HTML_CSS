const adicionar = document.getElementById('adicionar');
const texto = document.getElementById('texto');
const exercicios = document.getElementById('exercicios')
const treinoAtual = document.body.dataset.treino;
const CHAVE_STORAGE = `exercicios_${treinoAtual}`;

const timerBox = document.getElementById('timerBox');
const cronoBox = document.getElementById('cronoBox');

const timerDisplay = document.getElementById('timerDisplay');
const cronoDisplay = document.getElementById('cronometroDisplay');
const timerReset = document.getElementById('timerReset');





//clique no timer
timerDisplay.addEventListener("click", () =>{
    timerBox.classList.toggle("ativo");
    cronoBox.classList.remove("ativo");
});

//clique no cronometro
cronoDisplay.addEventListener("click", () =>{
    cronoBox.classList.toggle("ativo");
    timerBox.classList.remove("ativo");
})

const timerInput = document.getElementById('timerInput');

const timerPlay = document.getElementById('timerPlay');

let timerInterval = null;
let tempoRestante = 0;

//converter mm:ss

function converterParaSegundos(tempo){
    const partes = tempo.split(":");
    const minutos = parseInt(partes[0]) || 0;
    const segundos = parseInt(partes[1]) || 0;
    return (minutos * 60) + segundos;
}

//converte segundos para mm:Ss
function formatarTempo(segundos){
    const min = String(Math.floor(segundos/60)).padStart(2, "0");
    const sec = String(segundos % 60).padStart(2, "0");
    return `${min}:${sec}`;
}

function formatarInputTimer(valor){
    valor = valor.replace(/\D/g, "");
    if(valor.length <= 2) return valor;
    const min = valor.slice(0, valor.length - 2);
    const sec = valor.slice(-2);
    return `${min}:${sec}`;
}

timerInput.addEventListener("input", (e) => {
    const valorAtual = e.target.value;
    e.target.value = formatarInputTimer(valorAtual);
});

//play click

timerReset.addEventListener("click", () =>{
    clearInterval(timerInterval);
    timerInterval = null;
    timerDisplay.textContent = "00:00";
})

timerPlay.addEventListener("click", () => {
    if(timerInterval) return;

    timerInput.value = formatarInputTimer(timerInput.value);
    tempoRestante = converterParaSegundos(timerInput.value);

    if(tempoRestante <= 0) return;

    timerBox.classList.remove("ativo");

    timerDisplay.textContent = formatarTempo(tempoRestante);

    timerInterval = setInterval (() => {
        tempoRestante--;
        timerDisplay.textContent = formatarTempo(tempoRestante);

        if(tempoRestante <= 0){
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }, 1000);
});


const cronoPlay = document.getElementById('cronoPlay');
const cronoPause = document.getElementById('cronoPause');
const cronoReset = document.getElementById('cronoReset');

let cronoInterval = null;
let tempoCrono = 0;

function atualizarCrono(){
    cronoDisplay.textContent = formatarTempo(tempoCrono);
};

cronoPlay.addEventListener("click", () => {
    if(cronoInterval) return;

    cronoBox.classList.remove("ativo");

    cronoInterval = setInterval(() => {
        tempoCrono++;
        atualizarCrono();
    }, 1000);
});

cronoPause.addEventListener("click", () => {
    clearInterval(cronoInterval);
    cronoInterval = null;
    cronoBox.classList.remove("ativo");
});

cronoReset.addEventListener("click", () =>{
    clearInterval(cronoInterval);
    cronoInterval = null;
    tempoCrono = 0;
    atualizarCrono();
    cronoBox.classList.remove("ativo");
});


let listaEx = [];
let indiceEdicao = null;

const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);

//enter aciona o adicionar
texto.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        adicionar.click();
    }
});

if(dadosSalvos){
    listaEx = JSON.parse(dadosSalvos);
    render();
};

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
            reps:"",
            dificuldade:"dificuldade"// padrao
        });
    };

    salvar()
    render();
};

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
        };

        nomeEx.onclick = () =>{
            listaEx[index].feita = !listaEx[index].feita;

            salvar();
            render();
        };

        li.appendChild(nomeEx);


        //botao dificuldade 
        const btnDificuldade = document.createElement("button");
        btnDificuldade.className = "btn-dificuldade";

        btnDificuldade.innerText = "dificuldade";

        if(item.dificuldade === "facil"){
            btnDificuldade.classList.add("facil");
            btnDificuldade.innerText = "fácil";
        };

        if(item.dificuldade === "medio"){
            btnDificuldade.classList.add("medio");
            btnDificuldade.innerText = "médio";
        };

        if(item.dificuldade === "dificil"){
            btnDificuldade.classList.add("dificil");
            btnDificuldade.innerText = "difícil";
        };
        

        li.appendChild(btnDificuldade);


        btnDificuldade.onclick = () =>{
            const atual = item.dificuldade;

            if(atual === "dificuldade") listaEx[index].dificuldade = "facil";
            else if(atual === "facil") listaEx[index].dificuldade = "medio";
            else if(atual === "medio") listaEx[index].dificuldade = "dificil";
            else listaEx[index].dificuldade = "facil";

            salvar();
            render();
        };


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

        inputCarga.classList.add("input-kg");
        inputSeries.classList.add("input-series");
        inputReps.classList.add("inputReps");

        //melhora teclado no celular

        inputCarga.setAttribute("inputmode", "numeric");
        inputSeries.setAttribute("inputmode", "numeric");
        inputReps.setAttribute("inputmode", "numeric");

        inputCarga.setAttribute("enterkeyhint", "next");
        inputSeries.setAttribute("enterkeyhint", "next");
        inputReps.setAttribute("enterkeyhint", "done");


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
        });

        inputReps.addEventListener("input", () => 
        {
            listaEx[index].reps = inputReps.value;
            salvar();
        });

        //KG SERIES

        inputCarga.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                e.preventDefault();
                inputSeries.focus();
            };

        });


        //series - reps

        inputSeries.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                inputReps.focus();
            }
        });

        //reps - fechar teclado

        inputReps.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                inputReps.blur(); //fecha o teclado do celular
            }
        });



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
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(listaEx));
}

const btnSalvarTreino = document.getElementById("salvarTreinoDia");

btnSalvarTreino.addEventListener("click", () =>{
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString("pt-BR");

    const historico = JSON.parse(localStorage.getItem("historico_treinos"))||{}

    if(historico[dataFormatada]) {
        const confirmar = confirm(
            "ja existe um treino salvo hoje. Deseja sobrescrever?"
        );

        if (!confirmar){
            return; //para tudo se clicar em cancelar
        }
    }

    //salva / sobrescreve
    historico[dataFormatada] = {
        treino: treinoAtual,
        exercicios: listaEx
    };

    localStorage.setItem("historico_treinos", JSON.stringify(historico));

    alert("Treino salvo com sucesso!");
});


//EXERCICIOS DO BOTAO DE ESCOLHA
const exerciciosPorGrupo = {

    Pernas: [
        "Agachamento livre",
        "Agachamento frontal",
        "Agachamento sumô",
        "Agachamento hack",
        "Agachamento no smith",
        "Leg press 45°",
        "Leg press horizontal",
        "Cadeira extensora",
        "Extensora unilateral",
        "Mesa flexora",
        "Flexora em pé",
        "Flexora sentada",
        "Stiff",
        "Levantamento terra",
        "Terra romeno",
        "Elevação pélvica",
        "Elevação pélvica no smith",
        "Coice no cabo",
        "Coice com caneleira",
        "Afundo",
        "Afundo no smith",
        "Passada",
        "Passada andando",
        "Avanço",
        "Step-up",
        "Abdução de quadril",
        "Adução de quadril",
        "Panturrilha em pé",
        "Panturrilha sentado",
        "Panturrilha no leg press",
        "Panturrilha no smith"
    ],

    Peito: [
        "Supino reto",
        "Supino inclinado",
        "Supino declinado",
        "Supino com halteres",
        "Supino no smith",
        "Crucifixo reto",
        "Crucifixo inclinado",
        "Crucifixo declinado",
        "Crucifixo no cabo",
        "Crossover alto",
        "Crossover médio",
        "Crossover baixo",
        "Peck deck",
        "Flexão de braços",
        "Flexão inclinada",
        "Pullover",
        "Pullover com halter"
    ],

    Costas: [
        "Puxada frente aberta",
        "Puxada frente neutra",
        "Puxada frente supinada",
        "Puxada unilateral",
        "Pulldown",
        "Barra fixa",
        "Barra fixa assistida",
        "Remada curvada",
        "Remada curvada supinada",
        "Remada unilateral com halter",
        "Remada baixa",
        "Remada alta",
        "Remada cavalinho",
        "Remada no smith",
        "Pullover no cabo",
        "Levantamento terra"
    ],

    Bíceps: [
        "Rosca direta",
        "Rosca direta com barra W",
        "Rosca alternada",
        "Rosca alternada sentada",
        "Rosca martelo",
        "Rosca martelo cruzada",
        "Rosca concentrada",
        "Rosca scott",
        "Rosca scott no banco",
        "Rosca no cabo",
        "Rosca 21",
        "Rosca inversa"
    ],

    Tríceps: [
        "Tríceps testa",
        "Tríceps testa com halteres",
        "Tríceps corda",
        "Tríceps pulley",
        "Tríceps pulley inverso",
        "Tríceps francês",
        "Tríceps francês unilateral",
        "Tríceps banco",
        "Mergulho",
        "Tríceps coice",
        "Extensão de tríceps unilateral no cabo"
    ],

    Ombros: [
        "Desenvolvimento com barra",
        "Desenvolvimento com halteres",
        "Desenvolvimento no smith",
        "Desenvolvimento arnold",
        "Elevação lateral",
        "Elevação lateral sentada",
        "Elevação lateral no cabo",
        "Elevação frontal",
        "Elevação frontal com halter",
        "Elevação frontal no cabo",
        "Crucifixo invertido",
        "Crucifixo invertido no cabo",
        "Face pull",
        "Remada alta"
    ],

    Abdômen: [
        "Abdominal reto",
        "Abdominal infra",
        "Abdominal oblíquo",
        "Abdominal supra",
        "Prancha",
        "Prancha lateral",
        "Elevação de pernas",
        "Elevação de pernas na barra",
        "Abdominal na máquina",
        "Ab wheel",
        "Crunch",
        "Crunch no cabo",
        "Tesoura",
        "V-up"
    ],

    Cardio: [
        "Esteira",
        "Bicicleta",
        "Bicicleta ergométrica",
        "Escada",
        "Elíptico",
        "Pular corda",
        "Corrida",
        "Caminhada",
        "HIIT"
    ],

    Core: [
    "Prancha",
    "Prancha frontal",
    "Prancha lateral",
    "Prancha com elevação de braço",
    "Prancha com elevação de perna",
    "Prancha com toque no ombro",
    "Dead bug",
    "Dead bug alternado",
    "Dead bug com halter",
    "Bird-dog",
    "Bird-dog alternado",
    "Bird-dog com pausa",
    "Hollow body hold",
    "Hollow rock",
    "Pallof press",
    "Pallof press unilateral",
    "Farmer walk",
    "Farmer walk unilateral",
    "Suitcase carry",
    "Good morning",
    "Extensão lombar",
    "Extensão lombar no banco",
    "Superman",
    "Superman alternado"
]

};



const btnEscolher = document.getElementById("btnEscolherExercicio");

btnEscolher.addEventListener("click", () => {
    abrirModalMembros();
});

function abrirModalMembros(){
    const modal = document.createElement("div");
    modal.className = "modal-exercicio";

    const conteudo = document.createElement("div");
    conteudo.className = "modal-conteudo";

    conteudo.innerHTML = "<h2>MEMBROS</h2>";

    Object.keys(exerciciosPorGrupo).forEach(grupo => {
        const btn = document.createElement("button");
        btn.innerText = grupo;

        btn.onclick = () =>abrirListaExercicios(grupo, conteudo);
        conteudo.appendChild(btn);

    });

    modal.appendChild(conteudo);
    document.body.appendChild(modal);

    modal.onclick = (e) =>{
        if(e.target === modal){
            modal.remove();
        }
    };
}

function abrirListaExercicios(grupo, container){
    container.innerHTML = `<h2>${grupo}</h2>`;

    exerciciosPorGrupo[grupo].forEach(exercicio => {
        const btn = document.createElement("button");
        btn.innerText = exercicio;

        btn.onclick = () => {
            listaEx.push({
                texto: exercicio,
                feita:false,
                carga: "",
                series:"",
                reps:"",
                dificuldade: "dificuldade"
            });

            salvar();
            render();
            document.querySelector(".modal-exercicio").remove();
        };

        container.appendChild(btn);

    });
}


//design

//foco em mobile
