const listaDatas = document.getElementById("listaDatas");
const historico = JSON.parse(localStorage.getItem("historico_treinos")) || {};
const detalhes = document.getElementById("detalhesTreino");

// Guardar qual treino está aberto
let treinoAberto = null;

for (const data in historico) {
    const li = document.createElement("li");
    const botao = document.createElement("button");

    botao.innerText = data;
    botao.classList.add("botao-data");

    botao.onclick = () => {
        if (treinoAberto === data) {
            // Se clicar de novo, fecha
            detalhes.innerHTML = "";
            treinoAberto = null;
        } else {
            mostrarTreino(data);
            treinoAberto = data;
        }
    };

    li.appendChild(botao);
    listaDatas.appendChild(li);
}

function mostrarTreino(data) {
    const treino = historico[data];

    // Limpa antes de mostrar
    detalhes.innerHTML = "";

    // título com a data e nome do treino
    const titulo = document.createElement("h2");
    titulo.innerText = `${data} - Treino: ${treino.treino}`;
    detalhes.appendChild(titulo);

    // lista de exercícios
    treino.exercicios.forEach(ex => {
        const divEx = document.createElement("div");
        divEx.classList.add("exercicio"); // só adiciona a classe, o CSS cuida do estilo

        divEx.innerHTML = `
            <strong>${ex.texto}</strong><br>
            Kg: ${ex.carga || "-"}<br>
            Séries: ${ex.series || "-"}<br>
            Reps: ${ex.reps || "-"}<br>
            Dificuldade: ${ex.dificuldade || "-"}
        `;

        detalhes.appendChild(divEx);
    });
}
