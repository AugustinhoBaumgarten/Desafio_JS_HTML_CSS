const input = document.getElementById("item");
const botao = document.getElementById("botao");
const lista = document.getElementById("lista");
function salvarLista(){
  localStorage.setItem("minhaLista", JSON.stringify(lista));
}

// Quando clicar no botão → executa a função adicionarItem()
botao.addEventListener("click", adicionarItem);

function adicionarItem(){
    const texto = input.value; 

    if(texto.trim() === ""){
        alert("Digite algo!");
        return;
    }

    const li = document.createElement("li"); 
    li.textContent = texto;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Del";
    botaoRemover.style.marhginLeft = "10px";
    botaoRemover.style.cursor = "pointer";

    botaoRemover.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(botaoRemover);
    lista.appendChild(li);                   

    input.value = "";                        
    input.focus();
}


//SALVE NO LOCALSTORAGE e CONTINUE O DESAFIO