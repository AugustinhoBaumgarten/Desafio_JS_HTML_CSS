// interacao.js
const inputItem = document.getElementById('item');
const botao = document.getElementById('botao');
const listContainer = document.getElementById('lista');

// teste rápido de referências (corrigido para usar listContainer)
console.log('referencias: ', !!inputItem, !!botao, !!listContainer);

// array que vai guardar os itens na memória da página
let lista = [];

// função que cria um li e adiciona ao ul
function itens() {
  const valor = inputItem.value.trim();
  if (!valor) return; // não faz nada se vazio

  // adiciona ao array
  lista.push(valor);

  // cria o li + botão remover
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = valor;
  li.appendChild(span);

  const btnRemover = document.createElement('button');
  btnRemover.textContent = 'Remover';
  btnRemover.addEventListener('click', () => {
    // remove do DOM
    li.remove();
    // remove do array (filtra pelo valor) e atualiza storage se quiser depois
    lista = lista.filter(v => v !== valor);
  });
  li.appendChild(btnRemover);

  listContainer.appendChild(li);

  // limpa o input e foca de novo
  inputItem.value = '';
  inputItem.focus();
}

// liga o botão e Enter ao mesmo comportamento
botao.addEventListener('click', itens);
inputItem.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') itens();
});
