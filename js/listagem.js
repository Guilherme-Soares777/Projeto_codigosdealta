const tabela = document.querySelector("#tabelaUsuarios tbody");
const campoBusca = document.getElementById("busca");

function carregarUsuarios(filtro = "") {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  tabela.innerHTML = "";

  usuarios.forEach((user, index) => {
    if (user.nome.toLowerCase().includes(filtro.toLowerCase())) {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${user.nome}</td>
        <td>${user.email}</td>
        <td>${user.cpf}</td>
        <td>${user.nascimento}</td>
        <td>
          <button onclick="editarUsuario(${index})">Editar</button>
          <button onclick="excluirUsuario(${index})">Excluir</button>
        </td>
      `;

      tabela.appendChild(tr);
    }
  });
}

campoBusca.addEventListener("input", () => {
  carregarUsuarios(campoBusca.value);
});

function excluirUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    carregarUsuarios(campoBusca.value);
  }
}

function editarUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  localStorage.setItem("usuarioEditando", index);
  window.location.href = "perfil.html";
}

// Carrega ao iniciar
carregarUsuarios();