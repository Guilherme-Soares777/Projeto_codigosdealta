let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const tabela = document.getElementById("tabelaUsuarios");
const filtro = document.getElementById("filtroNome");

function renderTabela(filtroTexto = "") {
  tabela.innerHTML = "";

  usuarios
    .filter(user => user.nome.toLowerCase().includes(filtroTexto.toLowerCase()))
    .forEach((user, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input value="${user.nome}" data-index="${index}" data-campo="nome" /></td>
        <td>${user.email}</td>
        <td><input value="${user.cpf || ""}" data-index="${index}" data-campo="cpf" /></td>
        <td><input type="date" value="${user.nascimento || ""}" data-index="${index}" data-campo="nascimento" /></td>
        <td>
          <button onclick="salvar(${index})">Salvar</button>
          <button onclick="excluir(${index})">Excluir</button>
        </td>
      `;
      tabela.appendChild(tr);
    });
}

function salvar(index) {
  const inputs = document.querySelectorAll(`[data-index="${index}"]`);
  inputs.forEach(input => {
    const campo = input.dataset.campo;
    usuarios[index][campo] = input.value;
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Usuário atualizado.");
  renderTabela(filtro.value);
}

function excluir(index) {
  if (confirm("Deseja realmente excluir este usuário?")) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderTabela(filtro.value);
  }
}

filtro.addEventListener("input", () => renderTabela(filtro.value));
renderTabela();
