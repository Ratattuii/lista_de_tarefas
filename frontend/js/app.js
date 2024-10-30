const URL_API = 'http://localhost:3000';

// Função para listar todas as tarefas
async function buscarTarefas() {
  const resposta = await fetch(`${URL_API}/tarefas`);
  const tarefas = await resposta.json();
  const listaTarefas = document.getElementById('lista-tarefas');
  listaTarefas.innerHTML = '';

  tarefas.forEach((tarefa) => {
    const item = document.createElement('li');

    // Cria o título da tarefa
    const titulo = document.createElement('span');
    titulo.textContent = tarefa.titulo;

    // Botão de edição
    const botaoEditar = document.createElement('button');
    botaoEditar.textContent = 'Editar';
    botaoEditar.onclick = () => editarTarefa(tarefa.id, titulo);

    // Botão de remoção
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover';
    botaoRemover.onclick = () => deletarTarefa(tarefa.id);

    // Adiciona os elementos à lista
    item.appendChild(titulo);
    item.appendChild(botaoEditar);
    item.appendChild(botaoRemover);
    listaTarefas.appendChild(item);
  });
}

// Função para adicionar uma nova tarefa
async function adicionarTarefa() {
  const titulo = document.getElementById('entrada-tarefa').value;
  await fetch(`${URL_API}/tarefas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo })
  });
  buscarTarefas();
  document.getElementById('entrada-tarefa').value = '';
}

// Função para editar uma tarefa
async function editarTarefa(id, tituloElemento) {
  const novoTitulo = prompt('Editar Tarefa:', tituloElemento.textContent);
  if (novoTitulo) {
    await fetch(`${URL_API}/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: novoTitulo, concluida: false })
    });
    buscarTarefas();
  }
}

// Função para deletar uma tarefa
async function deletarTarefa(id) {
  await fetch(`${URL_API}/tarefas/${id}`, { method: 'DELETE' });
  buscarTarefas();
}

// Inicializa a lista de tarefas ao carregar a página
document.addEventListener('DOMContentLoaded', buscarTarefas);
